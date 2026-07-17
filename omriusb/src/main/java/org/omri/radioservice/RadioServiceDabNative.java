package org.omri.radioservice;

import io.github.landerlyoung.jenny.NativeProxy;
import java.util.List;

@NativeProxy(allMethods = true)
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
}
