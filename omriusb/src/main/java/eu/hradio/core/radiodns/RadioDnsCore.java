package eu.hradio.core.radiodns;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.minidns.dnsserverlookup.android21.AndroidUsingLinkProperties;
import org.minidns.hla.ResolverApi;
import org.minidns.hla.ResolverResult;
import org.minidns.record.CNAME;
import org.minidns.record.SRV;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class RadioDnsCore
{
    @SuppressWarnings("unused")
    private static final String TAG = "RadioDnsCore";
    private final RadioService mLookupSrv;
    private final @Nullable String mFqdn;
    private final @Nullable String mRdnsSrvId;
    private final @Nullable String mBearerUri;
    private volatile boolean mLookupRunning;
    private final ArrayList<RadioDnsService> mFoundServices;
    private final ExecutorService mCbExe;
    private final ConcurrentLinkedQueue<RadioDnsCoreLookupCallback> mCallbacks;

    RadioDnsCore(@NonNull final RadioService lookupSrv) {
        this.mLookupRunning = false;
        this.mFoundServices = new ArrayList<>();
        this.mCallbacks = new ConcurrentLinkedQueue<>();
        this.mLookupSrv = lookupSrv;
        this.mCbExe = Executors.newFixedThreadPool(10);
        switch (this.mLookupSrv.getRadioServiceType()) {
            case RADIOSERVICE_TYPE_DAB:
            case RADIOSERVICE_TYPE_EDI: {
                final RadioServiceDab dabSrv = (RadioServiceDab)this.mLookupSrv;
                this.mFqdn = "0." + Integer.toHexString(dabSrv.getServiceId()) + "." + Integer.toHexString(dabSrv.getEnsembleId()) + "." + Integer.toHexString(dabSrv.getServiceId()).charAt(0) + Integer.toHexString(dabSrv.getEnsembleEcc()) + ".dab.radiodns.org";
                this.mRdnsSrvId = "dab/" + Integer.toHexString(dabSrv.getServiceId()).charAt(0) + Integer.toHexString(dabSrv.getEnsembleEcc()) + "/" + Integer.toHexString(dabSrv.getEnsembleId()) + "/" + Integer.toHexString(dabSrv.getServiceId()) + "/0";
                this.mBearerUri = "dab:" + Integer.toHexString(dabSrv.getServiceId()).charAt(0) + Integer.toHexString(dabSrv.getEnsembleEcc()) + "." + Integer.toHexString(dabSrv.getEnsembleId()) + "." + Integer.toHexString(dabSrv.getServiceId()) + ".0";
                break;
            }
            default: {
                this.mFqdn = null;
                this.mRdnsSrvId = null;
                this.mBearerUri = null;
                break;
            }
        }
    }

    public void coreLookup(@NonNull final RadioDnsCoreLookupCallback callback, @NonNull final Context context) {
        this.mCallbacks.offer(callback);
        if (this.mFoundServices.isEmpty() && this.mFqdn != null && this.mRdnsSrvId != null && this.mBearerUri != null) {
            if (!this.mLookupRunning) {
                this.mLookupRunning = true;
                final Thread lookupThread = new LookupThread(context, this.mLookupSrv);
                lookupThread.start();
            }
        }
        else {
            this.callCallbacks();
        }
    }

    private void callCallbacks() {
        synchronized (this.mCallbacks) {
            for (final RadioDnsCoreLookupCallback cb : this.mCallbacks) {
                try {
                    this.mCbExe.execute(() -> cb.coreLookupFinished(RadioDnsCore.this.mLookupSrv, RadioDnsCore.this.mFoundServices));
                } catch (Throwable e) {
                    //noinspection CallToPrintStackTrace
                    e.printStackTrace();
                }
            }
            this.mCallbacks.clear();
        }
    }

    private void resolveServiceRecords(final CNAME cname, @NonNull final Context context) {
        for (final RadioDnsServiceType rdnsType : RadioDnsServiceType.values()) {
            try {
                AndroidUsingLinkProperties.setup(context);
                final String appFqdn = String.format("_%s._%s.%s", rdnsType.getAppName(), "tcp", cname.getTarget().toString());
                final ResolverResult<SRV> result = ResolverApi.INSTANCE.resolve(appFqdn, SRV.class);
                if (result.wasSuccessful()) {
                    for (final SRV serviceRecord : result.getAnswers()) {
                        Log.d(TAG, "SRV for '" + appFqdn
                                + "' : target '" + serviceRecord.target.toString()
                                + "' port " + serviceRecord.port);
                        switch (rdnsType) {
                            case RADIO_VIS: {
                                this.mFoundServices.add(new RadioDnsServiceVis(serviceRecord, this.mRdnsSrvId, this.mBearerUri, rdnsType, this.mLookupSrv));
                                break;
                            }
                            case RADIO_EPG: {
                                this.mFoundServices.add(new RadioDnsServiceEpg(serviceRecord, this.mRdnsSrvId, this.mBearerUri, rdnsType, this.mLookupSrv));
                                break;
                            }
                            case RADIO_TAG: {
                                this.mFoundServices.add(new RadioDnsServiceTag(serviceRecord, this.mRdnsSrvId, this.mBearerUri, rdnsType, this.mLookupSrv));
                                break;
                            }
                            case RADIO_WEB: {
                                this.mFoundServices.add(new RadioDnsServiceWeb(serviceRecord, this.mRdnsSrvId, this.mBearerUri, rdnsType, this.mLookupSrv));
                                break;
                            }
                        }
                    }
                } else {
                    Log.i(TAG, "SRV failed for '" + appFqdn + "' code:" + result.getResponseCode());
                }
            }
            catch (Throwable e) {
                //noinspection CallToPrintStackTrace
                e.printStackTrace();
            }
        }
    }

    private class LookupThread extends Thread {
        private final Context context;
        private final RadioService radioService;

        public LookupThread(Context context, RadioService radioService) {
            this.context = context;
            this.radioService = radioService;
        }

        @Override
        public void run() {
            try {
                if (RadioDnsCore.this.mFqdn != null) {
                    AndroidUsingLinkProperties.setup(context);
                    final ResolverResult<CNAME> result = ResolverApi.INSTANCE.resolve(RadioDnsCore.this.mFqdn, CNAME.class);
                    if (result.wasSuccessful()) {
                        for (final CNAME cname : result.getAnswers()) {
                            Log.d(TAG, "CNAME for '" + radioService.getServiceLabel()
                                    + "' FQDN '" + RadioDnsCore.this.mFqdn
                                    + "' : '" + cname.getTarget().toString() + "'");
                            RadioDnsCore.this.resolveServiceRecords(cname, context);
                        }
                    } else {
                        Log.i(TAG, "CNAME failed for '" + radioService.getServiceLabel()
                                + "' FQDN '" + RadioDnsCore.this.mFqdn + "' code:" + result.getResponseCode());
                    }
                }
            } catch (Throwable e) {
                //noinspection CallToPrintStackTrace
                e.printStackTrace();
            } finally {
                RadioDnsCore.this.callCallbacks();
                RadioDnsCore.this.mLookupRunning = false;
            }
        }
    }
}
