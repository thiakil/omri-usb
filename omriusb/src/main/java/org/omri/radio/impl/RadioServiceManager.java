package org.omri.radio.impl;

import com.thiakil.standin.Context;
import java.util.Base64;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;

import org.jetbrains.annotations.Nullable;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.omri.radio.Radio;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceDabComponent;
import org.omri.radioservice.RadioServiceDabUserApplication;
import org.omri.radioservice.RadioServiceType;
import org.omri.tuner.Tuner;
import org.omri.tuner.TunerStatus;
import org.omri.tuner.TunerType;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicBoolean;


/**
 * Copyright (C) 2018 IRT GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License
 * at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 *
 * @author Fabian Sattler, IRT GmbH
 */

class RadioServiceManager implements org.omri.radio.RadioServiceManager {

	private static final Logger LOGGER = LogManager.getLogger("RadioServiceManager");

	@Nullable private static RadioServiceManager INSTANCE = null;
	static final AtomicBoolean instanceGuard = new AtomicBoolean();

	private final ConcurrentHashMap<RadioServiceType, CopyOnWriteArrayList<RadioService>> mServicesMap = new ConcurrentHashMap<>();
	private final ConcurrentHashMap<RadioServiceType, Boolean> mServicesDeSerializingInProgress = new ConcurrentHashMap<>();

	@Nullable private final String SERVICES_DIR;
	@Nullable
	private final String SERVICES_JSON_DAB;

	private boolean mFirstInitDab = true;

	private RadioServiceManager() {
		LOGGER.debug("Constructor");
		final Context context = ((RadioImpl) Radio.getInstance()).getContext();
		if (context != null) {
			SERVICES_DIR = context.getFilesDir() + "/services/";
			SERVICES_JSON_DAB = SERVICES_DIR + "dabservices.json";
		} else {
			SERVICES_DIR = null;
			SERVICES_JSON_DAB = null;
			LOGGER.warn("Radio without context");
		}

		if (SERVICES_DIR != null) {
			File servicesDir = new File(SERVICES_DIR);
			if (!servicesDir.exists()) {
				boolean dirCreated = servicesDir.mkdirs();
				LOGGER.debug("Services dir created: {}", dirCreated);
			}
		}

		mServicesMap.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, new CopyOnWriteArrayList<RadioService>());

		mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, true);

		new Thread(new Runnable() {
			@Override
			public void run() {
				Thread.currentThread().setName("DeserServices");
				deserializeDabServices();
			}
		}).start();
	}

	@NotNull
	static RadioServiceManager getInstance() {
		RadioServiceManager ret = null;
		synchronized (instanceGuard) {
			if (INSTANCE == null) {
				INSTANCE = new RadioServiceManager();
			}
			ret = INSTANCE;
		}
		return ret;
	}

	void destroyInstance() {
		LOGGER.debug("destroyInstance");
		CopyOnWriteArrayList<RadioService> list;
		final RadioServiceType[] types = {
				RadioServiceType.RADIOSERVICE_TYPE_DAB,
		};
		for (RadioServiceType type : types) {
			list = mServicesMap.get(type);
			if (list != null) {
				list.clear();
			}
		}
		mServicesMap.clear();
		synchronized (instanceGuard) {
			INSTANCE = null;
		}
		LOGGER.debug("destroyInstance finished");
	}

	final boolean isServiceListReady(RadioServiceType type) {
		Boolean listInProgress = mServicesDeSerializingInProgress.get(type);
		if (listInProgress != null) {
			return !listInProgress;
		}

		return false;
	}

	void addService(@NotNull RadioService addSrv) {
		CopyOnWriteArrayList<RadioService> addList = mServicesMap.get(addSrv.getRadioServiceType());
		if (addList != null) {
			boolean oldSrvRemoved = addList.remove(addSrv);
			if (oldSrvRemoved) {
                LOGGER.debug("Removed old version of service: {} : {}", addSrv.getServiceLabel(), addSrv.getRadioServiceType().toString());
			}
			boolean addedSrv = addList.add(addSrv);
			if (addedSrv) {
                LOGGER.debug("Added new service: {} : {}", addSrv.getServiceLabel(), addSrv.getRadioServiceType().toString());
			}
		} else {
            LOGGER.debug("Adding unknown ServiceType: {}", addSrv.getRadioServiceType().toString());
		}
	}

	boolean addRadioservice(RadioService addSrv) {
		CopyOnWriteArrayList<RadioService> addList = mServicesMap.get(addSrv.getRadioServiceType());
		if (addList != null) {
			boolean oldSrvRemoved = addList.remove(addSrv);
			if (oldSrvRemoved) {
                LOGGER.debug("Removed old version of service: {} : {}", addSrv.getServiceLabel(), addSrv.getRadioServiceType().toString());
			}

            LOGGER.debug("Added new service: {} : {}", addSrv.getServiceLabel(), addSrv.getRadioServiceType().toString());

			return addList.add(addSrv);
		}
		return false;
	}

	void clearServiceList(@NotNull RadioServiceType type) {
		CopyOnWriteArrayList<RadioService> addList = mServicesMap.get(type);
		if (addList != null) {
			addList.clear();
		}
	}

	void serializeServices(@NotNull RadioServiceType type) {
		switch (type) {
			case RADIOSERVICE_TYPE_DAB:
				mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, true);
				serializeDabServices();
				break;
			default:
				break;
		}
	}

	private void writeServicesFile(String fileNamePath, String servicesJson) throws IOException {
		BufferedWriter srvListWriter = null;
		try {
			//save to file
            LOGGER.debug("Serializing SrvListJson writing to file: {}", fileNamePath);

			File srvListFile = new File(fileNamePath);
			srvListWriter = new BufferedWriter(new FileWriter(srvListFile));
			srvListWriter.write(servicesJson);
			srvListWriter.close();
		} catch (IOException e) {
			LOGGER.error("Failed to write services file", e);
			throw e;
		} finally {
			if (srvListWriter != null) {
				try {
					srvListWriter.close();
				} catch (IOException e) {
					LOGGER.error("Failed to write services file", e);
				}
			}
		}
	}

	private String readServiceFile(String filePathName) throws FileNotFoundException, IOException {
		File savedSrvFile = new File(filePathName);
		if (savedSrvFile.exists()) {

			FileInputStream srvJsonInputStream = null;
			BufferedReader srvJsonReader = null;
			try {
				srvJsonInputStream = new FileInputStream(savedSrvFile);
				srvJsonReader = new BufferedReader(new InputStreamReader(srvJsonInputStream));
				StringBuilder srvJsonBuilder = new StringBuilder();

				char[] readBuf = new char[4096];
				int bytesRead = 0;
				while ((bytesRead = srvJsonReader.read(readBuf)) != -1) {
					srvJsonBuilder.append(readBuf, 0, bytesRead);
				}

				return srvJsonBuilder.toString();
			} finally {
				try {
					if (srvJsonInputStream != null) {
						srvJsonInputStream.close();
					}
					if (srvJsonReader != null) {
						srvJsonReader.close();
					}
				} catch (IOException ioExc) {
					LOGGER.error("Failed to read services file", ioExc);
				}
			}
		}

		return null;
	}

	private JSONObject createDabServiceObject(RadioServiceDabImpl service) throws JSONException {
		JSONObject saveSrvObj = new JSONObject();

		saveSrvObj.put("caId", service.getCaId());
		saveSrvObj.put("ensembleEcc", service.getEnsembleEcc());
		saveSrvObj.put("ensembleFrequency", service.getEnsembleFrequency());
		saveSrvObj.put("ensembleId", service.getEnsembleId());
		saveSrvObj.put("ensembleLabel", service.getEnsembleLabel());
		saveSrvObj.put("ensembleShortLabel", service.getEnsembleShortLabel());
		saveSrvObj.put("radioServiceType", service.getRadioServiceType().toString());
		saveSrvObj.put("serviceId", service.getServiceId());
		saveSrvObj.put("serviceLabel", service.getServiceLabel());
		saveSrvObj.put("serviceShortLabel", service.getShortLabel());
		saveSrvObj.put("isCaProtected", service.isCaProtected());
		saveSrvObj.put("isProgrammeService", service.isProgrammeService());
		JSONArray serviceComponentsArr = new JSONArray();
		for (RadioServiceDabComponent dabSrvComp : service.getServiceComponents()) {
			JSONObject dabSrvCompObj = new JSONObject();
			dabSrvCompObj.put("bitrate", dabSrvComp.getBitrate());
			if (!dabSrvComp.getLabel().isEmpty()) {
				dabSrvCompObj.put("label", dabSrvComp.getLabel());
			}
			dabSrvCompObj.put("mscStartAddress", dabSrvComp.getMscStartAddress());
			dabSrvCompObj.put("packetAddress", dabSrvComp.getPacketAddress());
			dabSrvCompObj.put("protectionLevel", dabSrvComp.getProtectionLevel());
			dabSrvCompObj.put("protectionType", dabSrvComp.getProtectionType());
			dabSrvCompObj.put("scids", dabSrvComp.getServiceComponentIdWithinService());
			dabSrvCompObj.put("compType", dabSrvComp.getServiceComponentType());
			dabSrvCompObj.put("compServiceId", dabSrvComp.getServiceId());
			dabSrvCompObj.put("subChannelId", dabSrvComp.getSubchannelId());
			dabSrvCompObj.put("subChannelSize", dabSrvComp.getSubchannelSize());
			dabSrvCompObj.put("tmId", dabSrvComp.getTmId());
			dabSrvCompObj.put("uepTblIdx", dabSrvComp.getUepTableIndex());
			dabSrvCompObj.put("caApplied", dabSrvComp.isCaApplied());
			dabSrvCompObj.put("dgUsed", dabSrvComp.isDatagroupTransportUsed());
			dabSrvCompObj.put("fecApplied", dabSrvComp.isFecSchemeApplied());
			dabSrvCompObj.put("primary", dabSrvComp.isPrimary());

			if (!dabSrvComp.getUserApplications().isEmpty()) {
				JSONArray userAppsArr = new JSONArray();
				for (RadioServiceDabUserApplication uapp : dabSrvComp.getUserApplications()) {
					JSONObject uappObj = new JSONObject();
					uappObj.put("caOrg", uapp.getCaOrganization());
					uappObj.put("dscty", uapp.getDataServiceComponentType().getType());
					uappObj.put("uappType", uapp.getType().getType());
					if (uapp.getUserApplicationData() != null) {
						uappObj.put("uappData", Base64.getEncoder().encodeToString(uapp.getUserApplicationData()));
					}
					uappObj.put("xpadAppType", uapp.getXpadAppType());
					uappObj.put("caProtected", uapp.isCaProtected());
					uappObj.put("dgUsed", uapp.isDatagroupTransportUsed());
					uappObj.put("isXpadApp", uapp.isXpadApptype());

					userAppsArr.put(uappObj);
				}
				dabSrvCompObj.put("userApplications", userAppsArr);
			}

			serviceComponentsArr.put(dabSrvCompObj);
		}
		saveSrvObj.put("serviceComponents", serviceComponentsArr);

		if (!service.getGenres().isEmpty()) {
			JSONArray genreArr = new JSONArray();
			for (String genre : service.getGenres()) {
				genreArr.put(genre);
			}
			saveSrvObj.put("genres", genreArr);
		}

		if (!service.getFollowingServices().isEmpty()) {
			JSONArray sfServicesArr = new JSONArray();
			for (RadioService srv : service.getFollowingServices()) {
				JSONObject srvObj = new JSONObject();
				srvObj.put("radioServiceType", srv.getRadioServiceType().toString());
				if (srv instanceof RadioServiceDab) {
					RadioServiceDab srvDab = (RadioServiceDab) srv;
					srvObj.put("ensembleEcc", srvDab.getEnsembleEcc());
					srvObj.put("ensembleFrequency", srvDab.getEnsembleFrequency());
					srvObj.put("ensembleId", srvDab.getEnsembleId());
					srvObj.put("serviceId", srvDab.getServiceId());
					srvObj.put("isProgrammeService", srvDab.isProgrammeService());
				}
				sfServicesArr.put(srvObj);
			}
			saveSrvObj.put("followingServices", sfServicesArr);
		}

		return saveSrvObj;
	}

	private void serializeDabServices() {
		if (SERVICES_JSON_DAB != null) {
			mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, true);

			CopyOnWriteArrayList<RadioService> serialisingServices = mServicesMap.get(RadioServiceType.RADIOSERVICE_TYPE_DAB);
			if (serialisingServices != null) {
				JSONArray srvFileArr = new JSONArray();
				for (RadioService saveSrv : serialisingServices) {
					RadioServiceDabImpl dabSaveSrv = (RadioServiceDabImpl) saveSrv;
					try {
						srvFileArr.put(createDabServiceObject(dabSaveSrv));
					} catch (JSONException e) {
						LOGGER.error("Failed to serialise service {}", saveSrv, e);
					}
				}

				try {
					writeServicesFile(SERVICES_JSON_DAB, srvFileArr.toString(2));
				} catch (JSONException | IOException e) {
					LOGGER.error("Failed to write SERVICES_JSON_DAB", e);
				} finally {
					mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, false);
				}

				LOGGER.debug("Serializing DAB SrvListJson done!");
			}
		}
	}

	private void recreateDabService(JSONObject srvObj, RadioServiceDabImpl dabSrv) throws JSONException {
		dabSrv.setCaId(srvObj.getInt("caId"));
		dabSrv.setEnsembleEcc(srvObj.getInt("ensembleEcc"));
		dabSrv.setEnsembleFrequency(srvObj.getInt("ensembleFrequency"));
		dabSrv.setEnsembleId(srvObj.getInt("ensembleId"));
		dabSrv.setEnsembleLabel(srvObj.getString("ensembleLabel"));
		dabSrv.setEnsembleShortLabel(srvObj.getString("ensembleShortLabel"));
		dabSrv.setServiceId(srvObj.getInt("serviceId"));
		dabSrv.setServiceLabel(srvObj.getString("serviceLabel"));
		dabSrv.setShortLabel(srvObj.getString("serviceShortLabel"));
		dabSrv.setIsCaProtected(srvObj.getBoolean("isCaProtected"));
		dabSrv.setIsProgrammeService(srvObj.getBoolean("isProgrammeService"));

		if (srvObj.has("serviceComponents")) {
			JSONArray srvCompArr = srvObj.getJSONArray("serviceComponents");
			for (int j = 0; j < srvCompArr.length(); j++) {
				JSONObject dabSrvCompObj = srvCompArr.getJSONObject(j);

				RadioServiceDabComponentImpl dabSrvComp = new RadioServiceDabComponentImpl();
				dabSrvComp.setScBitrate(dabSrvCompObj.getInt("bitrate"));
				if (dabSrvCompObj.has("label")) {
					dabSrvComp.setScLabel(dabSrvCompObj.getString("label"));
				}
				dabSrvComp.setMscStartAddress(dabSrvCompObj.getInt("mscStartAddress"));
				dabSrvComp.setPacketAddress(dabSrvCompObj.getInt("packetAddress"));
				dabSrvComp.setProtectionLevel(dabSrvCompObj.getInt("protectionLevel"));
				dabSrvComp.setProtectionType(dabSrvCompObj.getInt("protectionType"));
				dabSrvComp.setServiceComponentIdWithinService(dabSrvCompObj.getInt("scids"));
				dabSrvComp.setServiceComponentType(dabSrvCompObj.getInt("compType"));
				dabSrvComp.setServiceId(dabSrvCompObj.getInt("compServiceId"));
				dabSrvComp.setSubchannelId(dabSrvCompObj.getInt("subChannelId"));
				dabSrvComp.setSubchannelSize(dabSrvCompObj.getInt("subChannelSize"));
				dabSrvComp.setTmId(dabSrvCompObj.getInt("tmId"));
				dabSrvComp.setUepTableIndex(dabSrvCompObj.getInt("uepTblIdx"));
				dabSrvComp.setIsScCaFlagSet(dabSrvCompObj.getBoolean("caApplied"));
				dabSrvComp.setDatagroupTransportUsed(dabSrvCompObj.getBoolean("dgUsed"));
				dabSrvComp.setIsFecSchemeApplied(dabSrvCompObj.getBoolean("fecApplied"));
				dabSrvComp.setIsScPrimary(dabSrvCompObj.getBoolean("primary"));

				if (dabSrvCompObj.has("userApplications")) {
					JSONArray uappsArr = dabSrvCompObj.getJSONArray("userApplications");
					for (int k = 0; k < uappsArr.length(); k++) {
						JSONObject uappObj = uappsArr.getJSONObject(k);

						RadioServiceDabUserApplicationImpl uapp = new RadioServiceDabUserApplicationImpl();
						uapp.setCaOrganization(uappObj.getInt("caOrg"));
						uapp.setDSCTy(uappObj.getInt("dscty"));
						uapp.setUserApplicationType(uappObj.getInt("uappType"));

						String uappDataString = uappObj.has("uappData") ? uappObj.getString("uappData") : null;
						if (uappDataString != null && !uappDataString.isEmpty()) {
							uapp.setUappdata(Base64.getDecoder().decode(uappDataString));
						}

						uapp.setXpadApptype(uappObj.getInt("xpadAppType"));
						uapp.setIsCaProtected(uappObj.getBoolean("caProtected"));
						uapp.setIsDatagroupsUsed(uappObj.getBoolean("dgUsed"));
						uapp.setIsXpadApptype(uappObj.getBoolean("isXpadApp"));

						dabSrvComp.addScUserApplication(uapp);
					}
				}

				dabSrv.addServiceComponent(dabSrvComp);
			}
		}

		if (srvObj.has("genres")) {
			JSONArray genreArr = srvObj.getJSONArray("genres");
			for (int l = 0; l < genreArr.length(); l++) {
				dabSrv.addGenre(genreArr.getString(l));
			}
		}

		if (srvObj.has("followingServices")) {
			try {
				JSONArray sfServicesArr = srvObj.getJSONArray("followingServices");
				ArrayList<RadioService> tempSfArray = new ArrayList<>(sfServicesArr.length());
				for (int m = 0; m < sfServicesArr.length(); m++) {
					JSONObject dabSrvObj = sfServicesArr.getJSONObject(m);
					String radioServiceType = dabSrvObj.getString("radioServiceType");
					if (radioServiceType.equals(RadioServiceType.RADIOSERVICE_TYPE_DAB.toString())) {
						RadioServiceDabImpl srvDab = new RadioServiceDabImpl();
						srvDab.setEnsembleEcc(dabSrvObj.getInt("ensembleEcc"));
						srvDab.setEnsembleFrequency(dabSrvObj.getInt("ensembleFrequency"));
						srvDab.setEnsembleId(dabSrvObj.getInt("ensembleId"));
						srvDab.setServiceId(dabSrvObj.getInt("serviceId"));
						srvDab.setIsProgrammeService(dabSrvObj.getBoolean("isProgrammeService"));
						tempSfArray.add(srvDab);
					}
				}
				if (tempSfArray.size() > 0) {
					dabSrv.setFollowingServices(tempSfArray);
				}
			} catch (Exception e) {
				LOGGER.error("error loading following service", e);
			}
		}
	}

	private void deserializeDabServices() {
		if (SERVICES_JSON_DAB != null) {
			Boolean deserInProgress = mServicesDeSerializingInProgress.get(RadioServiceType.RADIOSERVICE_TYPE_DAB);
			if (deserInProgress != null && deserInProgress && !mFirstInitDab) {
				LOGGER.warn("Deserializing DAB services already in progress");
				return;
			}

			mFirstInitDab = false;

			try {
				String savedSrvFileString = readServiceFile(SERVICES_JSON_DAB);
				if (savedSrvFileString != null) {
					mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, true);

					ArrayList<RadioService> tempAddList = new ArrayList<>();

					JSONArray srvListArr = new JSONArray(savedSrvFileString);
                    LOGGER.debug("Read DABSrvListJson length: {}", srvListArr.length());
					for (int i = 0; i < srvListArr.length(); i++) {
						JSONObject srvObj = srvListArr.getJSONObject(i);

						RadioServiceDabImpl dabSrv = new RadioServiceDabImpl();

						recreateDabService(srvObj, dabSrv);
						tempAddList.add(dabSrv);
					}

					mServicesMap.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, new CopyOnWriteArrayList<>(tempAddList));

					LOGGER.debug("Restoring DabSrvListJson done!");
				}
			} catch (JSONException | IOException e) {
				LOGGER.error("Failed to deserialise DabSrvListJson", e);
			} finally {
                LOGGER.debug("Unlocking list for: {}", RadioServiceType.RADIOSERVICE_TYPE_DAB.toString());
				mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, false);

                LOGGER.debug("DAB List unlocked: {}", mServicesDeSerializingInProgress.get(RadioServiceType.RADIOSERVICE_TYPE_DAB));
			}
		} else {
			LOGGER.debug("Restoring DabSrvListJson does not exist");
		}

		mServicesDeSerializingInProgress.put(RadioServiceType.RADIOSERVICE_TYPE_DAB, false);
	}

	/* experimental and dangerous */
	boolean deleteService(RadioService delSrv) {
        LOGGER.debug("Trying to delete: {} : {}", delSrv.getServiceLabel(), delSrv.getRadioServiceType());

		boolean delSuccess = false;
		CopyOnWriteArrayList<RadioService> delList = mServicesMap.get(delSrv.getRadioServiceType());
		if (delList != null) {
			delSuccess = delList.remove(delSrv);

            LOGGER.debug("Delete service success: {}", delSuccess);
			if (delSuccess) {
				scheduleSaveServices(delSrv.getRadioServiceType());
			}
		}

		return delSuccess;
	}

	private ConcurrentHashMap<RadioServiceType, Timer> mSaveDelServicesMap = new ConcurrentHashMap<>();
	void scheduleSaveServices(RadioServiceType type) {
		LOGGER.debug("Scheduling DelSaveServices task");

		Timer delSaveTimer = mSaveDelServicesMap.get(type);
		if (delSaveTimer != null) {
            LOGGER.debug("Canceling previous {} DelSaveServices task", type.toString());
			delSaveTimer.cancel();
		}

		Timer delTimer = new Timer();
		mSaveDelServicesMap.put(type, delTimer);
		delTimer.schedule(new TimerTask() {
			@Override
			public void run() {
                LOGGER.debug("Executing DelSaveServices task for: {}", type.toString());

				if (type == RadioServiceType.RADIOSERVICE_TYPE_DAB) {
					serializeDabServices();
				}
			}
		}, 5000);
	}

	void updateAllServiceFollowingServices(RadioService radioService) {
		LOGGER.debug("updateAllServiceFollowingServices from " + radioService.toString());
		// implemented for DAB only
		if (radioService instanceof RadioServiceDab) {
			boolean shouldSave = false;
			// for all services with from same ensemble as radioService, query LinkedRadioServices and store
			final CopyOnWriteArrayList<RadioService> services = mServicesMap.get(RadioServiceType.RADIOSERVICE_TYPE_DAB);
			final List<Tuner> tuners = Radio.getInstance().getAvailableTuners(TunerType.TUNER_TYPE_DAB);
			if (services != null && !services.isEmpty() && tuners != null && !tuners.isEmpty()) {
				for (RadioService service : services) {
					RadioServiceDab serviceDab = (RadioServiceDab) service;
					// same EId, then query Linked services for this programme service ...
					if (serviceDab.getEnsembleId() == ((RadioServiceDab) radioService).getEnsembleId()
							&& serviceDab.isProgrammeService() ) {
						// ... on all initialized (or scanning) DAB tuners
						for (Tuner tuner : tuners) {
							TunerStatus tunerStatus = tuner.getTunerStatus();
							if (tunerStatus == TunerStatus.TUNER_STATUS_INITIALIZED
									|| tunerStatus == TunerStatus.TUNER_STATUS_SCANNING) {
								ArrayList<RadioService> sfServices = tuner.getLinkedRadioServices(serviceDab);
								boolean hasChanged =
										((RadioServiceImpl) service).setServiceFollowingServices(sfServices);
								if (hasChanged) {
									if (tuner instanceof TunerUsbImpl) {
										((TunerUsbImpl) tuner).callBack(TunerUsbCallbackTypes.SERVICELIST_READY.getIntValue());
									}
									shouldSave = true;
								}
							}
						}
					}
				}
			}
			if (shouldSave) {
				// save
				RadioServiceManager.getInstance().scheduleSaveServices(RadioServiceType.RADIOSERVICE_TYPE_DAB);
			}
		}
	}

	/* RadioServiceManager interface implementation */
	@Override
	public List<RadioService> getRadioServices(RadioServiceType type) {
		if (type != null) {
			Boolean listInProgress = mServicesDeSerializingInProgress.get(type);
			if (listInProgress != null && !listInProgress) {
				CopyOnWriteArrayList<RadioService> retList = mServicesMap.get(type);
				if (retList != null) {
					return retList;
				}
			} else {
                LOGGER.warn("ServiceList for {} is not ready yet", type.toString());
			}
		}

		return new ArrayList<>();
	}

	@Override
	public boolean removeRadioService(RadioService service) {
		if (service != null) {
            LOGGER.debug("Removing service: {} : {}", service.getServiceLabel(), service.getRadioServiceType().toString());
			return deleteService(service);
		}

		return false;
	}

	@Override
	public void addRadioService(RadioService addSrv) {
		if (addSrv != null) {
            LOGGER.debug("Adding service: {} : {}", addSrv.getServiceLabel(), addSrv.getRadioServiceType().toString());
			addService(addSrv);
			scheduleSaveServices(addSrv.getRadioServiceType());
		}
	}

	@Override
	public boolean addRadioServiceFromParams() {
		return false;
	}
}
