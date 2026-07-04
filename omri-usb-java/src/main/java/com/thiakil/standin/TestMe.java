package com.thiakil.standin;

import java.util.List;
import org.omri.radio.Radio;
import org.omri.radioservice.RadioService;
import org.omri.tuner.ReceptionQuality;
import org.omri.tuner.Tuner;
import org.omri.tuner.TunerListener;
import org.omri.tuner.TunerStatus;

public class TestMe {

    public static void main(String[] args) {
        Radio instance = Radio.getInstance();
        instance.initialize(new Context());
        List<Tuner> availableTuners = instance.getAvailableTuners();
        System.out.println("Found "+availableTuners.size()+" tuners");
        for (Tuner tuner : availableTuners) {
            tuner.subscribe(new TunerListener() {
                @Override
                public void tunerStatusChanged(Tuner tuner, TunerStatus newStatus) {
                    System.out.println("Tuner status changed: "+newStatus.getStatusDescription());
                }

                @Override
                public void tunerScanStarted(Tuner tuner) {
                    System.out.println("Scan started");
                }

                @Override
                public void tunerScanProgress(Tuner tuner, int percentScanned) {
                    System.out.println("Scan progress: "+percentScanned);
                }

                @Override
                public void tunerScanFinished(Tuner tuner) {
                    System.out.println("Scan finished");
                }

                @Override
                public void tunerScanServiceFound(Tuner tuner, RadioService foundService) {
                    System.out.println("found service "+foundService.getServiceLabel());
                }

                @Override
                public void radioServiceStarted(Tuner tuner, RadioService startedRadioService) {

                }

                @Override
                public void radioServiceStopped(Tuner tuner, RadioService stoppedRadioService) {

                }

                @Override
                public void tunerReceptionStatistics(Tuner tuner, boolean rfLock, ReceptionQuality quality) {

                }

                @Override
                public void tunerRawData(Tuner tuner, byte[] data) {

                }
            });
            tuner.initializeTuner();
            System.out.println("After init");
        }
        while (true) {
            try {
                System.out.println("waiting");
                Thread.sleep(10000);
            } catch (InterruptedException e) {

            }
        }
    }
}
