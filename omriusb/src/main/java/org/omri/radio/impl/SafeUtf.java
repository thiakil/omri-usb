package org.omri.radio.impl;

import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * Copyright (C) 2023 realzoulou
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author realzoulou
 */

public class SafeUtf {
    private static final String LOGTAG = "SafeUtf";

    /**
     * Converts a byte array holding a C-style string in unknown encoding safely to a Java string.
     * This method may result in unexpected characters if encoding of byte array was actually not
     * following any standard.
     * @param bArr byte array
     * @return Java string, potentially an empty string if encoding is unknown
     */
    public static String convertCStringToJniStringSafe(byte[] bArr) {
        if (bArr == null) return ""; // safely handling null pointer
        if (bArr.length == 0) return ""; // safely handling empty buffer

        String resultStr = null;
        final ByteBuffer bb = ByteBuffer.wrap(bArr);
        final StringBuilder logStrBuilder = new StringBuilder(Arrays.toString(bArr));
        try {
            resultStr = String.valueOf(StandardCharsets.UTF_8.decode(bb));
        } catch (Throwable e) {
            logStrBuilder.append(" not ").append(StandardCharsets.UTF_8);
        }
        if (resultStr == null) {
            Log.w(LOGTAG, logStrBuilder.toString());
            return ""; // empty string is safe harbor after all attempts to convert failed
        }
        return resultStr;
    }
}
