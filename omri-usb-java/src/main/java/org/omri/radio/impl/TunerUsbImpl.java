package org.omri.radio.impl;

import com.thiakil.standin.AsyncTask ;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jspecify.annotations.NonNull;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceDabComponent;
import org.omri.radioservice.RadioServiceDabUserApplication;
import org.omri.radioservice.RadioServiceType;
import org.omri.radioservice.metadata.TermId;
import org.omri.tuner.ReceptionQuality;
import org.omri.tuner.Tuner;
import org.omri.tuner.TunerListener;
import org.omri.tuner.TunerStatus;
import org.omri.tuner.TunerType;

import java.util.ArrayList;
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

public class TunerUsbImpl implements TunerUsb {

	private static final Logger LOGGER = LogManager.getLogger("TunerUsb");
	private final TunerType mTunertype = TunerType.TUNER_TYPE_DAB;

	private TunerStatus mTunerStatus = TunerStatus.TUNER_STATUS_NOT_INITIALIZED;
	private List<RadioService> mServices = new ArrayList<>();
	private List<RadioService> mScannedServices = new ArrayList<>();
	private boolean mIsScanning = false;
	private List<TunerListener> mTunerlisteners = new ArrayList<>();
	private RadioServiceDab mCurrentlyRunningService = null;

	private final long mUsbDevice;

	TunerUsbImpl(long device) {
		mUsbDevice = device;
	}

	private boolean mRestoreServicesDone = false;
	private boolean mRestoreInProgress = false;
	private boolean mTunerInitDone = false;

	@Override
	public void initializeTuner() {
		if (mTunerStatus == TunerStatus.TUNER_STATUS_NOT_INITIALIZED) {
			LOGGER.debug("Initializing Tuner");

			UsbHelper.getInstance().attachDevice(this);
			if (!mRestoreInProgress) {
				new RestoreServicesTask().execute();
				mRestoreInProgress = true;
			}
		}
	}

	@Override
	public long getUsbDevice() {
		return mUsbDevice;
	}

	@Override
	public void suspendTuner() {
		UsbHelper.getInstance().stopService(getUsbDevice());

		switch (mTunerStatus) {
			case TUNER_STATUS_SUSPENDED:
			case TUNER_STATUS_NOT_INITIALIZED:
				break;
			case TUNER_STATUS_SCANNING:
				stopRadioServiceScan();
			case TUNER_STATUS_INITIALIZED:
			case TUNER_STATUS_ERROR: {
                LOGGER.debug("Suspending Tuner: {}", this);
				mTunerStatus = TunerStatus.TUNER_STATUS_SUSPENDED;

				for (TunerListener listener : mTunerlisteners) {
					listener.tunerStatusChanged(this, mTunerStatus);
				}
				break;
			}

		}
	}

	@Override
	public void resumeTuner() {
		if (mTunerStatus == TunerStatus.TUNER_STATUS_SUSPENDED) {
			mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;

			for (TunerListener listener : mTunerlisteners) {
				listener.tunerStatusChanged(this, mTunerStatus);
			}
		}
	}

	@Override
	public void deInitializeTuner() {

		switch (mTunerStatus) {
			case TUNER_STATUS_NOT_INITIALIZED:
				break;
			case TUNER_STATUS_SCANNING:
				stopRadioServiceScan();
			case TUNER_STATUS_SUSPENDED:
			case TUNER_STATUS_ERROR:
			case TUNER_STATUS_INITIALIZED: {
				if (UsbHelper.getInstance() != null) {
					UsbHelper.getInstance().stopService(mUsbDevice);
					UsbHelper.getInstance().removeDevice(mUsbDevice);
				}

				mTunerStatus = TunerStatus.TUNER_STATUS_NOT_INITIALIZED;
				for (TunerListener listener : mTunerlisteners) {
					listener.tunerStatusChanged(this, mTunerStatus);
				}
			}
		}
	}

	@Override
	public @NonNull TunerType getTunerType() {
		return mTunertype;
	}

	@Override
	public @NotNull TunerStatus getTunerStatus() {
		return mTunerStatus;
	}

	@Override
	public @NotNull List<RadioService> getRadioServices() {
        LOGGER.debug("getting Services at TunerStatus: {}", mTunerStatus.toString());
		if (mTunerStatus == TunerStatus.TUNER_STATUS_INITIALIZED) {
			return RadioServiceManager.getInstance().getRadioServices(RadioServiceType.RADIOSERVICE_TYPE_DAB);
		} else {
			return new ArrayList<>();
		}
	}

