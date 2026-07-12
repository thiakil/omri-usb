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

//todo make win32 compatible?
#if defined(__STDC_NO_THREADS__) || defined(WIN32)
#define NO_THREADS_JNI 1
#endif

#ifndef NO_THREADS_JNI
#include <iostream>
#include <sstream>
#include <thread>
#include <threads.h>
#include <sys/prctl.h>
#include <unistd.h>

thread_local tss_t tss_key;
#elif defined(__STDC_NO_THREADS__)
#warning __STDC_NO_THREADS__ is defined
#endif
#include "jni-helper.h"

bool JNI_ATTACH_ENV(JavaVM * javaVmPtr, bool & wasDetached, JNIEnv* * jniEnvPtr) {
    if (javaVmPtr != nullptr) {
        wasDetached = false;
        JNIEnv *enve;
        int envState = javaVmPtr->GetEnv((void **) &enve, JNI_VERSION_1_6);
        if (envState == JNI_EDETACHED) {
            if (javaVmPtr->AttachCurrentThread((void **) &enve, nullptr) == JNI_OK) {
                wasDetached = true;
#ifndef NO_THREADS_JNI
                /** store JavaVM ptr in thread local storage
                 *  see https://developer.android.com/training/articles/perf-jni
                 */
                int rc = tss_create(&tss_key, JNI_TSS_DTOR);
                if (thrd_success == rc) {
                    tss_set(tss_key, javaVmPtr);
                }
#endif // NO_THREADS_JNI
            } else {
                return false;
            }
        }
        if (jniEnvPtr != nullptr) {
            envState = javaVmPtr->GetEnv((void **) &enve, JNI_VERSION_1_6);
            if (envState == JNI_OK) {
                *jniEnvPtr = enve;
            }
        }
        return true;
    }
    return false;
}

bool JNI_DETACH(JavaVM * javaVmPtr, bool wasDetached) {
    if (wasDetached) {
        if (javaVmPtr != nullptr) {
            if (javaVmPtr->DetachCurrentThread() == 0) {
#ifndef NO_THREADS_JNI
                tss_delete(tss_key);
#endif
                return true;
            }
        }
        return false;
    }
    return true;
}

#ifndef NO_THREADS_JNI
/**
 * @see https://developer.android.com/training/articles/perf-jni
 */
void JNI_TSS_DTOR(void* key) {
    auto javaVmPtr = static_cast<JavaVM*>(key);
    if (javaVmPtr != nullptr) {
        JNIEnv *enve;
        int state = javaVmPtr->GetEnv((void **) &enve, JNI_VERSION_1_6);
        if (state != JNI_EDETACHED) {
            std::stringstream log;
            auto tid = gettid();
            const size_t NAME_LEN = 32; // min. 16 char according to prctl(2)
            char thread_name[NAME_LEN];
            if (-1 == prctl(PR_GET_NAME, thread_name)) { // on success, returns null-terminated string
                // failure, clear buffer
                thread_name[0] = '\0';
            }
            log << "tid '" << thread_name << "' (" << std::dec << +tid << ") was not detached";
            std::clog << log.rdbuf() << std::endl;
        }
        javaVmPtr->DetachCurrentThread(); // last chance to detach, otherwise VM may crash
        tss_delete(tss_key); // likely superfluous because thread is about to be terminated
    }
}
#endif
