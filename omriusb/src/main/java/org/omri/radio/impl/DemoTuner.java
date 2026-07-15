package org.omri.radio.impl;

import com.thiakil.standin.AsyncTask;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.jspecify.annotations.NonNull;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceType;
import org.omri.tuner.Tuner;
import org.omri.tuner.TunerListener;
import org.omri.tuner.TunerStatus;
import org.omri.tuner.TunerType;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Copyright (C) 2020 realzoulou
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
 * @author realzoulou
 */

public class DemoTuner implements Tuner {

    private final static Logger LOGGER = LogManager.getLogger("DemoTuner");
    private final static String DEMO_DEVICE_NAME = "DemoDevice"; // must be equal to DemoUsbTunerInput::DEMO_DEVICE_NAME
    private final static int DEVICE_ID = -1; // must be equal to DemoUsbTunerInput
    private final TunerType mTunertype = TunerType.TUNER_TYPE_DAB;
    private final List<RadioService> mServices = new ArrayList<>();
    private final List<TunerListener> mTunerlisteners = Collections.synchronizedList(new ArrayList<>());
    private final String mInputFilesPath;
    private TunerStatus mTunerStatus = TunerStatus.TUNER_STATUS_NOT_INITIALIZED;
    private RadioService mCurrentlyRunningService = null;
    @Nullable
    private RestoreServicesTask mRestoreServicesTask = null;
    private boolean mTunerInitDone = false;


    DemoTuner(String inputFilesPath) {
        mInputFilesPath = inputFilesPath;
    }

    @Override
    public void initializeTuner() {
        if(mTunerStatus == TunerStatus.TUNER_STATUS_NOT_INITIALIZED) {
            LOGGER.debug("Initializing Tuner");
            UsbHelper.getInstance().attachDemoTuner(this);
            new CollectRecordingsTask(this).execute();
        }
    }