	@Override
	public void startRadioServiceScan() {
		UsbHelper.getInstance().startEnsembleScan(mUsbDevice);
		//TODO scanning without deleting old services
		//mServices.clear();
		mScannedServices.clear();
	}

	@Override
	public void startRadioServiceScan(Object scanOptions) {
		if (scanOptions != null) {
			if (scanOptions instanceof SearchSettings) {
				if (((SearchSettings) scanOptions).clearExisting()) {
					LOGGER.debug("Clearing existing services before new scan");
					RadioServiceManager.getInstance().clearServiceList(RadioServiceType.RADIOSERVICE_TYPE_DAB);
				}
			}
		}

		startRadioServiceScan();
	}

	@Override
	public void stopRadioServiceScan() {
		UsbHelper.getInstance().stopEnsembleScan(mUsbDevice);
	}

	@Override
	public void startRadioService(@NotNull RadioService radioService) {
        LOGGER.debug("Starting Service: {}", radioService.getServiceLabel());

		if (radioService.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB) {
			UsbHelper.getInstance().startService(mUsbDevice, (RadioServiceDab) radioService);
		}
	}

	@Override
	public void stopRadioService() {
		UsbHelper.getInstance().stopService(mUsbDevice);
	}

	@Override
	public @Nullable RadioService getCurrentRunningRadioService() {
		return mCurrentlyRunningService;
	}

	@Override
	public void subscribe(TunerListener tunerListener) {
		if (!mTunerlisteners.contains(tunerListener)) {
			mTunerlisteners.add(tunerListener);
		}
	}

	@Override
	public void unsubscribe(TunerListener tunerListener) {
		mTunerlisteners.remove(tunerListener);
	}

