package com.thiakil.standin;

import java.util.List;
import org.omri.radio.Radio;
import org.omri.tuner.Tuner;

public class TestMe {

    public static void main(String[] args) {
        Radio instance = Radio.getInstance();
        instance.initialize(new Context());
        List<Tuner> availableTuners = instance.getAvailableTuners();
        System.out.println("Found "+availableTuners.size()+" tuners");
        for (Tuner tuner : availableTuners) {
            tuner.initializeTuner();
        }
    }
}
