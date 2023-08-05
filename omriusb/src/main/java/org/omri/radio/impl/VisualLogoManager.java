package org.omri.radio.impl;

import static org.omri.BuildConfig.DEBUG;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONArray;
import org.json.JSONObject;
import org.omri.radio.Radio;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceType;
import org.omri.radioservice.metadata.Visual;
import org.omri.radioservice.metadata.VisualMimeType;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicBoolean;

class VisualLogoManager {

    private final static String TAG = "VisualLogoManager";
    private final static String VIS_CACHE_DIR = "logo_cache";
    private final static String LOGOS_FILENAME = "logos.json";
    private final static String VIS_FILES_CACHE_DIR = "logofiles_cache";

    @Nullable private static VisualLogoManager mManagerInstance = null;
    static final AtomicBoolean instanceGuard = new AtomicBoolean();

    private final CopyOnWriteArrayList<VisualLogoImpl> mLogoList = new CopyOnWriteArrayList<>();
    private final AtomicBoolean mSerializingInProgress = new AtomicBoolean(false);
    private final AtomicBoolean mDeserializingInProgress = new AtomicBoolean(false);
    private final AtomicBoolean mIsInitialized = new AtomicBoolean(false);
    @Nullable private Thread mDeSerThread = null;

    private VisualLogoManager() {
        final Context context = ((RadioImpl) Radio.getInstance()).getAppContext();
        final @Nullable File logoDir = getLogoCacheDir();
        if (context != null && logoDir != null) {
            if (DEBUG) Log.d(TAG, "LogoCacheDir: " + logoDir.getAbsolutePath());

            if (!logoDir.exists()) {
                boolean logoCacheCreated = logoDir.mkdirs();
                if (logoCacheCreated) {
                    if (DEBUG) Log.d(TAG, "Created successfully LogoCacheDir");
                } else {
                    Log.w(TAG, "Creating LogoCacheDir failed");
                }
                mIsInitialized.set(true);
            } else {
                mDeSerThread = new Thread(() -> {
                    Thread.currentThread().setName("DeserLogos");
                    deserializeLogos();
                    mIsInitialized.set(true);
                });
                mDeSerThread.start();
            }
        }
    }

    @NonNull
    static VisualLogoManager getInstance() {
        VisualLogoManager ret;
        synchronized (instanceGuard) {
            if (mManagerInstance == null) {
                mManagerInstance = new VisualLogoManager();
            }
            ret = mManagerInstance;
        }
        return ret;
    }

    void destroyInstance() {
        if (mDeSerThread != null && mDeSerThread.isAlive()) {
            try {
                mDeSerThread.join(1000);
            } catch (Exception e) {
                if (DEBUG) e.printStackTrace();
            } finally {
                mDeSerThread = null;
                mDeserializingInProgress.set(false);
            }
        }
        mLogoList.clear();

        synchronized (instanceGuard) {
            mManagerInstance = null;
        }
    }

    boolean isReady() {
        return mIsInitialized.get() && !mDeserializingInProgress.get();
    }

    @Nullable File getLogoCacheDir() {
        final Context context = ((RadioImpl) Radio.getInstance()).getAppContext();
        if (context != null) {
            return new File(context.getCacheDir(), VIS_CACHE_DIR);
        }
        return null;
    }
    @Nullable File getLogoFilesCacheDir() {
        final Context context = ((RadioImpl) Radio.getInstance()).getAppContext();
        if (context != null) {
            return new File(context.getCacheDir(), VIS_FILES_CACHE_DIR);
        }
        return null;
    }

    void addLogoVisual(VisualLogoImpl logoVisual) {
        if (!mLogoList.contains(logoVisual)) {
            if (DEBUG) Log.d(TAG, "Adding Logo " + logoVisual.getLogoUrl());
            mLogoList.add(logoVisual);
        }
    }

    List<Visual> getLogoVisuals(RadioService service) {
        ArrayList<Visual> retArr = new ArrayList<>();
        if (!isReady()) {
            if (DEBUG) Log.d(TAG, "not ready");
            return retArr;
        }

        if (service.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_DAB || service.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_EDI) {
            for (VisualLogoImpl vis : mLogoList) {
                for (RadioDnsEpgBearer bearer : vis.getBearers()) {
                    if (bearer.getBearerType() == RadioDnsEpgBearerType.DAB) {
                        if (((RadioDnsEpgBearerDab) bearer).getEnsembleId() == ((RadioServiceDab) service).getEnsembleId() &&
                                ((RadioDnsEpgBearerDab) bearer).getServiceId() == ((RadioServiceDab) service).getServiceId() &&
                                ((RadioDnsEpgBearerDab) bearer).getEnsembleEcc() == ((RadioServiceDab) service).getEnsembleEcc()) {
                            retArr.add(vis);
                            break;
                        }
                    }
                }
            }
        } else if (service.getRadioServiceType() == RadioServiceType.RADIOSERVICE_TYPE_IP) {
            for (VisualLogoImpl vis : mLogoList) {
                boolean logoFound = false;
                for (RadioDnsEpgBearer bearer : vis.getBearers()) {
                    for (RadioDnsEpgBearer srvBearer : ((RadioServiceIpImpl) service).getBearers()) {
                        if (bearer.equals(srvBearer)) {
                            retArr.add(vis);
                            logoFound = true;
                            break;
                        }
                    }

                    if (logoFound) {
                        break;
                    }
                }
            }
        }

        return retArr;
    }

