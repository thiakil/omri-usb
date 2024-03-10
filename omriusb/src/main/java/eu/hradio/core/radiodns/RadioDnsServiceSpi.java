package eu.hradio.core.radiodns;

import org.minidns.record.SRV;
import org.omri.radioservice.RadioService;

public class RadioDnsServiceSpi extends RadioDnsServiceEpg {
    private static final String TAG = "RadioDnsServiceSpi";

    RadioDnsServiceSpi(SRV srvRecord, String rdnsSrvId, String bearerUri, RadioDnsServiceType srvType, RadioService lookupSrv) {
        super(srvRecord, rdnsSrvId, bearerUri, srvType, lookupSrv);
    }

    protected String createEpgSiUrl() {
        final StringBuilder silUrlBuilder = new StringBuilder();
        silUrlBuilder.append("https://").append(this.getTarget());
        if (this.getPort() != 80) {
            silUrlBuilder.append(":").append(this.getPort());
        }
        silUrlBuilder.append("/radiodns/spi/3.1/SI.xml");
        return silUrlBuilder.toString();
    }

    protected String createEpgPiUrl(final String dateString) {
        final StringBuilder pilUrlBuilder = new StringBuilder();
        pilUrlBuilder.append("https://").append(this.getTarget());
        if (this.getPort() != 80) {
            pilUrlBuilder.append(":").append(this.getPort());
        }
        pilUrlBuilder.append("/radiodns/spi/3.1/").append(this.getServiceIdentifier()).append("/");
        pilUrlBuilder.append(dateString);
        pilUrlBuilder.append("_PI.xml");
        return pilUrlBuilder.toString();
    }
}
