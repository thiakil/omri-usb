/*
 * Copyright (C) 2018 IRT GmbH
 *
 * Author:
 *  Fabian Sattler
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

#ifndef JTUNERUSBDEVICE_H
#define JTUNERUSBDEVICE_H

#include <ctime>
#include "jusbdevice.h"
#include "../../dabensemble.h"
#include "jenny/proxy/jnihelper.h"

class JTunerUsbDevice : public JUsbDevice {

public:
    // Must match with org.omri.radio.impl.TunerUsbCallbackTypes
    enum TUNER_CALLBACK_TYPE {
        TUNER_CALLBACK_READY = 0,
        TUNER_CALLBACK_FAILED = 1,
        TUNER_SCAN_IN_PROGRESS = 4
    };

public:
    explicit JTunerUsbDevice(JavaVM* javaVm, JNIEnv* env, jobject tunerUsbDevice, libusb_device* device);
    virtual ~JTunerUsbDevice();

    virtual void callCallback(TUNER_CALLBACK_TYPE callbackType);
    virtual void scanProgress(int percentDone, int freqHz);
    virtual void ensembleReady(DabEnsemble& ensemble);
    virtual void dabTimeUpdate(const Fig_00_Ext_10::DabTime &dabTime);
    virtual void serviceStarted(jobject dabService);
    virtual void serviceStopped(jobject dabService);
    virtual void receptionStatistics(bool rfLock, int level, int rawValue);

    virtual void setJavaClassDabServiceComponent(JNIEnv* env, jclass dabServiceComponentClass);
    virtual void setJavaClassDabServiceUserApplication(JNIEnv* env, jclass dabServiceUserAppClass);

    virtual void setJavaClassDabTime(JNIEnv* env, jclass dabTimeClass);

private:
    const std::string m_logTag{"[JTunerUsbDevice] "};

private:
    JavaVM* m_javaVm;

    //The existing Tuner object reference
    jenny::GlobalRef<jobject> m_usbTunerObject;

    //DabServiceUserApplication
    jclass m_dabServiceUserApplicationClass{};
    jmethodID m_dabServiceUserApplicationConstructorMId{};
    jmethodID m_dabServiceUserApplicationSetAppTypeMId{};
    jmethodID m_dabServiceUserApplicationSetIsCaAppliedMId{};
    jmethodID m_dabServiceUserApplicationSetCaOrgMId{};
    jmethodID m_dabServiceUserApplicationSetIsXPadMId{};
    jmethodID m_dabServiceUserApplicationSetXPadAppTypeMId{};
    jmethodID m_dabServiceUserApplicationSetIsDgUsedMId{};
    jmethodID m_dabServiceUserApplicationSetDSCTyMId{};
    jmethodID m_dabServiceUserApplicationSetUappDataMId{};

    //DabTime
    jmethodID m_dabTimeUpdateMId{};
    jclass m_dabTimeClass{};
    jmethodID m_dabTimeConstructorMId{};
    std::shared_ptr<DabEnsemble::Date_Time_Callback> m_dabTimeCallback;
    std::time_t m_lastDabTimeEpoch{0};
};


#endif //JTUNERUSBDEVICE_H
