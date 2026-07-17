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

#include <iostream>

#include "jni-helper.h"
#include "jtunerusbdevice.h"

#include "jenny/proxy/RadioServiceDabComponentImplProxy.h"
#include "jenny/proxy/RadioServiceDabImplProxy.h"
#include "jenny/proxy/RadioServiceDabNativeProxy.h"
#include "jenny/proxy/RadioServiceImplProxy.h"
#include "jenny/proxy/TunerUsbProxy.h"

using jenny::LocalRef;

JTunerUsbDevice::JTunerUsbDevice(JavaVM* javaVm, JNIEnv* env, jobject tunerUsbDevice, libusb_device* device) : JUsbDevice(device), m_usbTunerObject(tunerUsbDevice) {
    std::cout << m_logTag << "Creating JTuner" << std::endl;

    m_javaVm = javaVm;
}

JTunerUsbDevice::~JTunerUsbDevice() {

}

void JTunerUsbDevice::setJavaClassDabServiceComponent(JNIEnv *env, jclass dabServiceComponentClass) {
    //local reference from GlobalRef in OnLoad

}

void JTunerUsbDevice::setJavaClassDabServiceUserApplication(JNIEnv *env, jclass dabServiceUserAppClass) {
    //local reference from GlobalRef in OnLoad
    m_dabServiceUserApplicationClass = dabServiceUserAppClass;

    m_dabServiceUserApplicationConstructorMId = env->GetMethodID(m_dabServiceUserApplicationClass, "<init>", "()V");
    m_dabServiceUserApplicationSetAppTypeMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setUserApplicationType", "(I)V");
    m_dabServiceUserApplicationSetIsCaAppliedMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setIsCaProtected", "(Z)V");
    m_dabServiceUserApplicationSetCaOrgMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setCaOrganization", "(I)V");
    m_dabServiceUserApplicationSetIsXPadMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setIsXpadApptype", "(Z)V");
    m_dabServiceUserApplicationSetXPadAppTypeMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setXpadApptype", "(I)V");
    m_dabServiceUserApplicationSetIsDgUsedMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setIsDatagroupsUsed", "(Z)V");
    m_dabServiceUserApplicationSetDSCTyMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setDSCTy", "(I)V");
    m_dabServiceUserApplicationSetUappDataMId = env->GetMethodID(m_dabServiceUserApplicationClass, "setUappdata", "([B)V");
}

void JTunerUsbDevice::callCallback(TUNER_CALLBACK_TYPE callbackType) {
    std::cout << m_logTag << "Calling tuner callback: " << +callbackType << std::endl;

    jenny::Env jEnv;
    TunerUsbProxy::callBack(jEnv.get(), m_usbTunerObject.get(), callbackType);
}

void JTunerUsbDevice::scanProgress(int percentDone, int freqHz) {
    std::cout << m_logTag << "scanProgress: " << +percentDone << "%, freq "
        << +(freqHz/1000) << " kHz" << std::endl;

    jenny::Env jEnv;
    TunerUsbProxy::scanProgressCallback(jEnv.get(), m_usbTunerObject.get(), percentDone, freqHz);
}

