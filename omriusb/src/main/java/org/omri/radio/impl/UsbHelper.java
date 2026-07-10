package org.omri.radio.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.omri.radioservice.RadioServiceDab;

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

	static {
		System.loadLibrary("libwinpthread-1");
		System.loadLibrary("libgcc_s_seh-1");
		System.loadLibrary("libstdc++-6");
		System.loadLibrary("libusb-1.0");
		System.loadLibrary("irtdab");
	}

	private native void created();

	public native long[] scanDevices();

	private native void deviceAttached(TunerUsb usbDevice, long libUsbDevice);

	private native void detachDevice(long libUsbDevice);

	private native void startSrv(long libUsbDevice, RadioServiceDab service);

	private native void stopSrv(long libUsbDevice);

	private native void tuneFreq(long libUsbDevice, long freq);

	private native void startServiceScan(long libUsbDevice);

	private native void stopServiceScan(long libUsbDevice);


	private UsbHelper() {
		LOGGER.debug("Constructing UsbHelper...");
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

	public static UsbHelper getInstance() {
		return mInstance;
	}

	public void startService(long device, RadioServiceDab srv) {
        LOGGER.debug("StartService on device: {} : {}", device, srv.getServiceLabel());
		startSrv(device, srv);
	}

	/* EdiStream */


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

	void attachDevice(TunerUsb dev) {
		deviceAttached(dev, dev.getUsbDevice());
	}

	static void create(UsbHelperCallback cb) {
		if (mInstance == null) {
			mInstance = new UsbHelper();
			mUsbCb = cb;
		}
	}

	void removeDevice(long remDev) {
		if (remDev != 0) {
			detachDevice(remDev);
		}
	}

	//TODO move to libusb?
	/*private final BroadcastReceiver mUsbBroadcastReceiver = new BroadcastReceiver() {
		public void onReceive(Context context, Intent intent) {
			UsbDevice device = (UsbDevice)intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);
			String action = intent.getAction();
			synchronized (this) {
				if (action.equals(UsbManager.ACTION_USB_DEVICE_DETACHED)) {
					if(DEBUG)LOGGER.debug("USB Device detached: " + device.getDeviceName());
					deviceDetached(device.getDeviceName());
					mUsbCb.UsbTunerDeviceDetached(device);
				}
				if (action.equals(UsbManager.ACTION_USB_DEVICE_ATTACHED)) {
					if(DEBUG)LOGGER.debug("USB Device attached: " + device.getDeviceName());

					mUsbCb.UsbTunerDeviceAttached(device);
				}
			}
		}
	};*/

	interface UsbHelperCallback {

		void UsbTunerDeviceAttached(long attachedDevice);

		void UsbTunerDeviceDetached(long detachedDevice);
	}

	public record UsbId(int vendor, int product) {}
}
