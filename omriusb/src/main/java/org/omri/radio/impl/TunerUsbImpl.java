package org.omri.radio.impl;

import com.thiakil.standin.AsyncTask ;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jspecify.annotations.NonNull;

import org.omri.radio.Radio;
import org.omri.radio.RadioStatus;
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

public class TunerUsbImpl implements TunerUsb {

	private static final Logger LOGGER = LogManager.getLogger("TunerUsb");
	private final TunerType mTunertype = TunerType.TUNER_TYPE_DAB;

	private TunerStatus mTunerStatus = TunerStatus.TUNER_STATUS_NOT_INITIALIZED;
	private final List<RadioService> mServices = Collections.synchronizedList(new ArrayList<>());
	private final List<RadioService> mScannedServices = Collections.synchronizedList(new ArrayList<>());
	private boolean mIsScanning = false;
	private final List<TunerListener> mTunerlisteners = Collections.synchronizedList(new ArrayList<>());
	@Nullable private RadioServiceDab mCurrentlyRunningService = null;

	private final long mUsbDevice;

	TunerUsbImpl(long device) {
		mUsbDevice = device;
	}

	private boolean mRestoreServicesDone = false;
	private boolean mRestoreServicesInProgress = false;
	@Nullable private RestoreServicesTask mRestoreServicesTask = null;
	private boolean mTunerInitDone = false;
	private boolean mRestoreVisualsDone = false;
	private boolean mRestoreVisualsInProgress = false;

	@Override
	public void initializeTuner() {
		if(mTunerStatus == TunerStatus.TUNER_STATUS_NOT_INITIALIZED) {
			final UsbHelper usbHelper = UsbHelper.getInstance();
			if (usbHelper != null) {
				LOGGER.debug("Initializing Tuner");
				usbHelper.attachDevice(this);
				if (!mRestoreServicesInProgress) {
					mRestoreServicesInProgress = true;
					mRestoreServicesTask = new RestoreServicesTask();
					mRestoreServicesTask.execute();
				}
			} else {
				LOGGER.error("UsbHelper null");
			}
		}
	}

	@Override
	public long getUsbDevice() {
		return mUsbDevice;
	}

