package org.omri.radio.impl;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.omri.BuildConfig;
import org.omri.radio.Radio;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceIp;
import org.omri.radioservice.RadioServiceIpStream;
import org.omri.radioservice.RadioServiceMimeType;
import org.omri.radioservice.RadioServiceType;
import org.omri.radioservice.metadata.Visual;
import org.omri.radioservice.metadata.VisualMimeType;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import javax.net.ssl.HttpsURLConnection;

import eu.hradio.core.radiodns.RadioDnsCore;
import eu.hradio.core.radiodns.RadioDnsCoreLookupCallback;
import eu.hradio.core.radiodns.RadioDnsFactory;
import eu.hradio.core.radiodns.RadioDnsService;
import eu.hradio.core.radiodns.RadioDnsServiceEpg;
import eu.hradio.core.radiodns.RadioDnsServiceEpgSiCallback;
import eu.hradio.core.radiodns.RadioDnsServiceSpi;
import eu.hradio.core.radiodns.RadioDnsServiceType;
import eu.hradio.core.radiodns.radioepg.bearer.Bearer;
import eu.hradio.core.radiodns.radioepg.bearer.BearerType;
import eu.hradio.core.radiodns.radioepg.description.Description;
import eu.hradio.core.radiodns.radioepg.genre.Genre;
import eu.hradio.core.radiodns.radioepg.link.Link;
import eu.hradio.core.radiodns.radioepg.mediadescription.MediaDescription;
import eu.hradio.core.radiodns.radioepg.multimedia.Multimedia;
import eu.hradio.core.radiodns.radioepg.multimedia.MultimediaType;
import eu.hradio.core.radiodns.radioepg.name.Name;
import eu.hradio.core.radiodns.radioepg.serviceinformation.Service;
import eu.hradio.httprequestwrapper.dtos.service_search.RankedStandaloneService;
import eu.hradio.httprequestwrapper.dtos.service_search.ServiceList;
import eu.hradio.httprequestwrapper.listener.OnErrorListener;
import eu.hradio.httprequestwrapper.listener.OnSearchResultListener;
import eu.hradio.httprequestwrapper.service.ServiceSearchClient;
import eu.hradio.httprequestwrapper.service.ServiceSearchClientImpl;

/**
 * Copyright (C) 2018 IRT GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author Fabian Sattler, IRT GmbH
 */

public class IpServiceScanner {

	private final static String TAG = "IpServiceScanner";

	private final static String HTTPS_REQUEST_AUTHORIZATION = "Authorization";
	private final static String HTTPS_REQUEST_CLIENT_IDENTIFIER = "ClientIdentifier";

	private final static IpServiceScanner mScannerInstance = new IpServiceScanner();

	private final List<IpScannerListener> mScannerListeners = new ArrayList<>();

	private boolean mIsScanning = false;
	private final AtomicInteger mSiCallbacksPendings = new AtomicInteger();
	private int mCoreCallbacksTotal = -1;

	private final ConcurrentHashMap<RadioService, RadioDnsCore> mLookups = new ConcurrentHashMap<>();
	private final ConcurrentHashMap<RadioService, eu.hradio.core.radiodns.RadioDnsService> mAvailableServices = new ConcurrentHashMap<>();

	private File mLogoCacheDir;

	private @NonNull Bundle mScanRdnsOptionsBundle = new Bundle();

	// HashMap of key=<Authoritative FQDN> and value=<ClientIdentification>
	private final HashMap<String, String> mClientIdentifications = new HashMap<>();

 	private IpServiceScanner() {
		createLogoFilesCacheDir();
	}

	public static @NonNull IpServiceScanner getInstance() {
		return mScannerInstance;
	}

	void addScanListener(IpScannerListener listener) {
		if(!mScannerListeners.contains(listener)) {
			mScannerListeners.add(listener);
		}
	}

	/** @noinspection unused*/
	void removeScanListener(IpScannerListener listener) {
		mScannerListeners.remove(listener);
	}

	boolean isScanning() {
		return mIsScanning;
	}

	private final RadioDnsCoreLookupCallback mCoreCallback = new RadioDnsCoreLookupCallback() {
		@Override
		public void coreLookupFinished(RadioService radioService, List<eu.hradio.core.radiodns.RadioDnsService> availableServices) {
			if(!mIsScanning) {
				return;
			}

			mLookups.remove(radioService);

			if(BuildConfig.DEBUG)Log.d(TAG, "Corelookup for: '" + radioService.getServiceLabel() + "' finished, " + mLookups.size() + " lookups remaining");

			for(RadioDnsService rdnsSrv : availableServices) {
				final RadioDnsServiceType serviceType = rdnsSrv.getServiceType();
				if (serviceType == RadioDnsServiceType.RADIO_EPG
						|| serviceType == RadioDnsServiceType.RADIO_SPI) {
					synchronized (mAvailableServices) {
						if (!mAvailableServices.containsValue(rdnsSrv)) {
							if (BuildConfig.DEBUG)
								Log.d(TAG, "Adding " + rdnsSrv.getTarget() + " to SI scan list");
							mAvailableServices.put(radioService, rdnsSrv);
						} else {
							if (BuildConfig.DEBUG) Log.d(TAG, "AvailServicesMap already contains " + rdnsSrv.getTarget());
						}
					}
					break;
				}
			}

			if(mLookups.isEmpty()) {
				if(BuildConfig.DEBUG)Log.d(TAG, "Corelookup scan finished " + mAvailableServices.size() + " EPG services available");

				if(!mAvailableServices.isEmpty()) {
					mSiCallbacksPendings.set(mAvailableServices.values().size());

					notifyListeners(50, false);

					synchronized (mAvailableServices) {
						for (RadioDnsService rdnsSrv : mAvailableServices.values()) {
							if (rdnsSrv instanceof RadioDnsServiceSpi) {
								((RadioDnsServiceSpi) rdnsSrv).getServiceInformation(mSiCallback);
							} else if (rdnsSrv instanceof RadioDnsServiceEpg) {
								((RadioDnsServiceEpg) rdnsSrv).getServiceInformation(mSiCallback);
							}
						}
					}
				} else {
					notifyListeners(100, true);
				}
			} else {
				double scanProgress = (((double)mCoreCallbacksTotal - (double)mLookups.size()) / (double)mCoreCallbacksTotal) * 45.d;
				notifyListeners((int)(5.d+scanProgress), false);
			}
		}
	};