    void serializeLogos() {
        if (!mSerializingInProgress.get()) {
            mSerializingInProgress.set(true);

            if (DEBUG) Log.d(TAG, "LogoJson Serializing " + mLogoList.size() + " LogoVisuals");
            final @Nullable Context context = ((RadioImpl) Radio.getInstance()).getAppContext();
            final @Nullable File visCacheDir = getLogoCacheDir();
            if (context != null && visCacheDir != null) {
                if (!visCacheDir.exists()) {
                    boolean cacheDirCreated = visCacheDir.mkdirs();
                    if (DEBUG) {
                        Log.d(TAG, "VisCache dir created: " + cacheDirCreated);
                    }
                }

                if (visCacheDir.exists()) {
                    try {
                        JSONArray visArr = new JSONArray();
                        for (VisualLogoImpl logo : mLogoList) {
                            JSONObject visObj = new JSONObject();

                            visObj.put("logoUrl", logo.getLogoUrl());
                            visObj.put("visType", logo.getVisualType().toString());
                            visObj.put("filePath", logo.getFilePath());
                            visObj.put("width", logo.getVisualWidth());
                            visObj.put("height", logo.getVisualHeight());
                            visObj.put("mimeType", logo.getVisualMimeType().toString());

                            JSONArray bearersArr = new JSONArray();
                            for (RadioDnsEpgBearer bearer : logo.getBearers()) {
                                JSONObject bearerObj = new JSONObject();

                                bearerObj.put("mimeValue", bearer.getMimeValue());
                                bearerObj.put("bearerId", bearer.getBearerId());
                                bearerObj.put("bearerType", bearer.getBearerType().toString());
                                bearerObj.put("bitrate", bearer.getBitrate());
                                bearerObj.put("cost", bearer.getCost());

                                bearersArr.put(bearerObj);
                            }
                            visObj.put("bearers", bearersArr);

                            visArr.put(visObj);
                        }

                        BufferedWriter logoListWriter = null;
                        try {
                            //save to file
                            if (DEBUG) Log.d(TAG, "Serializing LogoJson writing to file...");

                            File srvListFile = new File(visCacheDir, LOGOS_FILENAME);
                            logoListWriter = new BufferedWriter(new FileWriter(srvListFile));
                            logoListWriter.write(visArr.toString(2));
                            logoListWriter.close();

                            // some previously cached logo files may no longer be referenced
                            final @Nullable File visFilesCacheDir = getLogoFilesCacheDir();
                            if (visFilesCacheDir != null) {
                                trimLogoCacheFiles(mLogoList, visFilesCacheDir);
                            }
                        } catch (Throwable e) {
                            if (DEBUG) e.printStackTrace();
                        } finally {
                            mSerializingInProgress.set(false);

                            if (logoListWriter != null) {
                                try {
                                    logoListWriter.close();
                                } catch (Throwable e) {
                                    if (DEBUG) e.printStackTrace();
                                }
                            }
                        }
                    } catch (Throwable e) {
                        if (DEBUG) e.printStackTrace();
                    }
                } else {
                    mSerializingInProgress.set(false);
                }
            }

            if (DEBUG) Log.d(TAG, "Serializing LogoJson done!");
        } else {
            if (DEBUG) Log.d(TAG, "Serializing already in progress");
        }
    }

    private void trimLogoCacheFiles(@NonNull CopyOnWriteArrayList<VisualLogoImpl> logoList,
                                    @NonNull File visFilesCacheDir) {
        if (!visFilesCacheDir.exists()) return;

        // list all files in visFilesCacheDir (assumption: no sub directories in visFilesCacheDir)
        File[] files = visFilesCacheDir.listFiles();
        if (files == null || files.length == 0) return;

        // remove files no longer referenced by logoList
        String logStr;
        for (File f : files) {
            boolean isReferenced = false;
            for (VisualLogoImpl logo : logoList) {
                if (f.getName().equals(logo.getFilePath())) {
                    isReferenced = true;
                    break;
                }
            }
            if (!isReferenced) {
                logStr = "delete unreferenced " + f.getName();
                if (!f.delete()) {
                    Log.w(TAG, "failed " + logStr);
                } else {
                    if (DEBUG) Log.d(TAG, logStr);
                }
            }
        }
    }

