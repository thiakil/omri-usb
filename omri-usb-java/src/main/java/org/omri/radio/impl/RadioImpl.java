package org.omri.radio.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

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
import com.thiakil.standin.UsbDevice;
import com.thiakil.standin.Log;
import org.usb4java.Device;

import static com.thiakil.standin.BuildConfig.DEBUG;

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
	
	private List<Tuner> mTunerList = new ArrayList<Tuner>();
	private List<RadioService> mRadioserviceList = new ArrayList<RadioService>();
	private List<RadioStatusListener> mRadioStatusListeners = new ArrayList<>();

	Context mContext = null;

	File getStorageDir() {
		if(mContext != null) {
			return mContext.getExternalCacheDir();
		}

		return null;
	}

	public RadioImpl() {
	}
	
	@Override
	public RadioErrorCode initialize(Context appContext) {
		if(DEBUG)Log.d(TAG, "Initializing with Context!");

		mContext = appContext;

		if(mContext != null) {

			UsbHelper.create(this);

			//List of Pairs consisiting of first.VendorId and second.ProductId
			ArrayList<UsbHelper.UsbId> wantedDevices = new ArrayList<>();

			//Raon DAB USB sticks
			wantedDevices.add(new UsbHelper.UsbId(0x16C0, 0x05DC));

			for(Device dev : UsbHelper.getInstance().scanForSpecificDevices(wantedDevices)) {
				if(DEBUG)Log.d(TAG, "Found Siano device!");
				Tuner usbTuner = new TunerUsbImpl(dev);
				usbTuner.subscribe(this);
				mTunerList.add(usbTuner);
			}

			if(DEBUG)Log.d(TAG, "Initialized with " + mTunerList + " tuners");
		} else {
			if(DEBUG)Log.d(TAG, "Context is null!");
		}
		
		mRadioStatus = RadioStatus.STATUS_RADIO_RUNNING;
		
		return RadioErrorCode.ERROR_INIT_OK;
	}

	@Override
	public RadioErrorCode suspend() {
		for(Tuner tuner : mTunerList) {
			tuner.suspendTuner();
		}
		
		return RadioErrorCode.ERROR_SUSPEND_OK;
	}

	@Override
	public RadioErrorCode resume() {
		for(Tuner tuner : mTunerList) {
			tuner.resumeTuner();
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
		for(Tuner tuner : mTunerList) {
			tuner.stopRadioService();
			tuner.unsubscribe(this);
			tuner.deInitializeTuner();
		}

		mRadioStatus = RadioStatus.STATUS_RADIO_SUSPENDED;

		mTunerList.clear();
	}

	@Override
	public List<Tuner> getAvailableTuners() {
		return mTunerList;
	}

	@Override
	public List<Tuner> getAvailableTuners(TunerType tunerType) {
		ArrayList<Tuner> retList = new ArrayList<Tuner>();
		for(Tuner tuner : mTunerList) {
			if(tuner.getTunerType() == tunerType) {
				retList.add(tuner);
			}
		}
		
		return retList;
	}

	@Override
	public List<RadioService> getRadioServices() {
		if(DEBUG)Log.d(TAG, "Returning Services...");

		synchronized (this) {
			List<RadioService> aggServiceList = Collections.synchronizedList(new ArrayList<RadioService>());

			for (Tuner atuner : mTunerList) {
				for (RadioService srv : atuner.getRadioServices()) {
					if (!aggServiceList.contains(srv)) {
						aggServiceList.add(srv);
					} else {
						if (DEBUG) Log.d(TAG, "ServiceList already contains: '" + srv.getServiceLabel() + "' Type: " + srv.getRadioServiceType().toString() + (srv.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB ? (" EId: " + ((RadioServiceDab) srv).getEnsembleId()) : ""));
					}
				}
			}

			Collections.sort(aggServiceList, new Comparator<RadioService>() {
				@Override
				public int compare(RadioService radioService2, RadioService radioService1) {
					return radioService2.getServiceLabel().toLowerCase().compareTo(radioService1.getServiceLabel().toLowerCase());
				}
			});

			mRadioserviceList = aggServiceList;

			return mRadioserviceList;
		}
	}

	@Override
	public void startRadioService(RadioService radioService) {
		TunerType wantedType = null;

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
			for(Tuner tuner : mTunerList) {
				if(tuner.getTunerType() == wantedType) {
					tuner.startRadioService(radioService);
					break;
				}
			}
		}
	}

	@Override
	public void stopRadioService(RadioService radioService) {
		if(radioService != null) {
			if(DEBUG)Log.d(TAG, "Stopping Service: " + radioService + " : " + radioService.getRadioServiceType().toString());
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

	@Override
	public void startRadioServiceScan() {
		for(Tuner tuner : mTunerList) {
			tuner.startRadioServiceScan();
		}
	}

	@Override
	public void stopRadioServiceScan() {
		for(Tuner tuner : mTunerList) {
			tuner.stopRadioServiceScan();
		}
	}

	@Override
	public void initializeTuner(Tuner tuner) {
		if(mTunerList.contains(tuner)) {
			tuner.initializeTuner();
		}
	}

	@Override
	public void deInitializeTuner(Tuner tuner) {
		if(mTunerList.contains(tuner)) {
			tuner.deInitializeTuner();
		}
	}

	/* TunerListener impl */
	@Override
	public void tunerStatusChanged(Tuner tuner, TunerStatus newState) {
		//We listen here on all tuners for state changes		
		switch (newState) {
			case TUNER_STATUS_INITIALIZED: {
				if(DEBUG)Log.d(TAG, "Collecting after tuner init");
				//collectRadioServices();
				break;
			}
		default:
			break;
		}
	}

	private boolean mCollectingRadioServices = false;
	private synchronized void collectRadioServices() {
		if(DEBUG)Log.d(TAG, "Collecting all radioservices...");

		if(!mCollectingRadioServices) {
			mCollectingRadioServices = true;

			mRadioserviceList.clear();
			for (Tuner atuner : mTunerList) {
				for (RadioService srv : atuner.getRadioServices()) {
					if (!mRadioserviceList.contains(srv)) {
						mRadioserviceList.add(srv);
					}
				}
			}

			Collections.sort(mRadioserviceList, new Comparator<RadioService>() {
				@Override
				public int compare(RadioService radioService2, RadioService radioService1) {
					return radioService2.getServiceLabel().compareTo(radioService1.getServiceLabel());
				}
			});

			mCollectingRadioServices = false;
		}
	}

	@Override
	public void tunerScanServiceFound(Tuner tuner, RadioService foundService) {
		//Do something useful with this later
	}

	@Override
	public void tunerScanStarted(Tuner tuner) {

	}

	@Override
	public void tunerScanProgress(Tuner tuner, int percentScanned) {

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
	public void tunerReceptionStatistics(Tuner tuner, boolean rfLock, ReceptionQuality quality) {
		//Do something useful with this later
	}

	@Override
	public void tunerRawData(Tuner tuner, byte[] data) {
		//Do something useful with this later
	}

	@Override
	public void registerRadioStatusListener(RadioStatusListener listener) {
		if(!mRadioStatusListeners.contains(listener)) {
			mRadioStatusListeners.add(listener);
		}
	}

	@Override
	public void unregisterRadioStatusListener(RadioStatusListener listener) {
		if(mRadioStatusListeners.contains(listener)) {
			mRadioStatusListeners.remove(listener);
		}
	}

	//UsbHelperCallback
	@Override
	public void UsbTunerDeviceAttached(Device attachedDevice) {
		Tuner sianoTuner = new TunerUsbImpl(attachedDevice);
		sianoTuner.subscribe(this);
		mTunerList.add(sianoTuner);

		for(RadioStatusListener cb : mRadioStatusListeners) {
			cb.tunerAttached(sianoTuner);
		}
	}

	@Override
	public void UsbTunerDeviceDetached(Device detachedDevice) {
		for(Tuner tuner : mTunerList) {
			if(tuner instanceof TunerUsb) {
				if(detachedDevice.equals(((TunerUsb)tuner).getUsbDevice())) {

					for(RadioStatusListener cb : mRadioStatusListeners) {
						cb.tunerDetached(tuner);
					}

					mTunerList.remove(tuner);

					break;
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

	/* Experimental and dangerous */
	public boolean deleteRadioService(RadioService delService) {
		for(Tuner chkTun : mTunerList) {
			if(chkTun.getCurrentRunningRadioService() == delService) {
				if(DEBUG)Log.d(TAG, "Service to delete is currently running on " + chkTun + ", stopping it");
				chkTun.stopRadioService();
			}
		}

		boolean delSuccess = false;
		if(delService != null) {
			delSuccess = RadioServiceManager.getInstance().deleteService(delService);
		}

		return delSuccess;
	}

	public final List<RadioService> getFollowingServices(RadioService followSrv) {
		ArrayList<RadioService> followingServices = new ArrayList<>();

		for(RadioService srv : getRadioServices()) {
			if(srv.equalsRadioService(followSrv) && !srv.equals(followSrv)) {
				followingServices.add(srv);
			}
		}

		return followingServices;
	}

	private void dabTime(DabTime dabTime) {
		if(DEBUG)Log.d(TAG, "DabTime: " + dabTime.getPosixMillis());
	}

	public final static String SERVICE_SEARCH_OPT_DELETE_SERVICES = "delete_services";
	/* */
}