	private final OnSearchResultListener<ServiceList> mOnSearchResultListener = serviceList -> {

		notifyListeners(50, false);

		List<RadioService> foundIpServices = new ArrayList<>();
		double perSrv = 50.d / serviceList.getContent().length;
		int srvsDone = 0;
		for(RankedStandaloneService rankedSrv : serviceList.getContent()) {
			if(!mIsScanning) {
				return;
			}

			RadioServiceIpImpl ipSrv = new RadioServiceIpImpl();
			ipSrv.setHradioSearchSource(rankedSrv.getSource());

			notifyListeners((int)(50 + (perSrv*srvsDone++)), false);

			if(rankedSrv.getContent().getName().isEmpty()) {
				if(BuildConfig.DEBUG)Log.w(TAG, "HRadioHttpClient Servicename is empty");
				continue;
			}

			ipSrv.setServiceLabel(rankedSrv.getContent().getName());

			if(BuildConfig.DEBUG) Log.d(TAG, "HRadioHttpClient Service: " + rankedSrv.getContent().getName() + ", " + rankedSrv.getContent().getId() + ", Source: " + rankedSrv.getSource() + ", Score: " + rankedSrv.getScore());
			for(eu.hradio.httprequestwrapper.dtos.service_search.Bearer bearer : rankedSrv.getContent().getBearers()) {
				if(BuildConfig.DEBUG) Log.d(TAG, "HRadioHttpClient Bearer Type: " + bearer.getType().toString() + ", Address: " + bearer.getAddress() + ", MIME: " + bearer.getMimeType() + ", Bitrate: " + bearer.getBitrate());

				switch (bearer.getType()) {
					case DAB:
						ipSrv.addBearer(new RadioDnsEpgBearerDab(bearer.getAddress(), 100, bearer.getMimeType(), bearer.getBitrate()));
						break;
					case HTTP: {
						ipSrv.addBearer(new RadioDnsEpgBearerIpHttp(bearer.getAddress(), 10, bearer.getMimeType(), bearer.getBitrate()));

						RadioServiceIpStreamImpl stream = new RadioServiceIpStreamImpl();
						stream.setBitrate(bearer.getBitrate());
						stream.setOffset(-1);
						stream.setStreamUrl(bearer.getAddress());

						switch (bearer.getMimeType()) {
							case "audio/aac":
							case "audio/aacp":
							case "audio/x-scpls":
								stream.setMimeType(RadioServiceMimeType.AUDIO_AAC);
								stream.setCost(80);
								break;
							case "audio/mpeg":
							case "audio/x-mpegurl":
								stream.setMimeType(RadioServiceMimeType.AUDIO_MPEG);
								stream.setCost(100);
								break;
							case "audio/edi":
								if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClientEDI found EDI stream");
								stream.setMimeType(RadioServiceMimeType.AUDIO_EDI);
								stream.setCost(100);
								break;
							default:
								stream.setMimeType(RadioServiceMimeType.UNKNOWN);
								stream.setCost(-1);
								break;
						}

						//don't add unknown streams
						if(stream.getMimeType() != RadioServiceMimeType.UNKNOWN) {
							if(BuildConfig.DEBUG) {
								if(stream.getMimeType() == RadioServiceMimeType.AUDIO_EDI) {
									Log.d(TAG, "HRadioHttpClientEDI adding EDI stream for: " + ipSrv.getServiceLabel());
								}
							}
							ipSrv.addStream(stream);
						}

						break;
					}
				}
			}

			boolean srvOkay = false;
			if(ipSrv.getIpStreams().isEmpty()) {
				if(BuildConfig.DEBUG)Log.w(TAG, "HRadioHttpClient IpStreams empty, searching available DAB service");
				for(RadioService searchSrv : Radio.getInstance().getRadioServices()) {
					if(searchSrv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB || searchSrv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_EDI) {
						RadioServiceDab dabSrv = (RadioServiceDab)searchSrv;
						for (RadioDnsEpgBearer dnsBear : ipSrv.getBearers()) {
							if (dnsBear.getBearerType() == RadioDnsEpgBearerType.DAB) {
								RadioDnsEpgBearerDab dabBearer = (RadioDnsEpgBearerDab)dnsBear;
								if(dabSrv.getEnsembleId() == dabBearer.getEnsembleId() && dabSrv.getEnsembleEcc() == dabBearer.getEnsembleEcc() && dabSrv.getServiceId() == dabBearer.getServiceId()) {
									if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Found DAB service '" + dabSrv.getServiceLabel() + "' for IPService without IpStreams");
									srvOkay = true;
									break;
								}
							}
						}
					}
				}
			} else {
				srvOkay = true;
			}

			if(srvOkay) {
				//TODO other properties like location, keywords, genres

				//mediadescriptions
				for (eu.hradio.httprequestwrapper.dtos.service_search.MediaDescription mediaDesc : rankedSrv.getContent().getMediaDescriptions()) {
					if (mediaDesc.getType() != null) {
						if (mediaDesc.getType().equals("SHORT_DESCRIPTION")) {
							if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Setting short description");
							if(mediaDesc.getShortDescription() != null) {
								if (!mediaDesc.getShortDescription().isEmpty()) {
									ipSrv.setShortDescription(mediaDesc.getShortDescription());
								}
							}
						}

						if (mediaDesc.getType().equals("LONG_DESCRIPTION")) {
							if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Setting long description");
							if(mediaDesc.getLongDescription() != null) {
								if (!mediaDesc.getLongDescription().isEmpty()) {
									ipSrv.setLongDescription(mediaDesc.getLongDescription());
								}
							}
						}

						if(mediaDesc.getType().equals("MULTIMEDIA")) {
							if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Setting mediadescription multimedia");

							if(mediaDesc.getMultimediaType() != null) {
								MultimediaType mmType = null;
								VisualMimeType logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN;
								int logoWidth = 0;
								int logoHeight = 0;

								switch (mediaDesc.getMultimediaType()) {
									case "logo_colour_square": {
										mmType = MultimediaType.MULTIMEDIA_LOGO_SQUARE;
										logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_PNG;
										logoWidth = 32;
										logoHeight = 32;
										break;
									}
									case "logo_colour_rectangle": {
										mmType = MultimediaType.MULTIMEDIA_LOGO_RECTANGLE;
										logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_PNG;
										logoWidth = 112;
										logoHeight = 32;
										break;
									}
									case "":
									case "logo_unrestricted": {
										mmType = MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED;
										for(VisualMimeType mimeType : VisualMimeType.values()) {
											if(mimeType.getMimeTypeString().equalsIgnoreCase(mediaDesc.getMimeValue())) {
												logoMime = mimeType;
												break;
											}
										}
										if(mediaDesc.getHeight() <= 0 || mediaDesc.getWidth() <= 0) {
											if(BuildConfig.DEBUG)Log.w(TAG, "HRadioHttpClient " + MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED + " has invalid dimensions of: " + mediaDesc.getWidth() + "x" + mediaDesc.getHeight());
											continue;
										}

										logoWidth = mediaDesc.getWidth();
										logoHeight = mediaDesc.getHeight();

										break;
									}
								}

								if(logoMime != VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN) {
									Multimedia logoMm = new Multimedia(mmType, "en", mediaDesc.getUrl(), mediaDesc.getMimeValue(), logoWidth, logoHeight);

									VisualLogoImpl stationLogo = new VisualLogoImpl();
									stationLogo.setHeight(logoHeight);
									stationLogo.setWidth(logoWidth);

									stationLogo.setVisualMimeType(logoMime);
									stationLogo.setLogoUrl(mediaDesc.getUrl());
									stationLogo.addBearer(ipSrv.getBearers());

									Collections.sort(stationLogo.getBearers());

									boolean downloadLogo = true;
									List<Visual> logoList = VisualLogoManager.getInstance().getLogoVisuals(ipSrv);
									for(Visual compVis : logoList) {
										if(compVis.equals(stationLogo)) {
											if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Logo " + ((VisualLogoImpl)compVis).getLogoUrl() + " already exists");
											if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Logo for " + ipSrv.getServiceLabel() + " : " + compVis.getVisualWidth() + "x" + compVis.getVisualHeight() + " : " + compVis.getVisualMimeType() + " already exists");
											downloadLogo = false;
											break;
										}
									}

									if(downloadLogo) {
										String logoPath = downloadHttpLogoFile(logoMm.getUrl(), logoMm, stationLogo);
										if (logoPath != null) {
											stationLogo.setFilePath(logoPath);
											VisualLogoManager.getInstance().addLogoVisual(stationLogo);
										}
									} else {
										if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Logos for " + ipSrv.getServiceLabel() + " existing, not downloading");
									}
								} else {
									Log.w(TAG, "ignore logo with mime '" + logoMime + "'");
								}
							}
						}
					}
				}

				foundIpServices.add(ipSrv);
			} else {
				if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient No IP streams and no matching DAB service found");
			}
		}

		for(RadioService foundSrv : foundIpServices) {
			if(foundSrv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_IP) {
				RadioServiceIp ipSrv = (RadioServiceIp)foundSrv;
				for(RadioServiceIpStream stream : ipSrv.getIpStreams()) {
					if(stream.getMimeType() == RadioServiceMimeType.AUDIO_EDI) {
						if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Found EdiStream Service at: " + stream.getUrl());
					}
				}
			}
		}

		for(IpScannerListener listener : mScannerListeners) {
			listener.foundStreamingServices(new ArrayList<>(foundIpServices));
		}

		VisualLogoManager.getInstance().serializeLogos();

		notifyListeners(100, true);

		mIsScanning = false;
	};

