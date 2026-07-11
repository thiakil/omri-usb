package org.omri.radio.impl;

import static org.junit.Assert.assertEquals;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.junit.MockitoJUnitRunner;

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

@RunWith(MockitoJUnitRunner.class)

@FixMethodOrder(MethodSorters.NAME_ASCENDING)

// Unit tests for class SafeUtf

public class UtSafeUtfTestCase {
    @Test
    public void t01_Ascii_cString() {
        final byte[] input = {'O', 'M', 'R', 'I'};
        assertEquals("OMRI", SafeUtf.convertCStringToJniStringSafe(input));
    }
    @Test
    public void t02_UTF8_valid() {
        final byte[] input = { 0x48, (byte) 0xc3, (byte) 0xb6, 0x72, 0x73, 0x70, 0x69, 0x65, 0x6c };
        assertEquals("Hörspiel", SafeUtf.convertCStringToJniStringSafe(input));
    }

    @Test
    public void t03_UTF8_invalid() {
        // This byte sequence is the root cause for SafeUtf class (i.e. a VM crash in NewStringUTF)
        final byte[] input = {
                0x48, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0xc3, (byte) 0xff, (byte) 0xff,
                (byte) 0xff, (byte) 0xb6, 0x72, 0x73, 0x70, 0x69, 0x65, 0x6c
        };
        assertEquals("H��������rspiel", SafeUtf.convertCStringToJniStringSafe(input));
    }
}
