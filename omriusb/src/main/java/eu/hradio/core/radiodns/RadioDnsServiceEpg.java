package eu.hradio.core.radiodns;

import android.util.Log;

import androidx.annotation.NonNull;

import org.minidns.record.SRV;
import org.omri.BuildConfig;
import org.omri.radio.impl.IpServiceScanner;
import org.omri.radioservice.RadioService;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class RadioDnsServiceEpg extends RadioDnsService
{
    private static final String TAG = "RadioDnsServiceEpg";
    protected final String mSiUrl;
    protected volatile boolean mSiParserRunning;
    private final ExecutorService mCbExe;
    protected final ConcurrentLinkedQueue<RadioDnsServiceEpgSiCallback> mSiCallbacks;
    protected final ConcurrentHashMap<String, CopyOnWriteArrayList<RadioDnsServiceEpgPiCallback>> mPiCallbacks;
    private final ConcurrentHashMap<String, Boolean> mPiThreadsRunning;
    protected RadioEpgServiceInformation mSi;
    private final HashMap<String, RadioEpgProgrammeInformation> mPiMap;
    
    RadioDnsServiceEpg(final SRV srvRecord, final String rdnsSrvId, final String bearerUri, final RadioDnsServiceType srvType, final RadioService lookupSrv) {
        super(srvRecord, rdnsSrvId, bearerUri, srvType, lookupSrv);
        this.mSiParserRunning = false;
        this.mSiCallbacks = new ConcurrentLinkedQueue<>();
        this.mPiCallbacks = new ConcurrentHashMap<>();
        this.mPiThreadsRunning = new ConcurrentHashMap<>();
        this.mSi = null;
        this.mPiMap = new HashMap<>();
        this.mCbExe = Executors.newFixedThreadPool(10);
        this.mSiUrl = createEpgSiUrl();
    }
    
    public void getServiceInformation(@NonNull final RadioDnsServiceEpgSiCallback cb) {
        this.mSiCallbacks.offer(cb);
        if (this.mSi == null) {
            if (!this.mSiParserRunning) {
                this.mSiParserRunning = true;
                final Thread piParserThread = new Thread(() -> {
                    try {
                        final RadioEpgSiParser parser = new RadioEpgSiParser();
                        final HttpURLConnection urlConnection = IpServiceScanner.getInstance().getConnection(mSiUrl);
                        if (urlConnection != null) {
                            mSi = parser.parse(urlConnection.getInputStream());
                            if (BuildConfig.DEBUG) Log.i(TAG, "getServiceInformation: parsed " + urlConnection.getURL().toString());
                        } else {
                            Log.w(TAG,"failed to connect to " + mSiUrl);
                        }
                        callSiCallbacks(this);
                    }
                    catch (Exception e) {
                        //noinspection CallToPrintStackTrace
                        e.printStackTrace();
                    }
                    finally {
                        callSiCallbacks(this);
                        mSiParserRunning = false;
                    }
                });
                piParserThread.start();
            }
        }
        else {
            this.callSiCallbacks(this);
        }
    }

    /** @noinspection unused*/
    public void getProgrammeInformation(@NonNull final RadioDnsServiceEpgPiCallback cb) {
        this.getProgrammeInformation(0, cb);
    }
    
    public void getProgrammeInformation(final int dayOffset, @NonNull final RadioDnsServiceEpgPiCallback cb) {
        final String dateString = this.createPiDate(dayOffset);
        final String piUrl = this.createEpgPiUrl(dateString);
        if (!this.mPiCallbacks.containsKey(dateString)) {
            this.mPiCallbacks.put(dateString, new CopyOnWriteArrayList<RadioDnsServiceEpgPiCallback>() {
                {
                    this.add(cb);
                }
            });
        }
        else {
            final CopyOnWriteArrayList<RadioDnsServiceEpgPiCallback> cbs = this.mPiCallbacks.get(dateString);
            if (cbs != null) {
                cbs.add(cb);
            }
        }
        if (!this.mPiMap.containsKey(dateString)) {
            final Boolean running = this.mPiThreadsRunning.get(dateString);
            if (running == null || !running) {
                this.mPiThreadsRunning.put(dateString, true);
                final Thread piParserThread = new Thread(() -> {
                    try {
                        final RadioEpgPiParser parser = new RadioEpgPiParser();
                        final HttpURLConnection urlConnection = IpServiceScanner.getInstance().getConnection(piUrl);
                        if (urlConnection != null) {
                            mPiMap.put(dateString, parser.parse(urlConnection.getInputStream()));

                        } else {
                            Log.w(TAG, "failed to connect to " + piUrl);
                        }
                        callPiCallbacks(dateString, this);
                    }
                    catch (IOException e) {
                        //noinspection CallToPrintStackTrace
                        e.printStackTrace();
                    }
                    finally {
                        callPiCallbacks(dateString, this);
                        mPiThreadsRunning.put(dateString, false);
                    }
                });
                piParserThread.start();
            }
        }
        else {
            this.callPiCallbacks(dateString, this);
        }
    }

    protected void callSiCallbacks(final RadioDnsServiceEpg rdnsService) {
        if (!this.mSiCallbacks.isEmpty()) {
            for (final RadioDnsServiceEpgSiCallback cb : this.mSiCallbacks) {
                if (cb != null) {
                    this.mCbExe.execute(() ->
                            cb.serviceInformationRetrieved(mSi, rdnsService));
                }
            }
            this.mSiCallbacks.clear();
        }
    }
    
    private void callPiCallbacks(final String date, final RadioDnsServiceEpg rdnsService) {
        if (this.mPiCallbacks.containsKey(date)) {
            synchronized (this) {
                final CopyOnWriteArrayList<RadioDnsServiceEpgPiCallback> cbs = this.mPiCallbacks.get(date);
                if (cbs != null) {
                    for (final RadioDnsServiceEpgPiCallback cb : cbs) {
                        if (cb != null) {
                            this.mCbExe.execute(() ->
                                    cb.programmeInformationRetrieved(
                                            mPiMap.get(date), rdnsService));
                        }
                    }
                }
                this.mPiCallbacks.remove(date);
            }
        }
    }
    
    protected String createEpgSiUrl() {
        final StringBuilder silUrlBuilder = new StringBuilder();
        silUrlBuilder.append("http://").append(this.getTarget());
        if (this.getPort() != 80) {
            silUrlBuilder.append(":").append(this.getPort());
        }
        silUrlBuilder.append("/radiodns/spi/3.1/SI.xml");
        return silUrlBuilder.toString();
    }
    
    protected String createEpgPiUrl(final String dateString) {
        final StringBuilder pilUrlBuilder = new StringBuilder();
        pilUrlBuilder.append("http://").append(this.getTarget());
        if (this.getPort() != 80) {
            pilUrlBuilder.append(":").append(this.getPort());
        }
        pilUrlBuilder.append("/radiodns/spi/3.1/").append(this.getServiceIdentifier()).append("/");
        pilUrlBuilder.append(dateString);
        pilUrlBuilder.append("_PI.xml");
        return pilUrlBuilder.toString();
    }
    
    private String createPiDate(final int dayOffset) {
        final Calendar cal = Calendar.getInstance();
        final int year = cal.get(1);
        final int month = cal.get(2);
        final int day = cal.get(5);
        cal.set(year, month, day + dayOffset);
        final DateFormat df = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
        final Date dateOffset = new Date(cal.getTimeInMillis());
        return df.format(dateOffset);
    }
}
