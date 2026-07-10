package com.thiakil.standin;

import java.io.File;

public class Context {

    public File getExternalCacheDir() {
        throw new UnsupportedOperationException("TODO");
    }

    public File getFilesDir() {
        return new File("run");
    }

    public File getCacheDir() {
        throw new UnsupportedOperationException("TODO");
    }
}
