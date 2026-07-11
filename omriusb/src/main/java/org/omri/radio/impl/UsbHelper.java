package org.omri.radio.impl;

import java.util.Objects;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Executors;

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

public class UsbHelper {

	private static final Logger LOGGER = LogManager.getLogger("UsbHelper");

	private static UsbHelper mInstance = null;
	private static UsbHelperCallback mUsbCb = null;
	private static boolean mRedirectCoutToALog = false;
	private static String mRawRecordingPath = "";

	static {
		System.loadLibrary("libwinpthread-1");
		System.loadLibrary("libgcc_s_seh-1");
		System.loadLibrary("libstdc++-6");
		System.loadLibrary("libusb-1.0");
		System.loadLibrary("irtdab");
	}

	private native void created(boolean redirectCoutToALog, String rawRecordingPath);
	public native long[] scanDevices();
	private native void deviceAttached(TunerUsb usbDevice, long libUsbDevice);
	private native void detachDevice(long libUsbDevice);
	private native void startSrv(long libUsbDevice, RadioServiceDab service);
	private native void stopSrv(long libUsbDevice);
	private native void tuneFreq(long libUsbDevice, long freq);
	private native void startServiceScan(long libUsbDevice);
	private native void stopServiceScan(long libUsbDevice);
	private native ArrayList<RadioServiceDab> getLinkedServices(long libUsbDevice, RadioServiceDab dabService);
	private native String getHardwareVersion(long libUsbDevice);
	private native String getSoftwareVersion(long libUsbDevice);