	@Override
	public void callBack(int callbackType) {

		if (callbackType == 5) {
			if (mTunerStatus != TunerStatus.TUNER_STATUS_INITIALIZED) {
				mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
				for (TunerListener listener : mTunerlisteners) {
					listener.tunerStatusChanged(this, mTunerStatus);
				}
			}
		} else {
			TunerUsbCallbackTypes type = TunerUsbCallbackTypes.getTypeByValue(callbackType);
            LOGGER.debug("Native callback for device: {} with CallbackType: {}", mUsbDevice, type.toString());
			switch (type) {
				case TUNER_READY: {
					if (!mIsScanning) {
						mTunerInitDone = true;
						if (mRestoreServicesDone) {
							mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
							for (TunerListener listener : mTunerlisteners) {
								listener.tunerStatusChanged(this, mTunerStatus);
							}
						}
					} else {
						mIsScanning = false;
						mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;

						new SerializeServicesTask(this).execute();
					}
					break;
				}
				case TUNER_FAILED: {
					break;
				}
				case TUNER_FREQUENCY_LOCKED: {
					break;
				}
				case TUNER_FREQUENCY_NOT_LOCKED: {
					break;
				}
				case TUNER_SCAN_IN_PROGRESS: {
					mIsScanning = true;
					mTunerStatus = TunerStatus.TUNER_STATUS_SCANNING;
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerScanStarted(this);
					}
					break;
				}
				default: {
					break;
				}
			}
		}
	}

	@Override
	public void scanProgressCallback(int percentDone) {
        LOGGER.debug("Scan Progress: {}", percentDone);
		for (TunerListener listener : mTunerlisteners) {
			listener.tunerScanProgress(this, percentDone);
		}
	}

	@Override
	public void serviceFound(RadioServiceDab service) {
		if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Scan New Service found Ensemble Freq: {}", service.getEnsembleFrequency());
            LOGGER.debug("Scan New Service found EnsembleId: {}", Integer.toHexString(service.getEnsembleId()));
            LOGGER.debug("Scan New Service found Ensemblelabel: {} : {}", service.getEnsembleLabel(), service.getEnsembleShortLabel());
            LOGGER.debug("Scan New Service found EnsembleECC: {}", "0x" + Integer.toHexString(service.getEnsembleEcc()).toUpperCase());
            LOGGER.debug("Scan New Service found ServiceID: {}", "0x" + Integer.toHexString(service.getServiceId()));
            LOGGER.debug("Scan New Service found ServiceLabel: {} : {}", service.getServiceLabel(), service.getShortLabel());
            LOGGER.debug("Scan New Service found isProgramme: {}", service.isProgrammeService());
            LOGGER.debug("Scan New Service Num Components: {}", service.getServiceComponents().size());
			for (RadioServiceDabComponent comp : service.getServiceComponents()) {
                LOGGER.debug("Scan New Service Component SubChanID: {}", "0x" + Integer.toHexString(comp.getSubchannelId()));
                LOGGER.debug("Scan New Service Component Type: {}", comp.getServiceComponentType());
                LOGGER.debug("Scan New Service Component Bitrate: {}", comp.getBitrate());
                LOGGER.debug("Scan New Service Component TMID: {}", comp.getTmId());
                LOGGER.debug("Scan New Service Component PacketAddress: {}", comp.getPacketAddress());

				for (RadioServiceDabUserApplication uApp : comp.getUserApplications()) {
                    LOGGER.debug("Scan New Service Component UApp Type: {} : {}", uApp.getType().getType(), uApp.getType().getName());
                    LOGGER.debug("Scan New Service Component UApp DSCTy: {} : {}", uApp.getDataServiceComponentType().getType(), uApp.getDataServiceComponentType().getName());
                    LOGGER.debug("Scan New Service Component UApp isXPAD: {}, DGUsed: {}", uApp.isXpadApptype(), uApp.isDatagroupTransportUsed());
				}
			}
			for (TermId tid : service.getGenres()) {
                LOGGER.debug("Scan New Service Genre: {}", tid.getText());
			}
			LOGGER.debug("----------------- Scan New Service found -----------------");
		}

		for (TunerListener listener : mTunerlisteners) {
			listener.tunerScanServiceFound(this, service);
		}

		RadioServiceManager.getInstance().addService(service);
	}

	@Override
	public void serviceStarted(RadioServiceDab startedService) {
        LOGGER.debug("DabService started: {}", startedService.getServiceLabel());
		mCurrentlyRunningService = startedService;
		if (mCurrentlyRunningService != null) {
			for (TunerListener listener : mTunerlisteners) {
				listener.radioServiceStarted(this, mCurrentlyRunningService);
			}
		}
	}

	@Override
	public void serviceStopped(RadioServiceDab stoppedService) {
        LOGGER.debug("DabService stopped: {}", stoppedService.getServiceLabel());
		for (TunerListener listener : mTunerlisteners) {
			listener.radioServiceStopped(this, stoppedService);
			((RadioServiceImpl) stoppedService).serviceStopped();
		}
		mCurrentlyRunningService = null;
	}

	@Override
	public void receptionStatistics(boolean rfLocked, int qualLevel) {
		//if(DEBUG)LOGGER.debug("Reception Statistics RFLock: " + rfLocked + " Qual: " + qualLevel);

		if (qualLevel > 5) {
			qualLevel = 5;
		}
		for (TunerListener cb : mTunerlisteners) {
			cb.tunerReceptionStatistics(this, rfLocked, ReceptionQuality.values()[qualLevel]);
		}
	}

	private class SerializeServicesTask extends AsyncTask<Void, Void, Void> {

		private final Tuner mInstance;

		SerializeServicesTask(Tuner instance) {
			mInstance = instance;
		}

		@Override
		protected Void doInBackground(Void voids) {
			RadioServiceManager.getInstance().serializeServices(RadioServiceType.RADIOSERVICE_TYPE_DAB);

			return null;
		}

		@Override
		protected void onPostExecute(Void aVoid) {
			if (mInstance != null) {
				for (TunerListener listener : mTunerlisteners) {
					mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
					listener.tunerStatusChanged(mInstance, mTunerStatus);
					listener.tunerScanFinished(mInstance);
				}
			}
		}
	}

	private class RestoreServicesTask extends AsyncTask<Void, Void, Void> {

		@Override
		protected Void doInBackground(Void params) {
			LOGGER.debug("Restoring services....");
			while (!RadioServiceManager.getInstance().isServiceListReady(RadioServiceType.RADIOSERVICE_TYPE_DAB)) {
				try {
					Thread.sleep(100);
					LOGGER.debug("Waiting for servicelist to be ready");
				} catch (InterruptedException interExc) {
					LOGGER.error("Interrupted waiting for service list", interExc);
				}
			}

			mServices = RadioServiceManager.getInstance().getRadioServices(RadioServiceType.RADIOSERVICE_TYPE_DAB);
			return null;
		}

		@Override
		protected void onPostExecute(Void aVoid) {
			LOGGER.debug("Restore services finished");

			mRestoreServicesDone = true;
			mRestoreInProgress = false;
			if (mTunerInitDone) {
				callBack(5);
			}
		}
	}

	void servicesUpdated() {
		new SerializeServicesTask(this).execute();
	}

	public record SearchSettings(boolean clearExisting) {}
}