void JTunerUsbDevice::ensembleReady(DabEnsemble& ensemble) {
    std::stringstream logStr;
    logStr << m_logTag << " Ensemble ready: " << +ensemble.getDabServices().size()
        << " services, EId: " << std::hex << +ensemble.getEnsembleId() << std::dec << std::endl;
    std::cout << logStr.rdbuf() << std::endl;

    m_dabTimeCallback = ensemble.registerDateTimeCallback(
                std::bind(&JTunerUsbDevice::dabTimeUpdate, this, std::placeholders::_1));

    jenny::Env env;
    JNIEnv* enve = env.get();

    LocalRef<jstring> ensembleLabel = jenny::toJavaString(enve,
                                                        ensemble.getEnsembleLabel().c_str());
    LocalRef<jstring> ensembleShortLabel = jenny::toJavaString(enve,
                                                            ensemble.getEnsembleShortLabel().c_str());

    for(const auto& srv : ensemble.getDabServices()) {
        std::cout << m_logTag << " Scan service: " << srv->getServiceLabel() << std::endl;
        const jint sid = (jint) srv->getServiceId();
        LocalRef<jobject> dabServiceObject(RadioServiceDabImplProxy::newInstance(enve));
        const jint ecc = (jint) ensemble.getEnsembleEcc();
        RadioServiceDabNativeProxy::setEnsembleEcc(enve, dabServiceObject.get(), ecc);
        const jint eid = (jint) ensemble.getEnsembleId();
        RadioServiceDabNativeProxy::setEnsembleId(enve, dabServiceObject.get(), eid);
        RadioServiceDabNativeProxy::setEnsembleLabel(enve, dabServiceObject.get(), ensembleLabel.get());
        RadioServiceDabNativeProxy::setEnsembleShortLabel(enve, dabServiceObject.get(), ensembleShortLabel.get());
        const jint freq = (jint) srv->getEnsembleFrequency();
        RadioServiceDabNativeProxy::setEnsembleFrequency(enve, dabServiceObject.get(), freq);
        if(srv->isCaApplied()) {
            RadioServiceDabNativeProxy::setIsCaProtected(enve, dabServiceObject.get(), JNI_TRUE);
        } else {
            RadioServiceDabNativeProxy::setIsCaProtected(enve, dabServiceObject.get(), JNI_FALSE);
        }
        const jint caId = (jint) srv->getCaId();
        RadioServiceDabNativeProxy::setCaId(enve, dabServiceObject.get(), caId);

        LocalRef<jstring> dabServiceLabel = jenny::toJavaString(enve, srv->getServiceLabel().c_str());
        LocalRef<jstring> dabServiceShortLabel = jenny::toJavaString(enve, srv->getServiceShortLabel().c_str());

        RadioServiceDabNativeProxy::setServiceLabel(env.get(), dabServiceObject.get(), dabServiceLabel.get());
        RadioServiceDabNativeProxy::setShortLabel(env.get(), dabServiceObject.get(), dabServiceShortLabel.get());

        RadioServiceDabNativeProxy::setServiceId(env.get(), dabServiceObject.get(), sid);

        if(srv->hasAudioServiceComponent()) {
            RadioServiceDabNativeProxy::setIsProgrammeService(env.get(), dabServiceObject.get(), JNI_TRUE);
        } else {
            RadioServiceDabNativeProxy::setIsProgrammeService(env.get(), dabServiceObject.get(), JNI_FALSE);
        }

        LocalRef<jstring> genrePty = jenny::toJavaString(enve, srv->getProgrammeTypeFullName().c_str());

        RadioServiceImplProxy::addGenre(env.get(), dabServiceObject.get(), genrePty.get());

        //DABServiceComponent creation
        for(const auto& srvComp : srv->getServiceComponents()) {
            LocalRef<jobject> dabServiceComponentObject(RadioServiceDabComponentImplProxy::newInstance(enve));
            const jint subChannelId = (jint) srvComp->getSubChannelId();
            const jint bitrate = (jint) srvComp->getSubchannelBitrate();
            const jint mscStartAddress = (jint) srvComp->getMscStartAddress();
            const jint subChannelSize = (jint) srvComp->getSubchannelSize();
            const jint protectionLevel = (jint) srvComp->getProtectionLevel();
            const jint protectionType = (jint) srvComp->getProtectionType();
            const jint uepTableIndex = (jint) srvComp->getUepTableIndex();

            RadioServiceDabComponentImplProxy::setScBitrate(env.get(), dabServiceComponentObject.get(),  bitrate);
            //RadioServiceDabComponentImplProxy::setCaFlag(env.get(), dabServiceComponentObject.get(),  static_cast<jboolean>(srvComp->isCaApplied()));
            if(srvComp->isCaApplied() > 0) {
                RadioServiceDabComponentImplProxy::setIsScCaFlagSet(env.get(), dabServiceComponentObject.get(),  JNI_TRUE);
            } else {
                RadioServiceDabComponentImplProxy::setIsScCaFlagSet(env.get(), dabServiceComponentObject.get(),  JNI_FALSE);
            }

            RadioServiceDabComponentImplProxy::setServiceId(env.get(), dabServiceComponentObject.get(),  sid);

            RadioServiceDabComponentImplProxy::setSubchannelId(env.get(), dabServiceComponentObject.get(),  subChannelId);

            {
                LocalRef<jstring> dabServiceComponentLabel;
                dabServiceComponentLabel = jenny::toJavaString(enve, srvComp->getServiceComponentLabel().c_str());
                RadioServiceDabComponentImplProxy::setScLabel(env.get(), dabServiceComponentObject.get(),  dabServiceComponentLabel.get());
            }

            jint packetAddress;
            jint tmId;
            jint serviceComponentType;
            jboolean dgUsed;
            switch(srvComp->getServiceComponentType()) {
                case DabServiceComponent::SERVICECOMPONENTTYPE::MSC_STREAM_AUDIO: {
                    auto audioComp = std::static_pointer_cast<DabServiceComponentMscStreamAudio>(srvComp);
                    serviceComponentType = (jint)audioComp->getAudioServiceComponentType();
                    packetAddress = -1;
                    tmId = 0;
                    dgUsed = 0;
                    break;
                }
                case DabServiceComponent::SERVICECOMPONENTTYPE::MSC_STREAM_DATA: {
                    packetAddress = -1;
                    tmId = 1;
                    serviceComponentType = -1;
                    dgUsed = 0;
                    break;
                }
                case DabServiceComponent::SERVICECOMPONENTTYPE::MSC_PACKET_MODE_DATA: {
                    auto packetComp = std::static_pointer_cast<DabServiceComponentMscPacketData>(srvComp);
                    packetAddress = (jint)packetComp->getPacketAddress();
                    serviceComponentType = (jint)packetComp->getDataServiceComponentType();
                    dgUsed = packetComp->isDataGroupTransportUsed() ? 1 : 0;
                    tmId = 3;
                    break;
                }
                default: {
                    packetAddress = -1;
                    serviceComponentType = -1;
                    tmId = 2;
                    dgUsed = JNI_FALSE;
                    break;
                }
            }

            RadioServiceDabComponentImplProxy::setPacketAddress(env.get(), dabServiceComponentObject.get(),  packetAddress);
            RadioServiceDabComponentImplProxy::setDatagroupTransportUsed(env.get(), dabServiceComponentObject.get(),  dgUsed);
            if(srvComp->isPrimary()) {
                RadioServiceDabComponentImplProxy::setIsScPrimary(env.get(), dabServiceComponentObject.get(),  JNI_TRUE);
            } else {
                RadioServiceDabComponentImplProxy::setIsScPrimary(env.get(), dabServiceComponentObject.get(),  JNI_FALSE);
            }

            const jint scIdS = (jint)srvComp->getServiceComponentIdWithinService();
            RadioServiceDabComponentImplProxy::setServiceComponentIdWithinService(env.get(), dabServiceComponentObject.get(), scIdS);
            RadioServiceDabComponentImplProxy::setDatagroupTransportUsed(env.get(), dabServiceComponentObject.get(),  tmId);
            RadioServiceDabComponentImplProxy::setMscStartAddress(env.get(), dabServiceComponentObject.get(),  mscStartAddress);
            RadioServiceDabComponentImplProxy::setSubchannelSize(env.get(), dabServiceComponentObject.get(),  subChannelSize);
            RadioServiceDabComponentImplProxy::setProtectionLevel(env.get(), dabServiceComponentObject.get(),  protectionLevel);
            RadioServiceDabComponentImplProxy::setProtectionType(env.get(), dabServiceComponentObject.get(),  protectionType);
            RadioServiceDabComponentImplProxy::setUepTableIndex(env.get(), dabServiceComponentObject.get(),  uepTableIndex);
            if(srvComp->isFecSchemeApplied()) {
                RadioServiceDabComponentImplProxy::setIsFecSchemeApplied(env.get(), dabServiceComponentObject.get(),  JNI_TRUE);
            } else {
                RadioServiceDabComponentImplProxy::setIsFecSchemeApplied(env.get(), dabServiceComponentObject.get(),  JNI_FALSE);
            }

            RadioServiceDabComponentImplProxy::setServiceComponentType(env.get(), dabServiceComponentObject.get(),  serviceComponentType);

            //DABUserApplication creation
            for(const auto& uApp : srvComp->getUserApplications()) {
                if(uApp.getUserApplicationType() == registeredtables::USERAPPLICATIONTYPE::DYNAMIC_LABEL) {
                    std::cout << m_logTag << "Filtering DLS Userapplication" << std::endl;
                    continue;
                }
                const jint uAppType = (jint) uApp.getUserApplicationType();
                const jint caOrg = (jint) uApp.getCaOrganization();
                const jint xPadAppType = (jint) uApp.getXpadAppType();
                const jint dataServiceComponentType = (jint) uApp.getDataServiceComponentType();

                jobject dabServiceUserApplicationObject = enve->NewObject(m_dabServiceUserApplicationClass, m_dabServiceUserApplicationConstructorMId);
                enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetAppTypeMId, uAppType);
                if(uApp.isCaApplied()) {
                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetIsCaAppliedMId, JNI_TRUE);
                } else {
                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetIsCaAppliedMId, JNI_FALSE);
                }

                enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetCaOrgMId, caOrg);
                if(uApp.isXpadApp()) {
                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetIsXPadMId, JNI_TRUE);
                } else {
                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetIsXPadMId, JNI_FALSE);
                }

                enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetXPadAppTypeMId, xPadAppType);

                if(uApp.dataGroupsUsed()) {
                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetIsDgUsedMId, JNI_TRUE);
                } else {
                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetIsDgUsedMId, JNI_FALSE);
                }

                enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetDSCTyMId, dataServiceComponentType);

                if(!uApp.getUserApplicationData().empty()) {
                    jbyteArray uAppData = enve->NewByteArray(uApp.getUserApplicationData().size());
                    enve->SetByteArrayRegion(uAppData, 0, uApp.getUserApplicationData().size(), (jbyte*)uApp.getUserApplicationData().data());

                    enve->CallVoidMethod(dabServiceUserApplicationObject, m_dabServiceUserApplicationSetUappDataMId, uAppData);
                    enve->DeleteLocalRef(uAppData);
                }

                //Add Userapplication to DabServiceComponent
                RadioServiceDabComponentImplProxy::addScUserApplication(env.get(), dabServiceComponentObject.get(),  dabServiceUserApplicationObject);

                enve->DeleteLocalRef(dabServiceUserApplicationObject);
            }
            //DABUserApplication creation END

            //Add DabServiceComponent to DabService
            RadioServiceDabNativeProxy::addServiceComponent(env.get(), dabServiceObject.get(), dabServiceComponentObject.get());
        }
        //DABServiceComponent creation END

        TunerUsbProxy::serviceFound(enve, m_usbTunerObject.get(), dabServiceObject.get());
    }
}

