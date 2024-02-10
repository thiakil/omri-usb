package org.omri.radio.impl;

import static org.omri.BuildConfig.DEBUG;

import android.content.Context;
import android.content.SharedPreferences;
import android.hardware.usb.UsbDevice;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.util.Pair;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.preference.PreferenceManager;

import org.omri.radio.Radio;
import org.omri.radio.RadioErrorCode;
import org.omri.radio.RadioStatus;
import org.omri.radio.RadioStatusListener;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceType;
import org.omri.tuner.ReceptionQuality;
import org.omri.tuner.Tuner;
import org.omri.tuner.TunerListener;
import org.omri.tuner.TunerStatus;
import org.omri.tuner.TunerType;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.concurrent.atomic.AtomicBoolean;

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
public class RadioImpl extends Radio implements TunerListener, UsbHelper.UsbHelperCallback {

	private final String TAG = "RadioImpl";
	
	private RadioStatus mRadioStatus = RadioStatus.STATUS_RADIO_SUSPENDED;
	
	private final List<Tuner> mTunerList;
	private final List<RadioService> mRadioserviceList;
	private final List<RadioStatusListener> mRadioStatusListeners;

	/* NTP time for unreliable System time */
	//fallback to system time as default
	private static long mNtpPosixMs = new Date().getTime() * 1000000;
	private static long mStartSystemNano;
	private final static long NANO_PART = 1000000;
	private static boolean mNtpSync = false;

	private final AtomicBoolean mContextGuard = new AtomicBoolean();
	private Context mContext;

	Context getAppContext() {
		final Context ret;
		synchronized (mContextGuard) {
			ret = mContext;
		}
		if (DEBUG && ret == null) {
			// Radio instance without a Context is nearly useless.
			// Force a DEBUG version of App to crash.
			throw new NullPointerException("Radio Context null");
		}
		return ret;
	}

	public RadioImpl() {
		this(null);
		mStartSystemNano = System.nanoTime();
	}
	
	private RadioImpl(@Nullable Context context) {
		synchronized (mContextGuard) {
			this.mContext = context;
		}
		this.mTunerList = Collections.synchronizedList(new ArrayList<>());
		this.mRadioserviceList = Collections.synchronizedList(new ArrayList<>());
		this.mRadioStatusListeners = Collections.synchronizedList(new ArrayList<>());

		if(DEBUG)Log.d(TAG, "Getting NTP time");
		mStartSystemNano = System.nanoTime();
		SNTPClient.getDate(TimeZone.getTimeZone("UTC"), new SNTPClient.SntpListener() {
			@Override
			public void onTimeReceived(long posixMs) {
				Date curDate = new Date();
				Date ntpDate = new Date(posixMs);
				long curDatePosix = curDate.getTime();
				long nowNtpDiff = curDatePosix - posixMs;

				mNtpPosixMs = posixMs;
				mNtpSync = true;

				if(DEBUG)Log.d(TAG, "SBT NTP time received: " + ntpDate + " : "
						+ curDate + " - " + posixMs + " - " + curDatePosix
						+ ", Diff: " + nowNtpDiff);
			}

			@Override
			public void onError(Exception ex) {
				if(DEBUG)Log.d(TAG, "SBT NTP error: " + ex.getMessage());
				mNtpSync = true;
			}
		});
	}

	static long getNtpPosixMs() {
		long nowNano = System.nanoTime();
		return mNtpPosixMs + ((nowNano-mStartSystemNano) / NANO_PART);
	}
	
	@Override
	public RadioErrorCode initialize() {
		if(DEBUG)Log.d(TAG, "Initializing...!");
		return initialize(getAppContext());
	}

	@Override
	public RadioErrorCode initialize(@NonNull Context appContext) {
		if(DEBUG)Log.d(TAG, "Initializing with Context!");
		return initialize(appContext, null);
	}