	private final OnErrorListener mOnErrorListener = e -> {
		Log.e(TAG, "HRadioHttpClient onError: " + e);
		if (BuildConfig.DEBUG)
			//noinspection CallToPrintStackTrace
			e.printStackTrace();

		notifyListeners(100, true);
		mIsScanning = false;
	};

	private volatile boolean mEnrichInProgress = false;
	void enrichServices(List<RadioService> services) {
		final Context context = ((RadioImpl)Radio.getInstance()).getAppContext();
		if(context != null && !mEnrichInProgress) {
			mEnrichInProgress = true;

			for(RadioService enrichSrv : services) {
				if(enrichSrv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB) {
					RadioServiceDabImpl dabSrv = (RadioServiceDabImpl) enrichSrv;
					if(dabSrv.isProgrammeService()) {
						String bearer = "dab:" + Integer.toHexString(dabSrv.getServiceId()).charAt(0)
								+ Integer.toHexString(dabSrv.getEnsembleEcc()) + "."
								+ Integer.toHexString(dabSrv.getEnsembleId()) + "."
								+ Integer.toHexString(dabSrv.getServiceId()) + "."
								+ "0";

						Log.d(TAG, "Enrich BearerId for Service " + dabSrv.getServiceLabel() + " : " + bearer);
						Map<String, String> builder = new HashMap<>();
						builder.put("bearers.address", bearer);

						ServiceSearchClient impl = new ServiceSearchClientImpl();

						impl.asyncServiceSearch(builder, serviceList -> {
							if(BuildConfig.DEBUG)Log.d(TAG, "Enrich found " + serviceList.getSize() + " services for bearer: " + bearer);
							for(RankedStandaloneService rankedSrv : serviceList.getContent()) {
								if(BuildConfig.DEBUG)Log.d(TAG, "Enrich rankedSrv: " + rankedSrv.getContent().getName());
								for(eu.hradio.httprequestwrapper.dtos.service_search.MediaDescription mDesc : rankedSrv.getContent().getMediaDescriptions()) {
									if(mDesc.getType().equals("MULTIMEDIA")) {
										if(BuildConfig.DEBUG)Log.d(TAG, "Enrich LogoUrl: " + mDesc.getUrl());
									}
								}

								//mediadescriptions
								for (eu.hradio.httprequestwrapper.dtos.service_search.MediaDescription mediaDesc : rankedSrv.getContent().getMediaDescriptions()) {
									if (mediaDesc.getType() != null) {

										if (mediaDesc.getType().equals("SHORT_DESCRIPTION")) {
											if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Setting short description");
											if(mediaDesc.getShortDescription() != null) {
												if (!mediaDesc.getShortDescription().isEmpty()) {
													dabSrv.setShortDescription(mediaDesc.getShortDescription());
												}
											}
										}

										if (mediaDesc.getType().equals("LONG_DESCRIPTION")) {
											if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Setting long description");
											if(mediaDesc.getLongDescription() != null) {
												if (!mediaDesc.getLongDescription().isEmpty()) {
													dabSrv.setLongDescription(mediaDesc.getLongDescription());
												}
											}
										}

										if(mediaDesc.getType().equals("MULTIMEDIA")) {
											if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Setting mediadescription multimedia");

											if(mediaDesc.getMultimediaType() != null) {
												MultimediaType mmType = null;
												VisualMimeType logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN;
												int logoWidth = 0;
												int logoHeight = 0;

												switch (mediaDesc.getMultimediaType()) {
													case "logo_colour_square": {
													mmType = MultimediaType.MULTIMEDIA_LOGO_SQUARE;
													logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_PNG;
														logoWidth = 32;
														logoHeight = 32;
													break;
													}
													case "logo_colour_rectangle": {
														mmType = MultimediaType.MULTIMEDIA_LOGO_RECTANGLE;
														logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_PNG;
														logoWidth = 112;
														logoHeight = 32;
														break;
													}
													case "":
													case "logo_unrestricted": {
														mmType = MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED;
														for(VisualMimeType mimeType : VisualMimeType.values()) {
															if(mimeType.getMimeTypeString().equalsIgnoreCase(mediaDesc.getMimeValue())) {
																logoMime = mimeType;
																break;
															}
														}
														if(mediaDesc.getHeight() <= 0 || mediaDesc.getWidth() <= 0) {
															if(BuildConfig.DEBUG)Log.w(TAG, "HRadioHttpClient " + MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED + " has invalid dimensions of: " + mediaDesc.getWidth() + "x" + mediaDesc.getHeight());
															continue;
														}

														logoWidth = mediaDesc.getWidth();
														logoHeight = mediaDesc.getHeight();

														break;
													}
												}

												if(logoMime != VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN) {
													Multimedia logoMm = new Multimedia(mmType, "en", mediaDesc.getUrl(), mediaDesc.getMimeValue(), logoWidth, logoHeight);

													VisualLogoImpl stationLogo = new VisualLogoImpl();
													stationLogo.setHeight(logoHeight);
													stationLogo.setWidth(logoWidth);

													stationLogo.setVisualMimeType(logoMime);
													stationLogo.setLogoUrl(mediaDesc.getUrl());
													RadioDnsEpgBearerDab dabBearer = new RadioDnsEpgBearerDab(bearer, 20, "audio/aac", !dabSrv.getServiceComponents().isEmpty() ? dabSrv.getServiceComponents().get(0).getBitrate() : 0);
													stationLogo.addBearer(dabBearer);

													Collections.sort(stationLogo.getBearers());

													boolean downloadLogo = true;
													List<Visual> logoList = VisualLogoManager.getInstance().getLogoVisuals(dabSrv);
													for(Visual compVis : logoList) {
														if(compVis.equals(stationLogo)) {
															if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Logo " + ((VisualLogoImpl)compVis).getLogoUrl() + " already exists");
															if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Logo for " + dabSrv.getServiceLabel() + " : " + compVis.getVisualWidth() + "x" + compVis.getVisualHeight() + " : " + compVis.getVisualMimeType() + " already exists");
															downloadLogo = false;
															break;
														}
													}

													if(downloadLogo) {
														String logoPath = downloadHttpLogoFile(logoMm.getUrl(), logoMm, stationLogo);
														if (logoPath != null) {
															stationLogo.setFilePath(logoPath);
															VisualLogoManager.getInstance().addLogoVisual(stationLogo);
														}
													} else {
														if(BuildConfig.DEBUG)Log.d(TAG, "HRadioHttpClient Logos for " + dabSrv.getServiceLabel() + " existing, not downloading");
													}
												} else {
													Log.w(TAG, "ignore logo with mime '" + logoMime + "'");
												}
											}
										}
									}
								}

								VisualLogoManager.getInstance().serializeLogos();
							}
						}, e -> {
							Log.e(TAG, "Enrich onError: " + e);
							if(BuildConfig.DEBUG) {
								//noinspection CallToPrintStackTrace
								e.printStackTrace();
							}
						});
					}
				}

				mEnrichInProgress = false;
				if(BuildConfig.DEBUG)Log.d(TAG, "Enrich finished");
			}
		}
	}

