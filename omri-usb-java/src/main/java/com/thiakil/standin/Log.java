package com.thiakil.standin;

public class Log {
    public static void d(String tag, String message) {
        printLog("debug", tag, message);
    }
    public static void i(String tag, String message) {
        printLog("info", tag, message);
    }
    public static void w(String tag, String message) {
        printLog("warn", tag, message);
    }
    public static void e(String tag, String message) {
        printLog("error", tag, message);
    }

    private static void printLog(String level, String tag, String message) {
        System.out.print("[");
        System.out.print(level);
        System.out.print("]");
        System.out.print(tag);
        System.out.print(": ");
        System.out.println(message);
    }
}