	@Override
	public RadioErrorCode initialize(@NonNull Context appContext, Bundle bundle) {
		synchronized (mContextGuard) {
			mContext = appContext;
		}

		int ntpRetries = 5;
		while(!mNtpSync && ntpRetries > 0) {
			//Waiting for NTP time sync, will block up to 50 ms
			--ntpRetries;

			if(DEBUG)Log.d(TAG, "Waiting for NTP sync...");
			SystemClock.sleep(10);
		}

		SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(appContext);
		boolean useLookupOnMobile = prefs.getBoolean("omri_use_iplookup_onmobile", false);
		boolean useIpStreamOnMobile = prefs.getBoolean("omri_use_ipstream_onmobile", false);
		boolean useIpStreamHqOnMobile = prefs.getBoolean("omri_use_ipstream_hq_onmobile", false);

		if (DEBUG) Log.d(TAG, "Prefs LookupOnMobile: " + useLookupOnMobile);
		if (DEBUG) Log.d(TAG, "Prefs StreamMobile: " + useIpStreamOnMobile);
		if (DEBUG) Log.d(TAG, "Prefs StreamHqMobile: " + useIpStreamHqOnMobile);

		boolean redirectCoutToALog = false;
		String rawRecordingPath = "";
		boolean demoMode = false;
		if (bundle != null) {
			redirectCoutToALog = bundle.getBoolean(RADIO_INIT_OPT_VERBOSE_NATIVE_LOGS, false);
			rawRecordingPath = bundle.getString(RADIO_INIT_OPT_RAW_RECORDING_PATH, "");
			demoMode = bundle.getBoolean(RADIO_INIT_OPT_DEMO_MODE, false);
			if (DEBUG) {
				Log.d(TAG, RADIO_INIT_OPT_VERBOSE_NATIVE_LOGS + ":" + redirectCoutToALog);
				Log.d(TAG, RADIO_INIT_OPT_RAW_RECORDING_PATH + ":'" + rawRecordingPath + "'");
				Log.d(TAG, RADIO_INIT_OPT_DEMO_MODE + ":" + demoMode);
			}
		}

		UsbHelper.create(appContext, this, redirectCoutToALog, rawRecordingPath);

		//List of Pairs consisting of first.VendorId and second.ProductId
		ArrayList<Pair<Integer, Integer>> wantedDevices = new ArrayList<>();

		if (!demoMode) {
			//Raon DAB USB sticks
			wantedDevices.add(Pair.create(0x16C0, 0x05DC));
			final UsbHelper usbHelper = UsbHelper.getInstance();
			if (usbHelper != null) {
				for (UsbDevice dev : usbHelper.scanForSpecificDevices(wantedDevices)) {
					if (DEBUG) Log.d(TAG, "Found Siano device!");
					Tuner usbTuner = new TunerUsbImpl(dev);
					usbTuner.subscribe(this);
					synchronized (mTunerList) {
						mTunerList.add(usbTuner);
					}
				}
			}
		} else {
			// Demo tuner
			if(DEBUG)Log.d(TAG, "Adding DemoTuner");
			DemoTuner demoTuner = new DemoTuner(rawRecordingPath);
			demoTuner.subscribe(this);
			synchronized (mTunerList) {
				mTunerList.add(demoTuner);
			}
		}

		TunerIpShoutcast ipTuner = new TunerIpShoutcast();
		ipTuner.subscribe(this);
		synchronized (mTunerList) {
			mTunerList.add(ipTuner);
		}

		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			if (DEBUG) Log.d(TAG, "Adding EdiStreamTuner");
			TunerEdistream ediTuner = new TunerEdistream();
			usbHelper.ediStreamTunerAttached(ediTuner);
			ediTuner.subscribe(this);
			synchronized (mTunerList) {
				mTunerList.add(ediTuner);
			}
		}

		if(DEBUG)Log.d(TAG, "Initialized with " + mTunerList.size() + " tuners");

		mRadioStatus = RadioStatus.STATUS_RADIO_RUNNING;
		
