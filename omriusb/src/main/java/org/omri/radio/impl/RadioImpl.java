package org.omri.radio.impl;

import java.util.Objects;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.Nullable;
import org.jspecify.annotations.NonNull;
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

import com.thiakil.standin.Context;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


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
public class RadioImpl extends Radio implements TunerListener, UsbHelper.UsbHelperCallback {

	private static final Logger LOGGER = LogManager.getLogger("RadioImpl");

	private RadioStatus mRadioStatus = RadioStatus.STATUS_RADIO_SUSPENDED;

	private final List<Tuner> mTunerList = new ArrayList<Tuner>();
	private final List<RadioService> mRadioserviceList = new ArrayList<RadioService>();
	private final List<RadioStatusListener> mRadioStatusListeners = new ArrayList<>();

	private Context mContext;

	Context getContext() {
		return mContext;
	}

	public RadioImpl() {
	}

	@Override//TODO not null context annotation
	public RadioErrorCode initialize(Context appContext, Object bundle) {
		LOGGER.debug("Initializing with Context!");

		mContext = appContext;


        boolean redirectCoutToALog = false;
		String rawRecordingPath = "";
		boolean demoMode = false;
		if (bundle instanceof InitOptions initOptions) {
			redirectCoutToALog = initOptions.verboseNativeLogs;
			rawRecordingPath = initOptions.rawRecordingsPath != null? initOptions.rawRecordingsPath : "";
			demoMode = initOptions.demoMode;
			LOGGER.debug(RADIO_INIT_OPT_VERBOSE_NATIVE_LOGS + ":" + redirectCoutToALog);
			LOGGER.debug(RADIO_INIT_OPT_RAW_RECORDING_PATH + ":'" + rawRecordingPath + "'");
			LOGGER.debug(RADIO_INIT_OPT_DEMO_MODE + ":" + demoMode);
		}
		UsbHelper.create(this, redirectCoutToALog, rawRecordingPath);


		if (!demoMode) {
			//Raon DAB USB sticks

			for (long dev : Objects.requireNonNull(UsbHelper.getInstance(), "not initialised").scanDevices()) {
				LOGGER.debug("Found Siano device!");
				Tuner usbTuner = new TunerUsbImpl(dev);
				usbTuner.subscribe(this);
				mTunerList.add(usbTuner);
			}

            LOGGER.debug("Initialized with {} tuners", mTunerList.size());
		
		} else {
			// Demo tuner
			LOGGER.debug("Adding DemoTuner");
			DemoTuner demoTuner = new DemoTuner(rawRecordingPath);
			demoTuner.subscribe(this);
			synchronized (mTunerList) {
				mTunerList.add(demoTuner);
			}
		}

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
		LOGGER.debug("deInitialize");
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
		RadioServiceManager.getInstance().destroyInstance();
	}

	@Override
	public @NonNull List<Tuner> getAvailableTuners() {
		return mTunerList;
	}

	@Override
	public @NonNull List<Tuner> getAvailableTuners(TunerType tunerType) {
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
	public @NonNull List<RadioService> getRadioServices() {
		LOGGER.debug("Returning Services...");

		synchronized (this) {
			List<RadioService> aggServiceList = new ArrayList<>();
			synchronized (mTunerList) {
				for (Tuner atuner : mTunerList) {
					for (RadioService srv : atuner.getRadioServices()) {
						if (!aggServiceList.contains(srv)) {
							aggServiceList.add(srv);
						} else {
							LOGGER.debug("ServiceList already contains: '{}' Type: {}{}", srv.getServiceLabel(), srv.getRadioServiceType(), srv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB ? (" EId: " + ((RadioServiceDab) srv).getEnsembleId()) : "");
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
		if (radioService != null) {
            LOGGER.debug("Stopping Service: {} : {}", radioService, radioService.getRadioServiceType().toString());
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
	public void UsbTunerDeviceAttached(long attachedDevice) {
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
	public void UsbTunerDeviceDetached(long detachedDevice) {
		synchronized (mTunerList) {
			for (Tuner tuner : mTunerList) {
				if (tuner instanceof TunerUsb tunerUsb) {
					if (detachedDevice == tunerUsb.getUsbDevice()) {
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
		if (addSrv != null) {
			srvAdded = RadioServiceManager.getInstance().addRadioservice(addSrv);
			if (srvAdded) {
				RadioServiceManager.getInstance().serializeServices(addSrv.getRadioServiceType());
			}
		}

		return srvAdded;
	}

	@Override
	public boolean removeRadioService(RadioService remSrv) {
		if (remSrv != null) {
			return RadioServiceManager.getInstance().deleteService(remSrv);
		}

		return false;
	}

	public boolean deleteRadioService(RadioService delService) {
		synchronized (mTunerList) {
			for (Tuner chkTun : mTunerList) {
				if (chkTun.getCurrentRunningRadioService() == delService) {
					LOGGER.debug("Service to delete is currently running on {}, stopping it", chkTun);
					chkTun.stopRadioService();
				}
			}
		}
		boolean delSuccess = false;
		if (delService != null) {
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

	public record InitOptions(boolean deleteServiced, boolean verboseNativeLogs, @Nullable String rawRecordingsPath, boolean demoMode){}
	public final static String SERVICE_SEARCH_OPT_DELETE_SERVICES = "delete_services";

	public final static String RADIO_INIT_OPT_VERBOSE_NATIVE_LOGS = "verbose_native_logs";
	public final static String RADIO_INIT_OPT_RAW_RECORDING_PATH = "raw_recording_path";
	public final static String RADIO_INIT_OPT_DEMO_MODE = "demo_mode";
}
