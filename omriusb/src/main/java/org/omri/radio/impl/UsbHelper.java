package org.omri.radio.impl;

import static org.omri.BuildConfig.DEBUG;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbManager;
import android.os.Build;
import android.util.Log;
import android.util.Pair;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceDabEdi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Executors;

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
	private static final String ACTION_USB_PERMISSION = "de.irt.usbhelper.USB_PERMISSION";
	private final Context mContext;
	private static UsbHelper mInstance = null;
	private static UsbHelperCallback mUsbCb = null;
	private static boolean mRedirectCoutToALog = false;
	private static String mRawRecordingPath = "";
	private UsbManager mUsbManager;
	private PendingIntent mUsbPermissionIntent;
	private HashMap<String, UsbDevice> mUsbDeviceList = null;

	static {
		System.loadLibrary("c++_shared");
		System.loadLibrary("fec");
		System.loadLibrary("irtdab");
	}

	private native void created(boolean redirectCoutToALog, String rawRecordingPath);
	private native void deviceDetached(String deviceName);
	private native void deviceAttached(TunerUsb usbDevice);
	private native void devicePermission(String deviceName, boolean granted);
	private native void startSrv(String deviceName, RadioServiceDab service);
	private native void stopSrv(String deviceName);
	private native void tuneFreq(String deviceName, long freq);
	private native void startServiceScan(String deviceName);
	private native void stopServiceScan(String deviceName);
	private native ArrayList<RadioServiceDab> getLinkedServices(String deviceName, RadioServiceDab dabService);
	private native String getHardwareVersion(String deviceName);
	private native String getSoftwareVersion(String deviceName);
	private native void setDirectBulkTransferEnabled(String deviceName, boolean direct);
	private native boolean getDirectBulkTransferEnabled(String deviceName);

	/* EdiStream */
	private native void ediTunerAttached(TunerEdistream ediTuner);
	private native void ediTunerDetached(TunerEdistream ediTuner);
	private native void startEdiStream(TunerEdistream ediTuner, RadioServiceDabEdi ediSrv);
	private native void ediStreamData(byte[] ediData, int size);
	private native void ediFlushBuffer();

	/* DemoTuner */
	private native void demoTunerAttached(DemoTuner demoTuner);
	private native void demoTunerDetached(DemoTuner demoTuner);
	private native void demoServiceStart(RadioService radioService);
	private native void demoServiceStop();

	private UsbHelper(Context context) {
		if(DEBUG)Log.d(TAG, "Constructing UsbHelper...coutToAlog=" + mRedirectCoutToALog);
		mContext = context.getApplicationContext();

		if(mContext != null) {
			mUsbManager = (UsbManager)mContext.getSystemService(Context.USB_SERVICE);
			final int flags;
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
				flags = PendingIntent.FLAG_MUTABLE;
			} else {
				flags = 0;
			}
			Intent intent = new Intent(ACTION_USB_PERMISSION);
			intent.setPackage(mContext.getPackageName()); // make Intent explicit
			mUsbPermissionIntent = PendingIntent.getBroadcast(mContext, 0,
						intent, flags);

			IntentFilter filter = new IntentFilter(ACTION_USB_PERMISSION);
			filter.addAction(UsbManager.ACTION_USB_DEVICE_DETACHED);
			filter.addAction(UsbManager.ACTION_USB_DEVICE_ATTACHED);
			ContextCompat.registerReceiver(mContext, mUsbBroadcastReceiver, filter,
					ContextCompat.RECEIVER_EXPORTED);
			created(mRedirectCoutToALog, mRawRecordingPath);
		}
	}

	List<UsbDevice> scanForSpecificDevices(List<Pair<Integer, Integer>> usbVendorDeviceIdParams) {
		ArrayList<UsbDevice> foundSpecificDevices = new ArrayList<>();

		if(mUsbManager != null) {
			mUsbDeviceList = mUsbManager.getDeviceList();

			for(UsbDevice dev : mUsbDeviceList.values()) {
				int devVenId = dev.getVendorId();
				int devPId = dev.getProductId();
				if(DEBUG)Log.d(TAG, " Found USB Device: VId: " + devVenId + " and PId: " + devPId);
				for(Pair<Integer, Integer> devVenPId : usbVendorDeviceIdParams) {
					if(DEBUG)Log.d(TAG, "Searching for USB VId: " + devVenPId.first + " and PId: " + devVenPId.second);
					if(devVenId == devVenPId.first && devPId == devVenPId.second) {
						if(DEBUG)Log.d(TAG, "Found specific device");
						foundSpecificDevices.add(dev);
					}
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

	public void stopService(String deviceName) {
		stopSrv(deviceName);
	}

	/** @noinspection unused (used by native code) */
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

	public @Nullable ArrayList<RadioServiceDab> getLinkedDabServices(@NonNull String deviceName, @NonNull RadioServiceDab serviceDab) {
		return getLinkedServices(deviceName, serviceDab);
	}

	public @Nullable String getHwVersion(@NonNull String deviceName) {
		return getHardwareVersion(deviceName);
	}

	public @Nullable String getSwVersion(@NonNull String deviceName) {
		return getSoftwareVersion(deviceName);
	}

	public void setDirectBulkTransferModeEnabled(String deviceName, boolean direct) {
		setDirectBulkTransferEnabled(deviceName, direct);
	}
	public boolean getDirectBulkTransferModeEnabled(String deviceName) {
		return getDirectBulkTransferEnabled(deviceName);
	}

	/* EdiStream */
	void ediStreamTunerAttached(TunerEdistream ediTuner) {
		ediTunerAttached(ediTuner);
	}

	void ediStreamTunerDetached(TunerEdistream ediTuner) {
		ediTunerDetached(ediTuner);
	}

	void startEdiStreamService(TunerEdistream ediTuner, RadioServiceDabEdi ediSrv) {
		startEdiStream(ediTuner, ediSrv);
	}

	void ediStream(byte[] ediData, int size) {
		ediStreamData(ediData, size);
	}

	void flushEdiData() {
		ediFlushBuffer();
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

	private boolean mPermissionPending = false;
	@Nullable private UsbDevice mPendingPermissionDevice = null;

	private void requestPermission(UsbDevice device) {
		if(mPermissionPending) {
			mPendingPermissionDevice = device;
		} else {
			if(DEBUG)Log.d(TAG, "Requesting permission for device: " + device.getDeviceName());

			mPermissionPending = true;
			mUsbManager.requestPermission(device, mUsbPermissionIntent);
		}
	}

	/** @noinspection unused (used by native code) */
	private UsbDeviceConnection openDevice(UsbDevice device) {
		if(DEBUG)Log.d(TAG, "Opening device: " + device.getDeviceName());
		try {
			return mUsbManager.openDevice(device);
		} catch(SecurityException secExc) {
			secExc.printStackTrace();
			return null;
		}

	}

	/** @noinspection unused (used by native code) */
	private void closeDeviceConnection(UsbDeviceConnection deviceConnection) {
		if(DEBUG)Log.d(TAG, "Closing USB device connection");
		try {
			deviceConnection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	static void create(Context context, UsbHelperCallback cb, boolean redirectCoutToALog,
					   String rawRecordingPath) {
		if(mInstance == null) {
			mUsbCb = cb;
			mRedirectCoutToALog = redirectCoutToALog;
			mRawRecordingPath = rawRecordingPath;
			mInstance = new UsbHelper(context);
		}
	}

	void destroyInstance() {
		if(DEBUG)Log.d(TAG, "destroyInstance");
		try {
			mContext.unregisterReceiver(mUsbBroadcastReceiver);
		} catch (Exception e) {
			if (DEBUG) e.printStackTrace();
		}
		if (mUsbDeviceList != null) {
			mUsbDeviceList.clear();
		}

		mRedirectCoutToALog = false;
		mUsbCb = null;
		mInstance = null;
	}

	void removeDevice(UsbDevice remDev) {
		if(remDev != null) {
			deviceDetached(remDev.getDeviceName());
		}
	}

	private final BroadcastReceiver mUsbBroadcastReceiver = new BroadcastReceiver() {
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

	interface UsbHelperCallback {

		void UsbTunerDeviceAttached(UsbDevice attachedDevice);

		void UsbTunerDeviceDetached(UsbDevice detachedDevice);
	}

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
}