	synchronized private void scanHradioServices(Bundle optBundle) {
		if(BuildConfig.DEBUG)Log.d(TAG, "Starting HRadio ServiceScan: " + mIsScanning);
		final Context context = ((RadioImpl)Radio.getInstance()).getAppContext();
		if(context != null) {
			if (!mIsScanning) {
				mIsScanning = true;

				for (IpScannerListener listener : mScannerListeners) {
					listener.scanStarted();
					listener.scanProgress(0);
				}

				ServiceSearchClient srchClient = new ServiceSearchClientImpl();

				Map<String, String> scanOptMap = new HashMap<>();
				for(String scanOptKey : optBundle.keySet()) {
					Object scanOptVal = optBundle.get(scanOptKey);
					if(scanOptVal instanceof String) {
						if(BuildConfig.DEBUG)Log.d(TAG, "ScanOption: " + scanOptKey + " : " + scanOptVal);
						scanOptMap.put(scanOptKey, (String)scanOptVal);
					}
				}

				if(!scanOptMap.isEmpty()) {
					if (BuildConfig.DEBUG) Log.d(TAG, "HRadioHttpClient starting scan with options");
					srchClient.asyncServiceSearch(scanOptMap, mOnSearchResultListener, mOnErrorListener, true);
				} else {
					if (BuildConfig.DEBUG) Log.d(TAG, "HRadioHttpClient starting scan without options");
					srchClient.asyncGetAllServices(mOnSearchResultListener, mOnErrorListener);
				}
			}
		}
	}