    private void deserializeLogos() {
        if (!mDeserializingInProgress.get()) {
            mDeserializingInProgress.set(true);

            if (DEBUG) Log.d(TAG, "Restoring LogoJson");
            final Context context = ((RadioImpl) Radio.getInstance()).getAppContext();
            if (context == null) {
                Log.w(TAG, "deserializeLogos: Radio context null");
                mDeserializingInProgress.set(false);
                return;
            }
            final @Nullable File visFilesCacheDir = getLogoFilesCacheDir();
            final @Nullable File visCacheDir = getLogoCacheDir();
            final @Nullable File visCacheFile = (visCacheDir != null) ? new File(visCacheDir, LOGOS_FILENAME) : null;
            if (visCacheFile != null && visCacheFile.exists()) {
                mLogoList.clear();

                FileInputStream logoJsonInputStream = null;
                BufferedReader logoJsonReader = null;
                try {
                    logoJsonInputStream = new FileInputStream(visCacheFile);
                    logoJsonReader = new BufferedReader(new InputStreamReader(logoJsonInputStream));
                    StringBuilder logoJsonBuilder = new StringBuilder();

                    char[] readBuf = new char[16 * 1024];
                    int bytesRead;
                    while ((bytesRead = logoJsonReader.read(readBuf)) != -1) {
                        logoJsonBuilder.append(readBuf, 0, bytesRead);
                    }

                    if (DEBUG)
                        Log.d(TAG, "Read " + LOGOS_FILENAME + " done: "
                                + logoJsonBuilder.length() + " length");

                    JSONArray logoListArr = new JSONArray(logoJsonBuilder.toString());
                    if (DEBUG) Log.d(TAG, "Read LogoJson length: " + logoListArr.length());
                    ArrayList<VisualLogoImpl> deserList = new ArrayList<>();
                    for (int i = 0; i < logoListArr.length(); i++) {
                        JSONObject logoObj = logoListArr.getJSONObject(i);

                        VisualLogoImpl logo = new VisualLogoImpl();

                        logo.setLogoUrl(logoObj.getString("logoUrl"));
                        final String mimeTypeStr = logoObj.getString("mimeType");
                        VisualMimeType mimeType = VisualMimeType.METADATA_VISUAL_MIMETYPE_UNKNOWN;
                        try {
                            mimeType = VisualMimeType.valueOf(mimeTypeStr);
                        } catch (Exception e) {
                            if (DEBUG)
                                e.printStackTrace();
                        }
                        logo.setVisualMimeType(mimeType);
                        logo.setFilePath(logoObj.getString("filePath"));
                        logo.setWidth(logoObj.getInt("width"));
                        logo.setHeight(logoObj.getInt("height"));

                        JSONArray bearersArr = logoObj.getJSONArray("bearers");
                        for (int j = 0; j < bearersArr.length(); j++) {
                            JSONObject bearerObj = bearersArr.getJSONObject(j);

                            RadioDnsEpgBearerType bearerType = RadioDnsEpgBearerType.valueOf(bearerObj.getString("bearerType"));
                            String bearerId = bearerObj.getString("bearerId");
                            String mimeValue = bearerObj.getString("mimeValue");
                            int bitrate = bearerObj.getInt("bitrate");
                            int cost = bearerObj.getInt("cost");
                            switch (bearerType) {
                                case DAB:
                                    logo.addBearer(new RadioDnsEpgBearerDab(bearerId, cost, mimeValue, bitrate));
                                    break;
                                case IP_HTTP:
                                    logo.addBearer(new RadioDnsEpgBearerIpHttp(bearerId, cost, mimeValue, bitrate));
                                    break;
                                default:
                                    break;
                            }
                        }

                        // sanity check, only in DEBUG build to not slow down the app startup
                        if (DEBUG) {
                            if (!logo.isAvailable()) {
                                Log.w(TAG, "not avail:" + logo.getFilePath());
                            }
                        }
                        deserList.add(logo);
                    }

                    mLogoList.addAll(deserList);

                    if (DEBUG) Log.d(TAG, "Restoring LogoJson done");
                } catch (Throwable e) {
                    if (DEBUG) e.printStackTrace();
                } finally {
                    try {
                        if (logoJsonInputStream != null) {
                            logoJsonInputStream.close();
                        }
                        if (logoJsonReader != null) {
                            logoJsonReader.close();
                        }
                    } catch (Throwable e) {
                        if (DEBUG) e.printStackTrace();
                    }
                }
            } else {
                if (DEBUG) Log.d(TAG, "Restoring LogoJson does not exist");
            }

            if (visFilesCacheDir != null) {
                // some previously cached logo files may no longer be referenced
                trimLogoCacheFiles(mLogoList, visFilesCacheDir);
            }

            mDeserializingInProgress.set(false);
        }
    }
}
