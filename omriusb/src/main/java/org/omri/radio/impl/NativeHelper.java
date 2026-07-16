package org.omri.radio.impl;

import io.github.landerlyoung.jenny.NativeMethodProxy;
import io.github.landerlyoung.jenny.NativeProxy;
import io.github.landerlyoung.jenny.NativeProxyForClasses;
import java.util.ArrayList;
import java.util.List;

@NativeProxy
public class NativeHelper {
    @NativeMethodProxy
    public static <T> List<T> newList(int size) {
        return new ArrayList<>(size);
    }

    @NativeMethodProxy
    public static <T> void listAdd(List<T> list, T toAdd) {
        list.add(toAdd);
    }

}