	private final RadioDnsServiceEpgSiCallback mSiCallback = (radioEpgServiceInformation, service) -> {
		if(!mIsScanning) {
			return;
		}

		if(radioEpgServiceInformation != null) {
			List<RadioService> foundIpServices = new ArrayList<>();
			final List<Service> siServices = radioEpgServiceInformation.getServices();
			for (Service siSrv : siServices) {
				if (siSrv != null) {
					if (BuildConfig.DEBUG)
						Log.d(TAG, "SI ServiceName: " + (!siSrv.getNames().isEmpty() ? siSrv.getNames().get(0).getName() : ""));
					RadioServiceIpImpl ipSrv = new RadioServiceIpImpl();

					for (Bearer bearer : siSrv.getBearers()) {
						if (BuildConfig.DEBUG)
							Log.d(TAG, "SI Bearer: " + bearer.getBearerIdString() + ", MIME: " + bearer.getMimeType());
						ipSrv.addBearer(bearer);

						if (bearer.getBearerType() == BearerType.BEARER_TYPE_HTTP || bearer.getBearerType() == BearerType.BEARER_TYPE_HTTPS) {
							RadioServiceIpStreamImpl stream = new RadioServiceIpStreamImpl();
							stream.setBitrate(bearer.getBitrate());
							stream.setCost(bearer.getCost());
							stream.setOffset(bearer.getOffset());
							stream.setStreamUrl(bearer.getBearerIdString());
							switch (bearer.getMimeType()) {
								case "audio/aac":
								case "audio/aacp":
								case "audio/x-scpls":
									stream.setMimeType(RadioServiceMimeType.AUDIO_AAC);
									break;
								case "audio/mpeg":
								case "audio/x-mpegurl":
									stream.setMimeType(RadioServiceMimeType.AUDIO_MPEG);
									break;
								case "audio/edi":
									stream.setMimeType(RadioServiceMimeType.AUDIO_EDI);
									break;
								default:
									stream.setMimeType(RadioServiceMimeType.UNKNOWN);
									break;
							}

							if (stream.getMimeType() != RadioServiceMimeType.UNKNOWN) {
								ipSrv.addStream(stream);
							}
						}
					}

					//TODO no IP bearers
					boolean srvOkay = true;
					if (ipSrv.getIpStreams().isEmpty()) {
						if (BuildConfig.DEBUG)
							Log.w(TAG, "IpStreams empty, searching available DAB service");
						srvOkay = false;
						final List<RadioService> radioServiceList = new ArrayList<>(Radio.getInstance().getRadioServices());
						for (RadioService searchSrv : radioServiceList) {
							if (searchSrv != null &&
									(searchSrv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB
											|| searchSrv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_EDI)) {
								RadioServiceDab dabSrv = (RadioServiceDab) searchSrv;
								final List<RadioDnsEpgBearer> epgBearers = ipSrv.getBearers();
								if (epgBearers != null) {
									for (RadioDnsEpgBearer dnsBear : epgBearers) {
										if (dnsBear.getBearerType() == RadioDnsEpgBearerType.DAB) {
											RadioDnsEpgBearerDab dabBearer = (RadioDnsEpgBearerDab) dnsBear;
											if (dabSrv.getEnsembleId() == dabBearer.getEnsembleId()
													&& dabSrv.getEnsembleEcc() == dabBearer.getEnsembleEcc()
													&& dabSrv.getServiceId() == dabBearer.getServiceId()) {
												if (BuildConfig.DEBUG)
													Log.d(TAG, "Found DAB service '" + dabSrv.getServiceLabel() + "' for IPService without IpStreams");
												srvOkay = true;
												break;
											}
										}
									}
								}
							}
						}
					}

					if (srvOkay) {
						for (Name srvName : siSrv.getNames()) {
							switch (srvName.getType()) {
								case NAME_LONG:
									ipSrv.setServiceLabel(srvName.getName());
									break;
								case NAME_MEDIUM:
								case NAME_SHORT:
									if (ipSrv.getServiceLabel().isEmpty()) {
										ipSrv.setServiceLabel(srvName.getName());
									}
									break;
							}
						}

						for (Genre genre : siSrv.getGenres()) {
							TermIdImpl termId = new TermIdImpl();
							termId.setGenreHref(genre.getGenreHref());
							termId.setTermId(genre.getTvaCs().getScheme());
							termId.setGenreText(genre.getGenre());
							ipSrv.addGenre(termId);
						}

						if (siSrv.getKeywords() != null) {
							for (String keyWord : siSrv.getKeywords().getKeywords()) {
								ipSrv.addKeyword(keyWord);
							}
						}

						if (siSrv.getLinks() != null && !siSrv.getLinks().isEmpty()) {
							for (Link link : siSrv.getLinks()) {
								ipSrv.addLink(link.getUri());
							}
						}

						if (siSrv.getRadioDns() != null) {
							ipSrv.setRadioDns(siSrv.getRadioDns());
						}

						for (MediaDescription mediaDesc : siSrv.getMediaDescriptions()) {
							if (!mIsScanning) {
								if (BuildConfig.DEBUG)
									Log.d(TAG, "Stopping multimedia processing because scan was stopped");
								return;
							}

							for (Description desc : mediaDesc.getDescriptions()) {
								switch (desc.getType()) {
									case DESCRIPTION_SHORT: {
										ipSrv.setShortDescription(desc.getDescription());
										break;
									}
									case DESCRIPTION_LONG: {
										ipSrv.setLongDescription(desc.getDescription());
										break;
									}
								}
							}

							Multimedia multiMedia = mediaDesc.getMultimedia();
							if (multiMedia != null) {
								if (BuildConfig.DEBUG)
									Log.d(TAG, "SI Multimedia Type: " + multiMedia.getType().toString() + ", Width: " + multiMedia.getWidth() + ", Height: " + multiMedia.getHeight());

								//check for dimensions if type is MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED
								if (multiMedia.getType() == MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED) {
									if (multiMedia.getHeight() <= 0 || multiMedia.getWidth() <= 0) {
										if (BuildConfig.DEBUG)
											Log.w(TAG, MultimediaType.MULTIMEDIA_LOGO_UNRESTRICTED + " has invalid dimensions of: " + multiMedia.getWidth() + "x" + multiMedia.getHeight());
										continue;
									}
								}

								VisualLogoImpl stationLogo = new VisualLogoImpl();
								stationLogo.setHeight(multiMedia.getHeight());
								stationLogo.setWidth(multiMedia.getWidth());

								// check for logo size restrictions
								// create local copy of Bundle
								Bundle scanRdnsOptions = new Bundle(mScanRdnsOptionsBundle);

								// check for restriction of MIN or MAX width/height
								if (scanRdnsOptions.containsKey(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MAX_WIDTH) ||
										  scanRdnsOptions.containsKey(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MAX_HEIGHT) ||
										  scanRdnsOptions.containsKey(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MIN_WIDTH) ||
										  scanRdnsOptions.containsKey(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MIN_HEIGHT) ) {
									final int maxWidth = scanRdnsOptions.getInt(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MAX_WIDTH, -1);
									final int maxHeight = scanRdnsOptions.getInt(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MAX_HEIGHT, -1);
									final int minWidth = scanRdnsOptions.getInt(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MIN_WIDTH, -1);
									final int minHeight = scanRdnsOptions.getInt(RadioImpl.SERVICE_SEARCH_OPT_LOGO_MIN_HEIGHT, -1);
									boolean downloadAllowed = true;
									//noinspection RedundantIfStatement
									if (maxWidth != -1 && multiMedia.getWidth() > maxWidth) {
										downloadAllowed = false;
									}
									if (maxHeight != -1 && multiMedia.getHeight() > maxHeight) {
										downloadAllowed = false;
									}
									if (minWidth != -1 && multiMedia.getWidth() < minWidth) {
										downloadAllowed = false;
									}
									if (minHeight != -1 && multiMedia.getHeight() < minHeight) {
										downloadAllowed = false;
									}
									if (!downloadAllowed) {
										if (BuildConfig.DEBUG) {
											Log.d(TAG, "Not downloading logo "
													+ multiMedia.getWidth() + "x" + multiMedia.getHeight()
													+ " due to restriction max " + maxWidth + "x" + maxHeight
													+ " and/or min " + minWidth + "x" + minHeight);
										}
										continue;
									}
								}

								VisualMimeType logoMime = VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN;
								for (VisualMimeType mimeType : VisualMimeType.values()) {
									if (mimeType.getMimeTypeString().equalsIgnoreCase(multiMedia.getMime())) {
										logoMime = mimeType;
										break;
									}
								}

								// relax requirement for proper MIME type
								/*if (logoMime != VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN)*/ {
									stationLogo.setVisualMimeType(logoMime);
									stationLogo.setLogoUrl(multiMedia.getUrl());
									stationLogo.addBearer(ipSrv.getBearers());

									// why sorting? Collections.sort(stationLogo.getBearers());

									String logoPath = downloadHttpLogoFile(multiMedia.getUrl(), multiMedia, stationLogo);
									if (logoPath != null) {
										stationLogo.setFilePath(logoPath);
										VisualLogoManager.getInstance().addLogoVisual(stationLogo);
									} else {
										Log.w(TAG, "LogoDownload failed: " + multiMedia.getUrl());
									}
								} /* else {
									Log.w(TAG, "ignore logo with mime '" + logoMime + "'");
								} */
							}
						}


						if (ipSrv.getIpStreams().isEmpty()) {
							if (BuildConfig.DEBUG)
								Log.w(TAG, "Empty IpStreams for: " + ipSrv.getServiceLabel() + " with " + ipSrv.getLogos().size() + " logos");
						}

						foundIpServices.add(ipSrv);
					} else {
						if (BuildConfig.DEBUG) Log.d(TAG, "IpStreams empty and no DAB service found");
					}
				}
			}

			for(IpScannerListener listener : mScannerListeners) {
				listener.foundStreamingServices(new ArrayList<>(foundIpServices));
			}

			if(BuildConfig.DEBUG) {
				Log.d(TAG, "Found " + foundIpServices.size() + " IpServices");
				for (RadioService foundSrv : foundIpServices) {
					Log.d(TAG, "Found " + foundSrv.getServiceLabel());
				}
			}
		}

		mSiCallbacksPendings.decrementAndGet();

		if(mSiCallbacksPendings.get() == 0) {
			notifyListeners(100, true);

			VisualLogoManager.getInstance().serializeLogos();
		} else {
			double scanProgress  = (((double)mAvailableServices.size() - (double)mSiCallbacksPendings.get()) / (double)mAvailableServices.size()) * 50.d;
			notifyListeners((int)scanProgress + 50, false);
		}
	};