void JTunerUsbDevice::serviceStarted(jobject dabService) {
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThreadAsDaemon((void**)&enve, nullptr) == 0) {
        } else {
            std::fprintf(stderr, "jniEnv thread failed to attach!\n");
            return;
        }
    }

    TunerUsbProxy::serviceStarted(enve, m_usbTunerObject.get(), dabService);
}

void JTunerUsbDevice::serviceStopped(jobject dabService) {
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThreadAsDaemon((void**)&enve, nullptr) == 0) {
        } else {
            std::fprintf(stderr, "jniEnv thread failed to attach!\n");
            return;
        }
    }

    TunerUsbProxy::serviceStopped(enve, m_usbTunerObject.get(), dabService);
}

void JTunerUsbDevice::receptionStatistics(bool rfLock, int level, int rawValue) {
    JNIEnv* enve;

    if(m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6) == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThreadAsDaemon((void**)&enve, nullptr) == 0) {
        } else {
            std::fprintf(stderr, "jniEnv thread failed to attach!\n");
            return;
        }
    }

    TunerUsbProxy::receptionStatistics(enve, m_usbTunerObject.get(), rfLock, level, rawValue);
}

void JTunerUsbDevice::dabTimeUpdate(const Fig_00_Ext_10::DabTime& dabTime) {
    if (m_lastDabTimeEpoch == dabTime.unixEpoch) { // seconds since 1900-01-01 00:00
        // rate-limit to only once per second
        return;
    }
    m_lastDabTimeEpoch = dabTime.unixEpoch;
    // Java Date(long) constructor requires milliseconds
    auto t = dabTime.unixEpoch * 1000L;
    t += dabTime.milliseconds;

    JNIEnv* enve;
    if(m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6) == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThreadAsDaemon((void**)&enve, nullptr) == 0) {
        } else {
            std::fprintf(stderr, "jniEnv thread failed to attach!\n");
            return;
        }
    }

    TunerUsbProxy::dabTimeUpdateEpoch(enve, m_usbTunerObject.get(), t);

}
