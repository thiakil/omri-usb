/*
 * Copyright (C) 2020 realzoulou
 *
 * Author:
 *  realzoulou
 *
 * This file is a part of IRT DAB library.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

#include <jni.h>

#ifndef DAB_JNI_HELPER_H
#define DAB_JNI_HELPER_H

extern "C" {

bool JNI_ATTACH_ENV(JavaVM * javaVmPtr, bool & wasDetached, JNIEnv* * jniEnvPtr);
inline bool JNI_ATTACH(JavaVM *javaVmPtr, bool &wasDetached) {
    return JNI_ATTACH_ENV(javaVmPtr, wasDetached, nullptr);
}
bool JNI_DETACH(JavaVM *javaVmPtr, bool wasDetached);
#ifndef __STDC_NO_THREADS__
void JNI_TSS_DTOR(void*);
#endif
/**
 * Convert a C-style string to JNI string.
 * Use as a safe replacement for NewStringUTF, which crashes the VM if array of characters is not
 * in Modified UTF-8 encoding.
 * In contrast to NewStringUTF, there is no need to call DeleteLocalRef on the returned JNI string.
 * @param env JNI interface pointer
 * @param cStr pointer to array of characters in whatever encoding
 * @param cStrSize array size
 * @return valid JNI string, potentially an empty string if encoding is unknown
 */
jstring getSafeJniStringFromCString(JNIEnv *env, const char *cStr, const size_t cStrSize);
}
#endif //DAB_JNI_HELPER_H