	synchronized private void notifyListeners(int scanProgress, boolean finished) {
		for (IpScannerListener listener : mScannerListeners) {
			listener.scanProgress(scanProgress);
			if(finished) {
				listener.scanFinished();
				mIsScanning = false;
			}
		}
	}

	void scanServices(Bundle searchOptions) {
		if(!mIsScanning) {
			if (searchOptions != null) {
				if (searchOptions.containsKey(RadioImpl.SERVICE_SEARCH_OPT_USE_HRADIO)) {
					scanHradioServices(searchOptions);
				} else {
					scanRdnsServices(searchOptions);
				}
			} else {
				scanRdnsServices(null);
			}
		}
	}

	synchronized private void scanRdnsServices(@Nullable Bundle searchOptions) {
		if(BuildConfig.DEBUG)Log.d(TAG, "Starting ServiceScan: " + mIsScanning);
		final Context context = ((RadioImpl)Radio.getInstance()).getAppContext();
		if(context != null) {
			if (!mIsScanning) {
				mIsScanning = true;

				mLookups.clear();
				synchronized (mAvailableServices) {
					mAvailableServices.clear();
				}
				mSiCallbacksPendings.set(0);
				if (searchOptions != null) {
					mScanRdnsOptionsBundle = new Bundle(searchOptions);
				} else {
					mScanRdnsOptionsBundle = new Bundle(); // empty
				}

				mClientIdentifications.clear();
				@Nullable Bundle clientIdsBundle = mScanRdnsOptionsBundle
						.getBundle(RadioImpl.SERVICE_SEARCH_OPT_RADIO_DNS_CLIENT_IDENTIFICATION);
				if (clientIdsBundle != null) {
					for (String key : clientIdsBundle.keySet()) {
						final String clientId = clientIdsBundle.getString(key);
						mClientIdentifications.put(key, clientId);
						if (BuildConfig.DEBUG) {
							Log.i(TAG, "ClientIdentification '" + key + "' '" + clientId + "'");
						}
					}
				}

				for (IpScannerListener listener : mScannerListeners) {
					listener.scanStarted();
					listener.scanProgress(0);
				}

				ArrayList<RadioService> srvList = new ArrayList<>(Radio.getInstance().getRadioServices());
				if (BuildConfig.DEBUG) Log.d(TAG, "Scanning " + srvList.size() + " services");
				if (!srvList.isEmpty()) {
					for (RadioService srv : srvList) {
						if (srv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB || srv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_EDI) {
							if (((RadioServiceDab) srv).isProgrammeService()) {

								RadioDnsCore coreLookup = RadioDnsFactory.createCoreLookup(srv, true);
								mLookups.put(srv, coreLookup);
								if (BuildConfig.DEBUG) Log.d(TAG, "Running lookuptasks: " + mLookups.size());
							}
						}
					}
				} else {
					notifyListeners(100, true);
				}

				mCoreCallbacksTotal = mLookups.size();

				for (RadioDnsCore core : mLookups.values()) {
					core.coreLookup(mCoreCallback, context);
				}

				notifyListeners(5, false);
			}
		} else {
			notifyListeners(100, true);
		}
	}

