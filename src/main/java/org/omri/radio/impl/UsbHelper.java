package org.omri.radio.impl;

import com.thiakil.standin.Context;
import com.thiakil.standin.UsbDevice;
import com.thiakil.standin.UsbDeviceConnection;
import com.thiakil.standin.Log;

import java.util.Collections;
import java.util.Map;
import org.omri.radioservice.RadioServiceDab;

import java.util.ArrayList;
import java.util.List;

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

public class UsbHelper {

	private static final String TAG = "UsbHelper";

	private static UsbHelper mInstance = null;
	private static UsbHelperCallback mUsbCb = null;

	private Map<String, UsbDevice> mUsbDeviceList;

	static {
		System.loadLibrary("c++_shared");
		System.loadLibrary("fec");
		System.loadLibrary("irtdab");
	}

	private native void created();
	private native void deviceDetached(String deviceName);
	private native void deviceAttached(TunerUsb usbDevice);
	private native void devicePermission(String deviceName, boolean granted);
	private native void startSrv(String deviceName, RadioServiceDab service);
	private native void stopSrv(String deviceName);
	private native void tuneFreq(String deviceName, long freq);
	private native void startServiceScan(String deviceName);
	private native void stopServiceScan(String deviceName);


	private UsbHelper() {
		if(DEBUG)Log.d(TAG, "Constructing UsbHelper...");
		created();
	}

	/*public void scanUsbDevices() {
		if(mUsbManager != null) {
			mUsbDeviceList = mUsbManager.getDeviceList();
			Iterator<UsbDevice> udevIter = mUsbDeviceList.values().iterator();
			while(udevIter.hasNext()) {
				UsbDevice device = udevIter.next();
				String devName = device.getDeviceName();
				int devPid = device.getProductId();
				int devVid = device.getVendorId();
				int devIfCount = device.getInterfaceCount();

				if(DEBUG)Log.d(TAG, "DeviceName: " + devName);
				if(DEBUG)Log.d(TAG, "DevicePid: " + devPid);
				if(DEBUG)Log.d(TAG, "DeviceVid: " + devVid);
				if(DEBUG)Log.d(TAG, "DeviceIfCount: " + devIfCount);
			}
		}
	}*/


	List<UsbDevice> scanForSpecificDevices(List<UsbId> usbVendorDeviceIdParams) {
		ArrayList<UsbDevice> foundSpecificDevices = new ArrayList<>();

		//TODO: move to native libusb
		mUsbDeviceList = Collections.emptyMap();//mUsbManager.getDeviceList();

		for(UsbDevice dev : mUsbDeviceList.values()) {
			int devVenId = dev.getVendorId();
			int devPId = dev.getProductId();
			if(DEBUG)Log.d(TAG, " Found USB Device: VId: " + devVenId + " and PId: " + devPId);
			for(UsbId devVenPId : usbVendorDeviceIdParams) {
				if(DEBUG)Log.d(TAG, "Searching for USB VId: " + devVenPId.vendor + " and PId: " + devVenPId.product);
				if(devVenId == devVenPId.vendor && devPId == devVenPId.product) {
					if(DEBUG)Log.d(TAG, "Found specific device");
					foundSpecificDevices.add(dev);
				}
			}
		}

		return foundSpecificDevices;
	}

	public static UsbHelper getInstance() {
		return mInstance;
	}

	public void startService(String deviceName, RadioServiceDab srv) {
		if(DEBUG)Log.d(TAG, "StartService on device: " + deviceName + " : " + srv.getServiceLabel());
		startSrv(deviceName, srv);
	}

	/* EdiStream */


	public void stopService(String deviceName) {
		stopSrv(deviceName);
	}

	public void tuneFrequencyKHz(String deviceName, long frequency) {
		tuneFreq(deviceName, frequency);
	}

	void startEnsembleScan(String deviceName) {
		startServiceScan(deviceName);
	}

	void stopEnsembleScan(String deviceName) {
		stopServiceScan(deviceName);
	}

	void attachDevice(TunerUsb dev) {
		deviceAttached(dev);
	}

	//todo remove from native
	private void requestPermission(UsbDevice device) {

	}

	//todo remove from native
	private UsbDeviceConnection openDevice(UsbDevice device) {
		/*if(DEBUG)Log.d(TAG, "Opening device: " + device.getDeviceName());
		try {
			return mUsbManager.openDevice(device);
		} catch(SecurityException secExc) {
			secExc.printStackTrace();
			return null;
		}*/
		return null;
	}

	static void create(UsbHelperCallback cb) {
		if(mInstance == null) {
			mInstance = new UsbHelper();
			mUsbCb = cb;
		}
	}

	void removeDevice(UsbDevice remDev) {
		if(remDev != null) {
			deviceDetached(remDev.getDeviceName());
		}
	}

	//TODO move to libusb?
	/*private final BroadcastReceiver mUsbBroadcastReceiver = new BroadcastReceiver() {
		public void onReceive(Context context, Intent intent) {
			UsbDevice device = (UsbDevice)intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
			String action = intent.getAction();
			synchronized (this) {
				if (action.equals(UsbManager.ACTION_USB_DEVICE_DETACHED)) {
					if(DEBUG)Log.d(TAG, "USB Device detached: " + device.getDeviceName());
					deviceDetached(device.getDeviceName());
					mUsbCb.UsbTunerDeviceDetached(device);
				}
				if (action.equals(UsbManager.ACTION_USB_DEVICE_ATTACHED)) {
					if(DEBUG)Log.d(TAG, "USB Device attached: " + device.getDeviceName());

					mUsbCb.UsbTunerDeviceAttached(device);
				}
			}
		}
	};*/

	interface UsbHelperCallback {

		void UsbTunerDeviceAttached(UsbDevice attachedDevice);

		void UsbTunerDeviceDetached(UsbDevice detachedDevice);
	}

	public record UsbId(int vendor, int product){}
}
