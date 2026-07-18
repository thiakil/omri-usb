package org.omri.radio.impl;

import io.github.landerlyoung.jenny.NativeProxy;
import java.util.ArrayList;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDabComponent;
import org.omri.radioservice.metadata.Textual;
import org.omri.radioservice.metadata.VisualDabSlideShow;

@NativeProxy(allMethods = true)
@SuppressWarnings("unused")
public interface RadioServiceDabNative {
    int getEnsembleEcc();
    int getEnsembleId();
    int getEnsembleFrequency();
    int getServiceId();
    void setEnsembleEcc(int ensembleEcc);
    void setEnsembleId(int ensembleId);
    void setEnsembleLabel(String ensembleLabel);
    void setEnsembleShortLabel(String ensembleShortLabel);
    void setEnsembleFrequency(int ensembleFreq);
    void setIsCaProtected(boolean ca);
    void setCaId(int caId);
    String getServiceLabel();
    void setServiceLabel(String srvLabel);
    void setShortLabel(String shortLabel);
    void setServiceId(int srvId);
    void setIsProgrammeService(boolean isProg);
    void addServiceComponent(RadioServiceDabComponent dabComp);
    //void addServiceComponent(List<RadioServiceDabComponent> dabComp);
    void addGenre(String genre);
    void slideshowReceived(VisualDabSlideShow slideShow);
    void labelReceived(Textual label);
    void audioData(final byte[] pcmData, final int channelCount, final int samplingRate);
    void serviceFollowingReceived(ArrayList<RadioService> sfServices);
    void audioFormatChanged(final int ascty, final int channelCount, final int samplingRate, final boolean sbrUsed, final boolean psUsed);

    static RadioServiceDabNative newInstance(){
        return new RadioServiceDabImpl();
    }
}