	void stopScan() {
		if(mIsScanning) {
			mIsScanning = false;
			mSiCallbacksPendings.set(0);
			notifyListeners(100, true);
		}
	}

	@Nullable File getLogoFilesCacheDir() {
	    if (mLogoCacheDir == null) {
			mLogoCacheDir = createLogoFilesCacheDir();
        }
		return mLogoCacheDir;
	}

	@Nullable private File createLogoFilesCacheDir() {
		File dir = VisualLogoManager.getInstance().getLogoFilesCacheDir();
		final android.content.Context context = ((RadioImpl)Radio.getInstance()).getAppContext();
		if(context != null && dir != null) {
			if(BuildConfig.DEBUG)Log.d(TAG, "LogoFilesCacheDir: " + dir.getAbsolutePath());
			if(!dir.exists()) {
				boolean logoCacheCreated = dir.mkdirs();
				if(logoCacheCreated) {
					if(BuildConfig.DEBUG)Log.d(TAG, "Created successfully LogoFilesCacheDir");
				} else {
					Log.w(TAG, "Creating LogoFilesCacheDir failed");
					dir = null;
				}
			}
		} else {
			if (context == null) Log.w(TAG, "Radio context null");
			if (dir == null) Log.w(TAG, "logo files cache dir null");
		}
		return dir;
	}

	/* ETSI TS 102 818
	D.3.3 Caching
		It is recommended that the device use standard HTTP methods for checking whether a resource has changed since last
		acquisition, e.g. by using the If-Modified-Since parameter in the HTTP request for the resource. Similarly, it is
		recommended that the service provider respond to such requests in the expected way with the appropriate HTTP status
		code if the resource has not changed.
	*/
	private String downloadHttpLogoFile(String logoUrl, Multimedia mm, VisualLogoImpl logo) {
		Log.d(TAG, "LogoDownload URL: " + logoUrl);
		final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
		InputStream inputStream = null;
		FileOutputStream fileOutputStream = null;
		HttpURLConnection httpUrlConnection = null;
		boolean downloadNeeded = true;

		File logofile = createLogoFileName(mm, logo);

		if (logofile == null) {
			Log.w(TAG, "LogoDownload URL: " + logoUrl + " failed to create file " + logo.getFilePath());
			return null;
		}

		final long logoFileLastModified = logofile.lastModified();
		final long logoFileAgeMillis = System.currentTimeMillis() - logoFileLastModified;

		if (logoFileAgeMillis > TimeUnit.DAYS.toMillis(1)) {
			// if the file from createLogoFile has not just been created, but already existed for > 1 day,
			// then use the file modification date and ask server if it has been modified since that time

			/* Variant 1: GET THE LAST MODIFIED TIME */
			try {
				httpUrlConnection = (HttpURLConnection) new URL(logoUrl).openConnection();
				long remoteLastModified = httpUrlConnection.getLastModified();
				if (remoteLastModified > 0L) {
					if (logoFileLastModified > remoteLastModified) {
						Log.d(TAG, logoUrl + " no download, remote last-modified " + dateFormat.format(new Date(remoteLastModified)));
						downloadNeeded = false;
					}
				} else {
					Log.d(TAG, logoUrl + " remote last-modified unknown");
				}
			} catch (Throwable e) {
				Log.e(TAG, "exception: " + e);
				if (BuildConfig.DEBUG)
					//noinspection CallToPrintStackTrace
					e.printStackTrace();
			} finally {
				if (httpUrlConnection != null) httpUrlConnection.disconnect();
			}

			/* Variant 2: Using HTTP_NOT_MODIFIED */
			try {
				httpUrlConnection = (HttpURLConnection) new URL(logoUrl).openConnection();
				httpUrlConnection.setRequestMethod("HEAD");
				final int httpResponseCode = httpUrlConnection.getResponseCode();
				if (httpResponseCode == HttpURLConnection.HTTP_NOT_MODIFIED) {
					Log.d(TAG, logoUrl + " no download, not modified, code " + httpResponseCode);
					downloadNeeded = false;
				}
			}  catch (Throwable e) {
				Log.e(TAG, "exception: " + e);
				if (BuildConfig.DEBUG)
					//noinspection CallToPrintStackTrace
					e.printStackTrace();
			} finally {
				if (httpUrlConnection != null) httpUrlConnection.disconnect();
			}
		}
		else /* logoFileAgeMillis < 1 day */ {
			if (logoFileAgeMillis < TimeUnit.MINUTES.toMillis(30)) {
                // downloaded in the last 30 minutes, no need to download again
                downloadNeeded = false;
            }
        }
        // regardless of age of file: If it is empty, attempt download
        if (logofile.length() == 0L) {
        	downloadNeeded = true;
		}

		if (downloadNeeded) {
			try {
				httpUrlConnection = getConnection(logoUrl);

				if (httpUrlConnection != null) {
					inputStream = httpUrlConnection.getInputStream();
					Log.d(TAG, "Downloading LogoFile: " + logofile.getAbsolutePath()
							+ " from " + httpUrlConnection.getURL().toString());
					if (!logofile.exists()) {
						try {
							if (!logofile.createNewFile()) {
								Log.w(TAG, "Logofile: '" + logofile.getAbsolutePath() + "' failed to create");
							}
						}  catch (Throwable e) {
							Log.e(TAG, "exception: " + e);
							if (BuildConfig.DEBUG)
								//noinspection CallToPrintStackTrace
								e.printStackTrace();
						}
					}
					fileOutputStream = new FileOutputStream(logofile);

					byte[] downBuff = new byte[16*1024];

					int len;
					while ((len = inputStream.read(downBuff)) != -1) {
						fileOutputStream.write(downBuff, 0, len);
					}
				}
			}  catch (Throwable e) {
				Log.e(TAG, "exception: " + e);
				if (BuildConfig.DEBUG)
					//noinspection CallToPrintStackTrace
					e.printStackTrace();
				logofile = null;
			} finally {
				try {
					if (inputStream != null) {
						inputStream.close();
					}
					if (fileOutputStream != null) {
						fileOutputStream.close();
					}
					if (httpUrlConnection != null) {
						httpUrlConnection.disconnect();
					}
				}  catch (Throwable e) {
					Log.e(TAG, "exception: " + e);
					if (BuildConfig.DEBUG)
						//noinspection CallToPrintStackTrace
						e.printStackTrace();
				}
			}
		}

		if (logofile != null) {
			if (!logofile.exists()) {
				// should have been downloaded but finally did not create a file
				logofile = null;

			} else if (logofile.length() == 0L) {
				// an empty file was created, delete it
				//noinspection ResultOfMethodCallIgnored
				logofile.delete();
				logofile = null;
			}
		}
		return logofile != null ? logofile.getName() : null;
	}

