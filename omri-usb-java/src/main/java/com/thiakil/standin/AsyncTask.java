package com.thiakil.standin;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public abstract class AsyncTask<A,B,C> implements Runnable {

    private static final ExecutorService EXECUTOR_SERVICE = Executors.newCachedThreadPool();

    abstract protected A doInBackground(B params);

    abstract protected void onPostExecute(C param);

    @Override
    public void run() {
        doInBackground(null);
        onPostExecute(null);
    }

    public final void execute() {
        EXECUTOR_SERVICE.execute(this);
    }
}
