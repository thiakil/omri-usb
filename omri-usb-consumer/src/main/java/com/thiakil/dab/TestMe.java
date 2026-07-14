package com.thiakil.dab;

import com.thiakil.standin.Context;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.freedesktop.gstreamer.Gst;
import org.omri.radio.Radio;
import org.omri.radio.impl.DabAudioDecoder;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceListener;
import org.omri.radioservice.RadioServiceMimeType;
import org.omri.radioservice.RadioServiceRawAudiodataListener;
import org.omri.radioservice.metadata.Textual;
import org.omri.radioservice.metadata.TextualDabDynamicLabel;
import org.omri.radioservice.metadata.TextualDabDynamicLabelPlusItem;
import org.omri.radioservice.metadata.TextualMetadataListener;
import org.omri.radioservice.metadata.Visual;
import org.omri.radioservice.metadata.VisualDabSlideShow;
import org.omri.radioservice.metadata.VisualMetadataListener;
import org.omri.tuner.ReceptionQuality;
import org.omri.tuner.Tuner;
import org.omri.tuner.TunerListener;
import org.omri.tuner.TunerStatus;

public class TestMe {
    private static final Logger LOGGER = LogManager.getLogger();

    public static void main(String[] args) throws IOException {
        Gst.init();
        Radio instance = Radio.getInstance();
        instance.initialize(new Context(), null);
        List<Tuner> availableTuners = instance.getAvailableTuners();
        OutputStream audioData = null;//new BufferedOutputStream(new FileOutputStream("raw_aac.adts"));
        LOGGER.info("Found {} tuners", availableTuners.size());
        for (Tuner tuner : availableTuners) {
            tuner.subscribe(new TunerListener() {

                @Override
                public void tunerStatusChanged(Tuner tuner, TunerStatus newStatus) {
                    LOGGER.info("Tuner status changed: {}", newStatus.getStatusDescription());
                    if (newStatus == TunerStatus.TUNER_STATUS_INITIALIZED) {
                        if (tuner.getRadioServices().isEmpty()) {
                            LOGGER.info("No services found, scanning");
                            tuner.startRadioServiceScan();
                        } else {
                            RadioService radioService = tuner.getRadioServices().stream()
                                  //Nova
                                  .filter(it -> it instanceof RadioServiceDab dab && dab.getServiceId() == 4146)
                                  //.filter(it -> it instanceof RadioServiceDab dab && dab.getServiceId() == 13317)//JJJ
                                  .findFirst().orElseThrow();
                            radioService.subscribe(new LoggingRadioServiceListener());
                            if (audioData != null) {
                                radioService.subscribe(new AudioLoggerListener(audioData));
                            }
                            tuner.startRadioService(radioService);
                        }
                    }
                }

                @Override
                public void tunerScanStarted(Tuner tuner) {
                    LOGGER.info("Scan started");
                }

                @Override
                public void tunerScanProgress(Tuner tuner, int percentScanned, int frequencyHz) {
                    LOGGER.info("Scan progress: {}% Freq: {}khz", percentScanned, frequencyHz/1000.0);
                }

                @Override
                public void tunerScanFinished(Tuner tuner) {
                    LOGGER.info("Scan finished");
                }

                @Override
                public void tunerScanServiceFound(Tuner tuner, RadioService foundService) {
                    LOGGER.info("found service {}", foundService.getServiceLabel());
                }

                @Override
                public void radioServiceStarted(Tuner tuner, RadioService startedRadioService) {
                    LOGGER.info("Service stated: {}", startedRadioService.getServiceLabel());
                }

                @Override
                public void radioServiceStopped(Tuner tuner, RadioService stoppedRadioService) {

                }

                private boolean lastLock = false;
                private ReceptionQuality lastQuality = null;

                @Override
                public void tunerReceptionStatistics(Tuner tuner, boolean rfLock, ReceptionQuality quality, int rawValue) {
                    if (rfLock != lastLock || quality != lastQuality) {
                        lastLock = rfLock;
                        lastQuality = quality;
                        LOGGER.info("Reception stats - Lock: {}, quality: {}, rawValue: {}", rfLock, quality, rawValue);
                    }
                }

                @Override
                public void tunerRawData(Tuner tuner, byte[] data) {

                }

                @Override
                public void dabDateTime(Tuner tuner, Date dabDateTime) {
                    //LOGGER.info("Got dabtime: {}", dabDateTime.toInstant());
                }
            });
            tuner.initializeTuner();
            LOGGER.info("After init");
        }
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        boolean cont = true;
        while (cont) {
            try {
                String s = reader.readLine();
                if ("quit".equals(s)) {
                    cont = false;
                    LOGGER.info("quitting");
                }
            } catch (IOException e) {
                LOGGER.error(e);
            }
        }
        instance.deInitialize();
        Gst.quit();
        if (audioData != null) {
            audioData.close();
        }
    }

    private static class LoggingRadioServiceListener implements RadioServiceListener, TextualMetadataListener, VisualMetadataListener {

        @Override
        public void newTextualMetadata(Textual textualMetadata) {
            LOGGER.info("new text info: {}", textualMetadata.getText());
            if (textualMetadata instanceof TextualDabDynamicLabel dabLabel) {
                LOGGER.info("tags: {}, itemRunning: {}, itemToggled: {}", dabLabel.getTagCount(), dabLabel.itemRunning(), dabLabel.itemToggled());
                if (dabLabel.hasTags()) {
                    for (TextualDabDynamicLabelPlusItem dlPlusItem : dabLabel.getDlPlusItems()) {
                        LOGGER.info("DL+ item - {}: {}", dlPlusItem.getDlPlusContentTypeDescription(), dlPlusItem.getDlPlusContentText());
                    }
                }
            }
            LOGGER.info("-------");
        }

        @Override
        public void newVisualMetadata(Visual visualMetadata) {
            LOGGER.info("new visual info: {} {}x{}", visualMetadata.getVisualMimeType(), visualMetadata.getVisualWidth(), visualMetadata.getVisualHeight());
            if (visualMetadata instanceof VisualDabSlideShow dabSlideShow) {
                LOGGER.info("isCategorised: {}, catText: {}, name: {}, id: {}, contentType: {}, contentSub: {}", dabSlideShow.isCategorized(), dabSlideShow.getCategoryText(), dabSlideShow.getContentName(), dabSlideShow.getSlideId(), dabSlideShow.getContentType(), dabSlideShow.getContentSubType());
                if (dabSlideShow.isCategorized()) {
                    LOGGER.info("Category: {}, link: {}", dabSlideShow.getCategoryText(), dabSlideShow.getLink());
                }
            }
            LOGGER.info("-------");
        }
    }

    private static class AudioLoggerListener implements RadioServiceRawAudiodataListener {
        private final OutputStream os;

        private AudioLoggerListener(OutputStream os) {
            this.os = os;
        }

        @Override
        public void rawAudioData(byte[] rawData, boolean sbr, boolean ps, RadioServiceMimeType type, int numChannels, int samplingRate) {
            try {
                os.write(rawData);
            } catch (IOException e) {
                LOGGER.error(e);
            }
        }
    }
}
