package com.thiakil.nativebridge;

import io.github.landerlyoung.jenny.NativeMethodProxy;
import io.github.landerlyoung.jenny.NativeProxy;
import java.util.HashMap;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SuppressWarnings("unused")//used in native
@NativeProxy
public class Log4jBridge {
    private static final Map<String, Logger> loggers = new HashMap<>();

    private static Logger getLogger(String tag) {
        return loggers.computeIfAbsent(tag, Log4jBridge::trimTag);
    }

    private static Logger trimTag(String raw) {
        if (raw.startsWith("[") && raw.endsWith("]")) {
            raw = raw.substring(1, raw.length()-1);
        }
        return LogManager.getLogger(raw);
    }

    // Methods used in native
    @NativeMethodProxy
    public static void logTrace(String tag, String message) {
        getLogger(tag).trace(message.trim());
    }
    @NativeMethodProxy
    public static void logDebug(String tag, String message) {
        getLogger(tag).debug(message.trim());
    }
    @NativeMethodProxy
    public static void logInfo(String tag, String message) {
        getLogger(tag).info(message.trim());
    }
    @NativeMethodProxy
    public static void logWarn(String tag, String message) {
        getLogger(tag).warn(message.trim());
    }
    @NativeMethodProxy
    public static void logError(String tag, String message) {
        getLogger(tag).error(message.trim());
    }
}