		return RadioErrorCode.ERROR_INIT_OK;
	}

	@Override
	public RadioErrorCode suspend() {
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				tuner.suspendTuner();
			}
		}
		
		return RadioErrorCode.ERROR_SUSPEND_OK;
	}

	@Override
	public RadioErrorCode resume() {
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				tuner.resumeTuner();
			}
		}
		return RadioErrorCode.ERROR_RESUME_OK;
	}

	@Override
	public RadioStatus getRadioStatus() {
		return mRadioStatus;
	}

	@Override
	public void deInitialize() {
		if(DEBUG)Log.d(TAG, "deInitialize");
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				tuner.stopRadioService();
				tuner.unsubscribe(this);
				tuner.deInitializeTuner();
			}
		}
		mRadioStatus = RadioStatus.STATUS_RADIO_SUSPENDED;

		synchronized (mTunerList) {
			mTunerList.clear();
		}
		synchronized (mRadioserviceList) {
			mRadioserviceList.clear();
		}
		synchronized (mRadioStatusListeners) {
			mRadioStatusListeners.clear();
		}

		if (UsbHelper.getInstance() != null) UsbHelper.getInstance().destroyInstance();
		VisualLogoManager.getInstance().destroyInstance();
		RadioServiceManager.getInstance().destroyInstance();
	}

	@Override
	public List<Tuner> getAvailableTuners() {
		return mTunerList;
	}

	@Override
	public List<Tuner> getAvailableTuners(TunerType tunerType) {
		ArrayList<Tuner> retList = new ArrayList<>();
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				if (tuner.getTunerType() == tunerType) {
					retList.add(tuner);
				}
			}
		}
		
		return retList;
	}

	@Override
	public List<RadioService> getRadioServices() {
		if(DEBUG)Log.d(TAG, "Returning Services...");

		synchronized (this) {
			List<RadioService> aggServiceList = new ArrayList<>();
			synchronized (mTunerList) {
				for (Tuner atuner : mTunerList) {
					for (RadioService srv : atuner.getRadioServices()) {
						if (!aggServiceList.contains(srv)) {
							aggServiceList.add(srv);
						} else {
							if (DEBUG)
								Log.d(TAG, "ServiceList already contains: '" + srv.getServiceLabel() + "' Type: " + srv.getRadioServiceType().toString() + (srv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB ? (" EId: " + ((RadioServiceDab) srv).getEnsembleId()) : ""));
						}
					}
				}
			}
			/* don't sort to improve performance
			Collections.sort(aggServiceList, new Comparator<RadioService>() {
				@Override
				public int compare(RadioService radioService2, RadioService radioService1) {
					return radioService2.getServiceLabel().toLowerCase().compareTo(radioService1.getServiceLabel().toLowerCase());
				}
			});
			 */

			synchronized (mRadioserviceList) {
				mRadioserviceList.clear();
				mRadioserviceList.addAll(aggServiceList);
			}

			return mRadioserviceList;
		}
	}

	@Override
	public void startRadioService(RadioService radioService) {
		final TunerType wantedType;

		switch (radioService.getRadioServiceType()) {
			case RADIOSERVICE_TYPE_DAB: {
				wantedType = TunerType.TUNER_TYPE_DAB;
				break;
			}
			case RADIOSERVICE_TYPE_FM: {
				wantedType = TunerType.TUNER_TYPE_FM;
				break;
			}
			case RADIOSERVICE_TYPE_IP: {
				wantedType = TunerType.TUNER_TYPE_IP_SHOUTCAST;
				break;
			}
			case RADIOSERVICE_TYPE_HDRADIO: {
				wantedType = TunerType.TUNER_TYPE_HDRADIO;
				break;
			}
			case RADIOSERVICE_TYPE_SIRIUS: {
				wantedType = TunerType.TUNER_TYPE_SIRIUS;
				break;
			}
			case RADIOSERVICE_TYPE_EDI: {
				wantedType = TunerType.TUNER_TYPE_IP_EDI;
				break;
			}
			default: {
				wantedType = null;
				break;
			}
		}

		if(wantedType != null) {
			synchronized (mTunerList) {
				for (Tuner tuner : mTunerList) {
					if (tuner.getTunerType() == wantedType) {
						tuner.startRadioService(radioService);
						break;
					}
				}
			}
		}
	}

	@Override
	public void stopRadioService(RadioService radioService) {
		if(radioService != null) {
			if(DEBUG)Log.d(TAG, "Stopping Service: " + radioService + " : " + radioService.getRadioServiceType().toString());
			synchronized (mTunerList) {
				for (Tuner tuner : mTunerList) {
					RadioService curRunningSrv = tuner.getCurrentRunningRadioService();
					if (curRunningSrv != null) {
						if (curRunningSrv.equals(radioService)) {
							tuner.stopRadioService();
							break;
						}
					}
				}
			}
		}
	}

	@Override
	public void startRadioServiceScan() {
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				tuner.startRadioServiceScan();
			}
		}
	}

	@Override
	public void stopRadioServiceScan() {
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				tuner.stopRadioServiceScan();
			}
		}
	}

	@Override
	public void initializeTuner(Tuner tuner) {
		synchronized (mTunerList) {
			if (mTunerList.contains(tuner)) {
				tuner.initializeTuner();
			}
		}
	}

	@Override
	public void deInitializeTuner(Tuner tuner) {
		synchronized (mTunerList) {
			if (mTunerList.contains(tuner)) {
				tuner.deInitializeTuner();
			}
		}
	}

	/* TunerListener impl */
	@Override
	public void tunerStatusChanged(Tuner tuner, TunerStatus newState) {
		//We can listen here on all tuners for state changes
	}

	@Override
	public void tunerScanServiceFound(Tuner tuner, RadioService foundService) {
		//Do something useful with this later
	}

	@Override
	public void tunerScanStarted(Tuner tuner) {

	}

	@Override
	public void tunerScanProgress(Tuner tuner, int percentScanned, int currentFrequencyHz) {

	}

	@Override
	public void tunerScanFinished(Tuner tuner) {

	}

	@Override
	public void radioServiceStarted(Tuner tuner, RadioService startedRadioService) {
		//Do something useful with this later
	}

	@Override
	public void radioServiceStopped(Tuner tuner, RadioService stoppedRadioService) {
		//Do something useful with this later
	}

	@Override
	public void tunerReceptionStatistics(Tuner tuner, boolean rfLock, ReceptionQuality quality, int rawValue) {
		//Do something useful with this later
	}

	@Override
	public void tunerRawData(Tuner tuner, byte[] data) {
		//Do something useful with this later
	}

	@Override
	public void registerRadioStatusListener(RadioStatusListener listener) {
		synchronized (mRadioStatusListeners) {
			if (!mRadioStatusListeners.contains(listener)) {
				mRadioStatusListeners.add(listener);
			}
		}
	}

	@Override
	public void unregisterRadioStatusListener(RadioStatusListener listener) {
		synchronized (mRadioStatusListeners) {
			mRadioStatusListeners.remove(listener);
		}
	}

	//UsbHelperCallback
	@Override
	public void UsbTunerDeviceAttached(UsbDevice attachedDevice) {
		Tuner sianoTuner = new TunerUsbImpl(attachedDevice);
		sianoTuner.subscribe(this);
		synchronized (mTunerList) {
			mTunerList.add(sianoTuner);
		}
		synchronized (mRadioStatusListeners) {
			for (RadioStatusListener cb : mRadioStatusListeners) {
				cb.tunerAttached(sianoTuner);
			}
		}
	}

	@Override
	public void UsbTunerDeviceDetached(UsbDevice detachedDevice) {
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				if (tuner instanceof TunerUsb) {
					if (detachedDevice.equals(((TunerUsb) tuner).getUsbDevice())) {
						synchronized (mRadioStatusListeners) {
							for (RadioStatusListener cb : mRadioStatusListeners) {
								cb.tunerDetached(tuner);
							}
						}
						mTunerList.remove(tuner);
						break;
					}
				}
			}
		}
	}

	/* Prototypical */
	@Override
	public org.omri.radio.RadioServiceManager getRadioServiceManager() {
		return RadioServiceManager.getInstance();
	}

	@Override
	public boolean addRadioService(RadioService addSrv) {
		boolean srvAdded = false;
		if(addSrv != null) {
			srvAdded = RadioServiceManager.getInstance().addRadioservice(addSrv);
			if(srvAdded) {
				RadioServiceManager.getInstance().serializeServices(addSrv.getRadioServiceType());
			}
		}

		return srvAdded;
	}

	@Override
	public boolean removeRadioService(RadioService remSrv) {
		if(remSrv != null) {
			return RadioServiceManager.getInstance().deleteService(remSrv);
		}

		return false;
	}

	public boolean deleteRadioService(RadioService delService) {
		synchronized (mTunerList) {
			for (Tuner chkTun : mTunerList) {
				if (chkTun.getCurrentRunningRadioService() == delService) {
					if (DEBUG)
						Log.d(TAG, "Service to delete is currently running on " + chkTun + ", stopping it");
					chkTun.stopRadioService();
				}
			}
		}
		boolean delSuccess = false;
		if(delService != null) {
			delSuccess = RadioServiceManager.getInstance().deleteService(delService);
		}

		return delSuccess;
	}

	@Override
	@NonNull
	public ArrayList<RadioService> getFollowingServices(RadioService followSrv) {
		ArrayList<RadioService> followingServices = new ArrayList<>();

		if (followSrv != null) {
			followingServices.addAll(followSrv.getFollowingServices());
		}
		return followingServices;
	}

	@Override
	public void dabDateTime(Tuner tuner, Date dabTime) {

	}

	public final static String SERVICE_SEARCH_OPT_USE_HRADIO = "use_hradio";
	public final static String SERVICE_SEARCH_OPT_DELETE_SERVICES = "delete_services";
	public final static String SERVICE_SEARCH_OPT_HYBRID_SCAN = "hybrid_scan";

	/**
	 * Option for {@link TunerIpShoutcast#startRadioServiceScan(Object scanOptions)}.
	 * If a logo image has a greater (>) width than given argument, it is skipped during download.
	 */
	public final static String SERVICE_SEARCH_OPT_LOGO_MAX_WIDTH = "logo_max_width"; // argument type: int

	/**
	 * Option for {@link TunerIpShoutcast#startRadioServiceScan(Object scanOptions)}.
	 * If a logo image has a greater (>) height than given argument, it is skipped during download.
	 */
	public final static String SERVICE_SEARCH_OPT_LOGO_MAX_HEIGHT = "logo_max_height"; // argument type: int

	/**
	 * Option for {@link TunerIpShoutcast#startRadioServiceScan(Object scanOptions)}.
	 * If a logo image has a smaller width (<) than given argument, it is skipped during download.
	 */
	public final static String SERVICE_SEARCH_OPT_LOGO_MIN_WIDTH = "logo_min_width"; // argument type: int

	/**
	 * Option for {@link TunerIpShoutcast#startRadioServiceScan(Object scanOptions)}.
	 * If a logo image has a smaller height (<) than given argument, it is skipped during download.
	 */
	public final static String SERVICE_SEARCH_OPT_LOGO_MIN_HEIGHT = "logo_min_height"; // argument type: int

	public final static String RADIO_INIT_OPT_VERBOSE_NATIVE_LOGS = "verbose_native_logs";
	public final static String RADIO_INIT_OPT_RAW_RECORDING_PATH = "raw_recording_path";
	public final static String RADIO_INIT_OPT_DEMO_MODE = "demo_mode";
}