    /* DemoTuner */
	private native void demoTunerAttached(DemoTuner demoTuner);
	private native void demoTunerDetached(DemoTuner demoTuner);
	private native void demoServiceStart(RadioService radioService);
	private native void demoServiceStop();

	
	private UsbHelper() {
		LOGGER.debug("Constructing UsbHelper...");
		created(mRedirectCoutToALog, mRawRecordingPath);
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

				if(DEBUG)LOGGER.debug("DeviceName: " + devName);
				if(DEBUG)LOGGER.debug("DevicePid: " + devPid);
				if(DEBUG)LOGGER.debug("DeviceVid: " + devVid);
				if(DEBUG)LOGGER.debug("DeviceIfCount: " + devIfCount);
			}
		}
	}*/


	/*List<Device> scanForSpecificDevices(List<UsbId> usbVendorDeviceIdParams) {
		ArrayList<Device> foundSpecificDevices = new ArrayList<>();

		// Read the USB device list
		DeviceList list = new DeviceList();
		int result = LibUsb.getDeviceList(null, list);
		if (result < 0)
		{
			throw new LibUsbException("Unable to get device list", result);
		}

		try
		{
			// Iterate over all devices and list them
			for (Device device: list)
			{
				DeviceDescriptor descriptor = new DeviceDescriptor();
				result = LibUsb.getDeviceDescriptor(device, descriptor);
				if (result < 0)
				{
					throw new LibUsbException(
						"Unable to read device descriptor", result);
				}
				int devVenId = descriptor.idVendor();
				int devPId = descriptor.idProduct();
				if(DEBUG)LOGGER.debug(" Found USB Device: VId: " + devVenId + " and PId: " + devPId);
				for(UsbId devVenPId : usbVendorDeviceIdParams) {
					if(DEBUG)LOGGER.debug("Searching for USB VId: " + devVenPId.vendor + " and PId: " + devVenPId.product);
					if(devVenId == devVenPId.vendor && devPId == devVenPId.product) {
						if(DEBUG)LOGGER.debug("Found specific device");
						foundSpecificDevices.add(device);
						LibUsb.refDevice(device);
					}
				}
			}
		}
		finally
		{
			// Ensure the allocated device list is freed
			//LibUsb.freeDeviceList(list, true);
		}

		return foundSpecificDevices;
	}*/

	public static @Nullable UsbHelper getInstance() {
		return mInstance;
	}

	public void startService(long device, RadioServiceDab srv) {
        LOGGER.debug("StartService on device: {} : {}", device, srv.getServiceLabel());
		startSrv(device, srv);
	}

	void attachDevice(TunerUsb dev) {
		deviceAttached(dev, dev.getUsbDevice());
	}

	public @Nullable ArrayList<RadioServiceDab> getLinkedDabServices(long libUsbDevice, @NotNull RadioServiceDab serviceDab) {
		return getLinkedServices(libUsbDevice, serviceDab);
	}

	public @Nullable String getHwVersion(long libUsbDevice) {
		return getHardwareVersion(libUsbDevice);
	}

	public @Nullable String getSwVersion(long libUsbDevice) {
		return getSoftwareVersion(libUsbDevice);
	}

	public void stopService(long libUsbDevice) {
		stopSrv(libUsbDevice);
	}

	public void tuneFrequencyKHz(long libUsbDevice, long frequency) {
		tuneFreq(libUsbDevice, frequency);
	}

	void startEnsembleScan(long libUsbDevice) {
		startServiceScan(libUsbDevice);
	}

	void stopEnsembleScan(long libUsbDevice) {
		stopServiceScan(libUsbDevice);
	}

	/* Demo tuner */
    void attachDemoTuner(DemoTuner demoTuner) {
        demoTunerAttached(demoTuner);
    }
    void detachDemoTuner(DemoTuner demoTuner) {
        demoTunerDetached(demoTuner);
    }
	void startDemoService(RadioService radioService) {
		demoServiceStart(radioService);
	}
	void stopDemoService() {
		demoServiceStop();
	}

	static void create(UsbHelperCallback cb, boolean redirectCoutToALog,
					   String rawRecordingPath) {
		if(mInstance == null) {
			mUsbCb = cb;
			mRedirectCoutToALog = redirectCoutToALog;
			mRawRecordingPath = rawRecordingPath;
			mInstance = new UsbHelper();
		}
	}

	void destroyInstance() {
		LOGGER.debug("destroyInstance");

		mRedirectCoutToALog = false;
		mUsbCb = null;
		mInstance = null;
	}

	void removeDevice(long remDev) {
		if (remDev != 0) {
			detachDevice(remDev);
		}
	}

	//TODO move to libusb?
	/*private final BroadcastReceiver mUsbBroadcastReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			// Note: This comes in on the application's main thread
			final UsbDevice device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
			final String action = intent.getAction();
			if (device == null || action == null) {
				Log.e(TAG, "onReceive: action:" + action + ",device:" + device);
				return;
			}
			synchronized (this) {
				// change to a worker thread
				Executors.newCachedThreadPool().execute(
						new UsbBroadcastReceiverRunnable(action, intent, device)
				);
			}
		}
	};
	private class UsbBroadcastReceiverRunnable implements Runnable {
		private final String action;
		private final Intent intent;
		private final UsbDevice device;

		UsbBroadcastReceiverRunnable(String a, Intent i, UsbDevice d) {
			action = a; intent = i; device = d;
		}

		@Override
		public void run() {
			switch (action) {
				case ACTION_USB_PERMISSION:
					if (DEBUG) Log.d(TAG, "Received Permission request: " + action);

					mPermissionPending = false;

					if (intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)) {
						if (DEBUG)
							Log.d(TAG, "permission granted for device " + device.getDeviceName());
						devicePermission(device.getDeviceName(), true);
					} else {
						if (DEBUG)
							Log.d(TAG, "permission denied for device " + device.getDeviceName());
						devicePermission(device.getDeviceName(), false);
					}

					if (device.equals(mPendingPermissionDevice)) {
						mPendingPermissionDevice = null;
					}

					if (mPendingPermissionDevice != null) {
						requestPermission(mPendingPermissionDevice);
					}
					break;
				case UsbManager.ACTION_USB_DEVICE_DETACHED:
					if (DEBUG) Log.d(TAG, "USB Device detached: " + device.getDeviceName());
					deviceDetached(device.getDeviceName());
					if (mUsbCb != null) {
						mUsbCb.UsbTunerDeviceDetached(device);
					}
					break;
				case UsbManager.ACTION_USB_DEVICE_ATTACHED:
					if (DEBUG) Log.d(TAG, "USB Device attached: " + device.getDeviceName());
					if (mUsbCb != null) {
						mUsbCb.UsbTunerDeviceAttached(device);
					}
					break;
			}
		}
	}
	*/

	interface UsbHelperCallback {

		void UsbTunerDeviceAttached(long attachedDevice);

		void UsbTunerDeviceDetached(long detachedDevice);
	}

	public record UsbId(int vendor, int product) {}
}