	@Override
	public void suspendTuner() {
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			usbHelper.stopService(getUsbDevice());
		}
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
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerStatusChanged(this, mTunerStatus);
					}
				}
				break;
			}
		}
	}

	@Override
	public void resumeTuner() {
		if (mTunerStatus == TunerStatus.TUNER_STATUS_SUSPENDED) {
			mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
			synchronized (mTunerlisteners) {
				for (TunerListener listener : mTunerlisteners) {
					listener.tunerStatusChanged(this, mTunerStatus);
				}
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
					if (getCurrentRunningRadioService() != null) {
                        LOGGER.debug("Waiting for service to exit");
						try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            LOGGER.error(e);
                        }
						if (getCurrentRunningRadioService() != null) {
							LOGGER.error("Service still seems to be running");
						}
                    }
					UsbHelper.getInstance().removeDevice(mUsbDevice);
				}

				mTunerStatus = TunerStatus.TUNER_STATUS_NOT_INITIALIZED;
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerStatusChanged(this, mTunerStatus);
					}
					mTunerlisteners.clear();
				}
				synchronized (mServices) {
					mServices.clear();
				}
				synchronized (mScannedServices) {
					mScannedServices.clear();
				}
				mCurrentlyRunningService = null;

				// stop restore service list
				if (mRestoreServicesInProgress && mRestoreServicesTask != null) {
					mRestoreServicesTask.cancel(true);
				}
				mRestoreServicesTask = null;
				mRestoreServicesInProgress = false;
				mRestoreServicesDone = false;

				mRestoreVisualsInProgress = false;
				mRestoreVisualsDone = false;

				// tuner deinit complete
				mTunerInitDone = false;
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
		if (getCurrentRunningRadioService() != null) {
			stopRadioService();
            try {
                Thread.sleep(300); // allow time to process the request
            } catch (InterruptedException e) {
                LOGGER.error(e);
            }
        }
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			usbHelper.startEnsembleScan(mUsbDevice);
			synchronized (mScannedServices) {
				mScannedServices.clear();
			}
		} else {
			LOGGER.error("startRadioServiceScan: UsbHelper null");
		}
	}

	@Override
	public void startRadioServiceScan(Object scanOptions) {
		if (getCurrentRunningRadioService() != null) {
			stopRadioService();
            try {
                Thread.sleep(300); // allow time to process the request
            } catch (InterruptedException e) {
                LOGGER.error(e);
            }
        }
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
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			usbHelper.stopEnsembleScan(mUsbDevice);
		} else {
			LOGGER.error("stopRadioServiceScan UsbHelper null");
		}
	}

	@Override
	public void startRadioService(RadioService radioService) {
		LOGGER.debug("Starting Service: " + radioService.getServiceLabel());
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if(radioService.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB
				&& usbHelper != null) {
			usbHelper.startService(mUsbDevice, (RadioServiceDab) radioService);
		}
	}

	@Override
	public void stopRadioService() {
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			UsbHelper.getInstance().stopService(mUsbDevice);
		} else {
			LOGGER.error("stopRadioService UsbHelper null");
		}
	}

	@Override
	public @Nullable RadioService getCurrentRunningRadioService() {
		return mCurrentlyRunningService;
	}

	@Override
	public @NonNull ArrayList<RadioService> getLinkedRadioServices(@NonNull RadioService service) {
		ArrayList<RadioService> retLinkedRadioServices = new ArrayList<>();
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (service instanceof RadioServiceDab && usbHelper != null) {

			// retrieve DAB services that are linked to the given service
			final ArrayList<RadioServiceDab> linkedDabServices =
					usbHelper.getLinkedDabServices(mUsbDevice,
							(RadioServiceDab) service);

			if (linkedDabServices != null) {
				ArrayList<RadioService> linkedServices = new ArrayList<>(linkedDabServices.size());
				linkedServices.addAll(linkedDabServices);
				retLinkedRadioServices = ((RadioServiceImpl)service).replaceLinkedRadioServicesWithKnown(linkedServices);
			}
		}
		return retLinkedRadioServices;
	}

	@Override
	public @NonNull String getHardwareVersion() {
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			String hwVersion = usbHelper.getHwVersion(mUsbDevice);
			if (hwVersion != null) {
				return hwVersion;
			}
		}
		return "";
	}

	@Override
	public @NonNull String getSoftwareVersion() {
		final UsbHelper usbHelper = UsbHelper.getInstance();
		if (usbHelper != null) {
			String swVersion = UsbHelper.getInstance().getSwVersion(mUsbDevice);
			if (swVersion != null) {
				return swVersion;
			}
		}
		return "";
	}

	@Override
	public void subscribe(TunerListener tunerListener) {
		synchronized (mTunerlisteners) {
			if (!mTunerlisteners.contains(tunerListener)) {
				mTunerlisteners.add(tunerListener);
			}
		}
	}

	@Override
	public void unsubscribe(TunerListener tunerListener) {
		synchronized (mTunerlisteners) {
			mTunerlisteners.remove(tunerListener);
		}
	}

	@Override
	public void callBack(int callbackType) {
		TunerUsbCallbackTypes type = TunerUsbCallbackTypes.getTypeByValue(callbackType);
		LOGGER.debug("Native callback for device: " + mUsbDevice + " with CallbackType: " + type.toString());
		switch(type) {
			case TUNER_READY: {
				if (!mIsScanning) {
					mTunerInitDone = true;
					if (mRestoreServicesDone) {
						mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
						synchronized (mTunerlisteners) {
							for (TunerListener listener : mTunerlisteners) {
								listener.tunerStatusChanged(this, mTunerStatus);
							}
						}
					}
				} else {
					mIsScanning = false;
					mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
				}
				break;
			}
			case TUNER_FAILED:
				mTunerStatus = TunerStatus.TUNER_STATUS_ERROR;
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerStatusChanged(this, mTunerStatus);
					}
				}
				break;

			case TUNER_SCAN_IN_PROGRESS: {
				mIsScanning = true;
				mTunerStatus = TunerStatus.TUNER_STATUS_SCANNING;
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerScanStarted(this);
					}
				}
				break;
			}
			case SERVICELIST_READY: {
				boolean reportInitialized = false;
				if (mTunerStatus != TunerStatus.TUNER_STATUS_INITIALIZED) {
					mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
					reportInitialized = true;
				}
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						if (reportInitialized) {
							listener.tunerStatusChanged(this, TunerStatus.TUNER_STATUS_INITIALIZED);
						}
						listener.tunerStatusChanged(this, TunerStatus.SERVICES_LIST_READY);
					}
				}
				break;
			}
			case VISUALLIST_READY: {
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerStatusChanged(this, TunerStatus.VISUALS_LIST_READY);
					}
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	@Override
	public void scanProgressCallback(int percentDone, int freqHz) {
		LOGGER.debug("Scan Progress: " + percentDone + "%, " + freqHz / 1000 + " kHz");
		synchronized (mTunerlisteners) {
			for (TunerListener listener : mTunerlisteners) {
				listener.tunerScanProgress(this, percentDone, freqHz);
			}
		}
	}

	@Override
	public void serviceFound(RadioServiceDab service) {
		if (service != null) {
			final List<RadioService> currentServices = getRadioServices();
			try {
				if (currentServices != null) {
					for (RadioService currentService : currentServices) {
						if (service.equals(currentService)) {
							LOGGER.debug("serviceFound already known: " + service);
							return;
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		LOGGER.debug("serviceFound: " + service);

		// add with scheduled serialization
		RadioServiceManager.getInstance().addRadioService(service);

		synchronized (mTunerlisteners) {
			for (TunerListener listener : mTunerlisteners) {
				listener.tunerScanServiceFound(this, service);
			}
		}
	}

	@Override
	public void serviceStarted(RadioServiceDab startedService) {
        LOGGER.debug("DabService started: {}", startedService.getServiceLabel());
		mCurrentlyRunningService = startedService;
		if(startedService != null) {
			// // tell service that it was started
			((RadioServiceImpl) startedService).serviceStarted();
			synchronized (mTunerlisteners) {
				for (TunerListener listener : mTunerlisteners) {
					listener.radioServiceStarted(this, startedService);
				}
			}
		}
	}

	@Override
	public void serviceStopped(RadioServiceDab stoppedService) {
        LOGGER.debug("DabService stopped: {}", stoppedService.getServiceLabel());
		mCurrentlyRunningService = null;
		// tell service that it was stoppped
		((RadioServiceImpl) stoppedService).serviceStopped();
		// inform tuner listeners
		synchronized (mTunerlisteners) {
			for (TunerListener listener : mTunerlisteners) {
				listener.radioServiceStopped(this, stoppedService);
			}
		}
	}

	@Override
	public void receptionStatistics(boolean rfLocked, int qualLevel, int rawValue) {
		if(qualLevel > 5) {
			qualLevel = 5;
		}
		synchronized (mTunerlisteners) {
			for (TunerListener cb : mTunerlisteners) {
				cb.tunerReceptionStatistics(this, rfLocked,
						ReceptionQuality.values()[qualLevel], rawValue);
			}
		}
	}

	@SuppressWarnings("unused") // called from JNI
	public void dabTimeUpdate(Date dabDateTime) {
		synchronized (mTunerlisteners) {
			for (TunerListener cb : mTunerlisteners) {
				cb.dabDateTime(this, dabDateTime);
			}
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


			if(mInstance != null) {
				mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
				synchronized (mTunerlisteners) {
					for (TunerListener listener : mTunerlisteners) {
						listener.tunerStatusChanged(mInstance, mTunerStatus);
						listener.tunerScanFinished(mInstance);
					}
				}
			}

			return null;
		}
	}

	private class RestoreServicesTask extends AsyncTask<Void, Void, Void> {

		@Override
		protected Void doInBackground(Void params) {
			LOGGER.debug("Restoring services....");
			while (!RadioServiceManager.getInstance().isServiceListReady(RadioServiceType.RADIOSERVICE_TYPE_DAB) && !isCancelled()) {
				try {
                    //noinspection BusyWait
                    Thread.sleep(100);
					LOGGER.debug("Waiting for servicelist to be ready");
				} catch (InterruptedException interExc) {
					LOGGER.error("Interrupted waiting for service list", interExc);
				}
			}

			synchronized (mServices) {
				mServices.clear();
				mServices.addAll(RadioServiceManager.getInstance().getRadioServices(RadioServiceType.RADIOSERVICE_TYPE_DAB));
			}

			mRestoreServicesDone = true;
			mRestoreServicesInProgress = false;

			LOGGER.debug("Restore services finished");
			callBack(TunerUsbCallbackTypes.TUNER_READY.getIntValue());

			return null;
		}
	}

	/*@SuppressLint("StaticFieldLeak")
	private class RestoreVisualsTask extends AsyncTask<Void, Void, Void> {

		@Override
		protected Void doInBackground(Void... params) {
			if(DEBUG)Log.d(TAG, "Restoring visuals....");
			boolean continueWaiting;
			do {
				SystemClock.sleep(100);
				if (DEBUG) Log.d(TAG, "Waiting for VisualLogoManager or tuner to be ready");

				continueWaiting =
						Radio.getInstance().getRadioStatus() == RadioStatus.STATUS_RADIO_RUNNING
						&& mTunerInitDone
						&& !isCancelled()
						&& !VisualLogoManager.getInstance().isReady();
			} while (continueWaiting);

			if(DEBUG)Log.d(TAG, "Restore visuals finished");

			mRestoreVisualsDone = true;
			mRestoreVisualsInProgress = false;
			if(mTunerInitDone) {
				callBack(TunerUsbCallbackTypes.VISUALLIST_READY.getIntValue());
			}
			return null;
		}
	}*/

	void servicesUpdated() {
		new SerializeServicesTask(this).execute();
	}

	public record SearchSettings(boolean clearExisting) {}
}