	public @Nullable HttpURLConnection getConnection(String connUrl) throws IOException {
		final URL url = new URL(connUrl);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setReadTimeout(10000);
		conn.setConnectTimeout(15000);
		conn.setRequestMethod("GET");
		conn.setInstanceFollowRedirects(true);
		conn.setDoInput(true);
		boolean addedClientIdentification = false;
		if (conn instanceof HttpsURLConnection) {
			addedClientIdentification = addClientIdentification((HttpsURLConnection)conn);
		}
		conn.connect();

		// HTTP response codes 200 - 399 are good
		// see https://httpwg.org/specs/rfc9110.html#overview.of.status.codes
		final int httpResponseCode = conn.getResponseCode();
		if (httpResponseCode >= HttpURLConnection.HTTP_OK
				&& httpResponseCode < HttpURLConnection.HTTP_BAD_REQUEST) {
			Log.d(TAG, "GetConnection HTTP: " + httpResponseCode + " " + connUrl
					+ (addedClientIdentification ? " w/ ClientIdentifier" : ""));
		} else {
			Log.i(TAG, "GetConnection HTTP: " + httpResponseCode + " " + connUrl
					+ (addedClientIdentification ? " w/ ClientIdentifier" : ""));
		}
		switch (httpResponseCode) {
			case HttpURLConnection.HTTP_OK:
				// all fine
			break;
			case HttpURLConnection.HTTP_NOT_FOUND: {
				// avoid running into an exception later
				conn.disconnect();
				conn = null;
			}
			break;
			case HttpURLConnection.HTTP_MOVED_PERM:
			case HttpURLConnection.HTTP_MOVED_TEMP: {
				String redirectUrl = conn.getHeaderField("Location");
				if (redirectUrl != null) {
					Log.d(TAG, "GetConnection Following redirect to: " + redirectUrl);
					conn.disconnect();
					return getConnection(redirectUrl);
				} else {
					Log.w(TAG, "GetConnection Redirect URL had no field Location: null");
				}
			}
			break;
			default:
				// all other response codes:
				// let's see what happens when trying to read from the URL...
				break;
		}

		return conn;
	}

	private File createLogoFileName(Multimedia mm, VisualLogoImpl logo) {
		File logoFile = null;
		File logoCacheDir = getLogoFilesCacheDir();
		if(logoCacheDir != null) {
			logoFile = new File(mLogoCacheDir.getAbsolutePath() + "/" + logo.hashCode() + "_" + mm.getWidth() + "_" + mm.getHeight());
			if (logoFile.exists()) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
				Log.d(TAG, "Logofile: '" + logoFile.getAbsolutePath() + "' already exists, last modified "
						+ dateFormat.format(new Date(logoFile.lastModified())));
			} else {
				try {
					if (!logoFile.createNewFile()) {
						Log.w(TAG, "Logofile: '" + logoFile.getAbsolutePath() + "' failed to create");
					}
				}  catch (Throwable e) {
					Log.e(TAG, "exception: " + e);
					if (BuildConfig.DEBUG)
						//noinspection CallToPrintStackTrace
						e.printStackTrace();
				}
				Log.d(TAG, "Logofile: '" + logoFile.getAbsolutePath() + "' didn't exist");
			}
		}

		return logoFile;
	}

	/**
	 * Adds a Client Identification to a not yet connected {@link HttpsURLConnection}
	 *
	 * @param connection {@link HttpsURLConnection}
	 * @return true if HTTP request header "Authorization: ClientIdentifier ..." was added
	 * @see "ETSI TS 102 818 v3.3.1, 10.5.5 Client Identification"
	 */
	private boolean addClientIdentification(@NonNull HttpsURLConnection connection) {
		try {
			final URL url = connection.getURL();
			if (url != null) {
				final String host = url.getHost();
				if (host != null) {
					final @Nullable String clientId = mClientIdentifications.get(host);
					if (clientId != null) {
						connection.setRequestProperty(HTTPS_REQUEST_AUTHORIZATION,
								HTTPS_REQUEST_CLIENT_IDENTIFIER + " " + clientId); // space is a MUST
						if (BuildConfig.DEBUG) {
							Log.v(TAG, "host '" + host + "': " + HTTPS_REQUEST_AUTHORIZATION
									+ ": " + HTTPS_REQUEST_CLIENT_IDENTIFIER + " " + clientId);
						}
						return true;
					}
				}
			} else {
				Log.w(TAG, "has no URL: " + connection);
			}
		} catch (Throwable e) {
			//noinspection CallToPrintStackTrace
			e.printStackTrace();
		}
		return false;
	}

	/* Callback Interface */
	interface IpScannerListener {

		void scanStarted();

		void scanProgress(int percent);

		void foundStreamingServices(List<RadioService> ipStreamservices);

		void scanFinished();
	}
}
