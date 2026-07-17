package org.omri.radio.impl;

import io.github.landerlyoung.jenny.NativeMethodProxy;
import io.github.landerlyoung.jenny.NativeProxy;

@NativeProxy
public class RadioServiceDemo extends RadioServiceDabImpl {
    private final String filePath;

    public RadioServiceDemo(String filePath) {
        this.filePath = filePath;
    }

    @NativeMethodProxy
    public String filePath() {
        return filePath;
    }
}