    @Override
    public void suspendTuner() {
        switch (mTunerStatus) {
            case TUNER_STATUS_SUSPENDED:
            case TUNER_STATUS_NOT_INITIALIZED:
                break;
            case TUNER_STATUS_SCANNING:
                stopRadioServiceScan();
            case TUNER_STATUS_INITIALIZED:
            case TUNER_STATUS_ERROR: {
                LOGGER.debug("Suspending Tuner: " + this);
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
        if(mTunerStatus == TunerStatus.TUNER_STATUS_SUSPENDED) {
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
                mTunerStatus = TunerStatus.TUNER_STATUS_NOT_INITIALIZED;
                for (TunerListener listener : mTunerlisteners) {
                    listener.tunerStatusChanged(this, mTunerStatus);
                }
                mTunerlisteners.clear();
                mServices.clear();
                mCurrentlyRunningService = null;
                UsbHelper.getInstance().detachDemoTuner(this);
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
        if(mTunerStatus == TunerStatus.TUNER_STATUS_INITIALIZED) {
            return mServices;
        } else {
            return new ArrayList<>();
        }
    }

    @NonNull
    @Override
    public ArrayList<RadioService> getLinkedRadioServices(@NonNull RadioService service) {
        ArrayList<RadioService> retLinkedRadioServices = new ArrayList<>();
        if (service instanceof RadioServiceDab) {

            // retrieve DAB services that are linked to the given service
            final ArrayList<RadioServiceDab> linkedDabServices =
                    UsbHelper.getInstance().getLinkedDabServices(DEVICE_ID,
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
    public void startRadioServiceScan() {
        // Not supported
    }

    @Override
    public void startRadioServiceScan(Object scanOptions) {
        // Not supported
    }

    @Override
    public void stopRadioServiceScan() {
        // Not supported
    }

    @Override
    public void startRadioService(RadioService radioService) {
        LOGGER.debug("Starting Service: " + radioService.getServiceLabel());
        mCurrentlyRunningService = radioService;
        UsbHelper.getInstance().startDemoService(radioService);
    }

    @Override
    public void stopRadioService() {
        if (mCurrentlyRunningService != null) {
            LOGGER.debug("Stopping Service: " + mCurrentlyRunningService.getServiceLabel());
            mCurrentlyRunningService = null;
            UsbHelper.getInstance().stopDemoService();
        }
    }

    @Override
    public RadioService getCurrentRunningRadioService() {
        return mCurrentlyRunningService;
    }

    @Override
    public @NonNull String getHardwareVersion() {
        return "demoHw";
    }

    @Override
    public @NonNull String getSoftwareVersion() {
        return "demoSw";
    }

    @Override
    public void subscribe(TunerListener tunerListener) {
        if(!mTunerlisteners.contains(tunerListener)) {
            mTunerlisteners.add(tunerListener);
        }
    }

    @Override
    public void unsubscribe(TunerListener tunerListener) {
        mTunerlisteners.remove(tunerListener);
    }

    void callBack(int callbackType) {
        final TunerUsbCallbackTypes type = TunerUsbCallbackTypes.getTypeByValue(callbackType);
        new Thread(() -> {
            switch (type) {
                case TUNER_READY:
                    mTunerInitDone = true;
                    mTunerStatus = TunerStatus.TUNER_STATUS_INITIALIZED;
                    synchronized (mTunerlisteners) {
                        for (TunerListener listener : mTunerlisteners) {
                            listener.tunerStatusChanged(this, mTunerStatus);
                        }
                    }
                    break;

                case TUNER_FAILED:
                    mTunerStatus = TunerStatus.TUNER_STATUS_ERROR;
                    synchronized (mTunerlisteners) {
                        for (TunerListener listener : mTunerlisteners) {
                            listener.tunerStatusChanged(this, mTunerStatus);
                        }
                    }
                    break;

                case TUNER_SCAN_IN_PROGRESS: {
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
            }
        }).start();
    }

    /* callbacks from native code --------- */
    public void serviceStarted(RadioService radioService) {
        // tell service that it was started
        ((RadioServiceImpl) radioService).serviceStarted();
        for (TunerListener listener : mTunerlisteners) {
            listener.radioServiceStarted(this, radioService);
        }
    }

    public void serviceStopped(RadioService radioService) {
        // tell service that it was stoppped
        ((RadioServiceImpl) radioService).serviceStopped();
        // inform tuner listeners
        for (TunerListener listener : mTunerlisteners) {
            listener.radioServiceStopped(this, radioService);
        }
    }
/*  --------- callbacks from native code END */

    private class CollectRecordingsTask extends AsyncTask<Void, Void, Void> {
        private final String TAG = "CollectRecordingsTask";
        private final Tuner mInstance;

        CollectRecordingsTask(Tuner instance) {
            mInstance = instance;
        }

        @Override
        protected Void doInBackground(Void voids) {
            File inputDir = new File(mInputFilesPath);
            if (inputDir.isDirectory()) {
                String[] filenames = inputDir.list(new FilenameFilter() {
                    @Override
                    public boolean accept(File dir, String name) {
                        return name != null
                                // see RaonTunerInput::rawRecordOpen
                                && name.startsWith("dab_")
                                && name.endsWith(".raw");
                    }
                });
                if (filenames != null) {
                    int counter = 1;
                    for (String filename : filenames) {
                        File file = new File(inputDir, filename);
                        if (file.exists()) {
                            LOGGER.debug("recording found:'" + file.getAbsolutePath() + "'");
                            filename = filename.replace("dab_", "");
                            filename = filename.replace(".raw", "");
                            String[] splits = filename.split("_");
                            String label = "";
                            int eid=0, sid=0;
                            if (splits.length == 5) {
                                // Y-m-d_H-M-S_LABEL_EID_SID
                                try {
                                    label = splits[2].trim();
                                    eid = Integer.parseInt(splits[3], 16);
                                    sid = Integer.parseInt(splits[4], 16);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            } else if (splits.length == 4) {
                                // Y-m-d_H-M-S_scan_FreqMHz
                                label = splits[2] + " " + splits[3]; // e.g. "scan 178352"
                                eid = sid = counter; // a dummy EId/SId
                                counter++;
                            }
                            else {
                                LOGGER.warn("split filename: " + Arrays.toString(splits));
                            }
                            RadioServiceDabImpl foundService = new RadioServiceDabImpl();
                            foundService.setServiceLabel(label);
                            //foundService.setLongDescription(file.getAbsolutePath());
                            foundService.setEnsembleId(eid);
                            foundService.setServiceId(sid);
                            foundService.setIsProgrammeService(true);
                            foundService.setEnsembleFrequency(174928000 /* fake 5A */);
                            mServices.add(foundService);
                        }
                    }
                }
            } else {
                LOGGER.warn("not a dir:'" + mInputFilesPath + "'");
            }

            if (!mServices.isEmpty()) {
                // Collected >0 recordings, use them as the service list
                final RadioServiceManager rsm = RadioServiceManager.getInstance();
                while (!rsm.isServiceListReady(RadioServiceType.RADIOSERVICE_TYPE_DAB)) {
                    try {
                        //noinspection BusyWait
                        Thread.sleep(10);
                    } catch (Exception e) {
                        LOGGER.error(e);
                    }
                }
                rsm.clearServiceList(RadioServiceType.RADIOSERVICE_TYPE_DAB);
                for (RadioService service : mServices) {
                    rsm.addRadioService(service);
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            LOGGER.debug("CollectRecordingsTask finished with " + mServices.size()
                    + " services");
            mRestoreServicesTask = new RestoreServicesTask();
            mRestoreServicesTask.execute();
        }
    }

    private class RestoreServicesTask extends AsyncTask<Void, Void, Void> {

        @Override
        protected Void doInBackground(Void params) {
            LOGGER.debug("Restoring services....");
            while (!RadioServiceManager.getInstance().isServiceListReady(RadioServiceType.RADIOSERVICE_TYPE_DAB) && !isCancelled() ) {
                try {
                    //noinspection BusyWait
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                LOGGER.debug("Waiting for servicelist to be ready");
            }

            synchronized (mServices) {
                mServices.clear();
                mServices.addAll(RadioServiceManager.getInstance().getRadioServices(RadioServiceType.RADIOSERVICE_TYPE_DAB));
            }

            LOGGER.debug("Restore services finished");
            callBack(TunerUsbCallbackTypes.TUNER_READY.getIntValue());

            return null;
        }
    }
}
