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

JTunerUsbDevice::JTunerUsbDevice(JavaVM* javaVm, JNIEnv* env, jobject tunerUsbDevice)
    : JUsbDevice(javaVm, env,
                 env->CallObjectMethod(tunerUsbDevice,
                                       env->GetMethodID(
                                               env->FindClass("org/omri/radio/impl/TunerUsb"),
                                               "getUsbDevice",
                                               "()Landroid/hardware/usb/UsbDevice;"))) {
    std::cout << m_logTag << "Creating JTuner" << std::endl;

    m_javaVm = javaVm;

    m_usbTunerObject = env->NewGlobalRef(tunerUsbDevice);
}

JTunerUsbDevice::~JTunerUsbDevice() {
    JNIEnv* env;
    m_javaVm->GetEnv((void **)&env, JNI_VERSION_1_6);
    env->DeleteGlobalRef(m_usbTunerObject);
}

void JTunerUsbDevice::setJavaClassUsbTuner(JNIEnv* env, jclass usbTunerClass) {
    //local reference from GlobalRef in OnLoad
    m_usbTunerClass = usbTunerClass;

    m_usbTunerCallbackMId = env->GetMethodID(m_usbTunerClass, "callBack", "(I)V");
    m_usbTunerScanProgressMId = env->GetMethodID(m_usbTunerClass, "scanProgressCallback", "(II)V");
    m_usbTunerServiceFoundMId = env->GetMethodID(m_usbTunerClass, "serviceFound", "(Lorg/omri/radioservice/RadioServiceDab;)V");
    m_usbTunerServiceStartedMId = env->GetMethodID(m_usbTunerClass, "serviceStarted", "(Lorg/omri/radioservice/RadioServiceDab;)V");
    m_usbTunerServiceStoppedMId = env->GetMethodID(m_usbTunerClass, "serviceStopped", "(Lorg/omri/radioservice/RadioServiceDab;)V");
    m_usbTunerReceptionStatisticsMId = env->GetMethodID(m_usbTunerClass, "receptionStatistics", "(ZI)V");
    m_dabTimeUpdateMId = env->GetMethodID(m_usbTunerClass, "dabTimeUpdate", "(Ljava/util/Date;)V");
}

void JTunerUsbDevice::setJavaClassDabService(JNIEnv* env, jclass dabServiceClass) {
    //local reference from GlobalRef in OnLoad
    m_dabServiceClass = dabServiceClass;

    m_dabServiceConstructorMId = env->GetMethodID(m_dabServiceClass, "<init>", "()V");
    m_dabServiceSetEnsembleEccMId = env->GetMethodID(m_dabServiceClass, "setEnsembleEcc", "(I)V");
    m_dabServiceSetEnsembleIdMId = env->GetMethodID(m_dabServiceClass, "setEnsembleId", "(I)V");
    m_dabServiceSetEnsembleLabelMId = env->GetMethodID(m_dabServiceClass, "setEnsembleLabel", "(Ljava/lang/String;)V");
    m_dabServiceSetEnsembleShortLabelMId = env->GetMethodID(m_dabServiceClass, "setEnsembleShortLabel", "(Ljava/lang/String;)V");
    m_dabServiceSetIsCaAppliedMId = env->GetMethodID(m_dabServiceClass, "setIsCaProtected", "(Z)V");
    m_dabServiceSetCaIdMId = env->GetMethodID(m_dabServiceClass, "setCaId", "(I)V");
    m_dabServiceSetEnsembleFrequencyMId = env->GetMethodID(m_dabServiceClass, "setEnsembleFrequency", "(I)V");
    m_dabServiceSetServiceLabelMId = env->GetMethodID(m_dabServiceClass, "setServiceLabel", "(Ljava/lang/String;)V");
    m_dabServiceSetServiceShortLabelMId = env->GetMethodID(m_dabServiceClass, "setShortLabel", "(Ljava/lang/String;)V");
    m_dabServiceSetServiceIdMId = env->GetMethodID(m_dabServiceClass, "setServiceId", "(I)V");
    m_dabServiceSetServiceIsProgrammeMId = env->GetMethodID(m_dabServiceClass, "setIsProgrammeService", "(Z)V");
    m_dabServiceAddServiceComponentMId = env->GetMethodID(m_dabServiceClass, "addServiceComponent", "(Lorg/omri/radioservice/RadioServiceDabComponent;)V");

    m_dabServiceAddGenreTermIdMId = env->GetMethodID(m_dabServiceClass, "addGenre", "(Lorg/omri/radioservice/metadata/TermId;)V");
}

void JTunerUsbDevice::setJavaClassDabServiceComponent(JNIEnv *env, jclass dabServiceComponentClass) {
    //local reference from GlobalRef in OnLoad
    m_dabServiceComponentClass = dabServiceComponentClass;

    m_dabServiceComponentConstructorMId = env->GetMethodID(m_dabServiceComponentClass, "<init>", "()V");
    m_dabServiceComponentSetBitrateMId = env->GetMethodID(m_dabServiceComponentClass, "setScBitrate", "(I)V");
    m_dabServiceComponentSetCaFlagMId = env->GetMethodID(m_dabServiceComponentClass, "setIsScCaFlagSet", "(Z)V");
    m_dabServiceComponentSetServiceIdMId = env->GetMethodID(m_dabServiceComponentClass, "setServiceId", "(I)V");
    m_dabServiceComponentSetSubchannelIdMId = env->GetMethodID(m_dabServiceComponentClass, "setSubchannelId", "(I)V");
    m_dabServiceComponentSetLabelMId = env->GetMethodID(m_dabServiceComponentClass, "setScLabel", "(Ljava/lang/String;)V");
    m_dabServiceComponentSetPacketAddressMId = env->GetMethodID(m_dabServiceComponentClass, "setPacketAddress", "(I)V");
    m_dabServiceComponentSetIsPrimaryMId = env->GetMethodID(m_dabServiceComponentClass, "setIsScPrimary", "(Z)V");
    m_dabServiceComponentSetScIDsMId = env->GetMethodID(m_dabServiceComponentClass, "setServiceComponentIdWithinService", "(I)V");
    m_dabServiceComponentSetTransportModeIdMId = env->GetMethodID(m_dabServiceComponentClass, "setTmId", "(I)V");
    m_dabServiceComponentSetScTypeMId = env->GetMethodID(m_dabServiceComponentClass, "setServiceComponentType", "(I)V");
    m_dabServiceComponentSetIsDgUsedMId = env->GetMethodID(m_dabServiceComponentClass, "setDatagroupTransportUsed", "(Z)V");
    m_dabServiceComponentSetMscStartAddressMId = env->GetMethodID(m_dabServiceComponentClass, "setMscStartAddress", "(I)V");
    m_dabServiceComponentSetSubchanSizeMId = env->GetMethodID(m_dabServiceComponentClass, "setSubchannelSize", "(I)V");
    m_dabServiceComponentSetProtectionLvlMId = env->GetMethodID(m_dabServiceComponentClass, "setProtectionLevel", "(I)V");
    m_dabServiceComponentSetProtectionTypeMId = env->GetMethodID(m_dabServiceComponentClass, "setProtectionType", "(I)V");
    m_dabServiceComponentSetUepTblIdxMId = env->GetMethodID(m_dabServiceComponentClass, "setUepTableIndex", "(I)V");
    m_dabServiceComponentSetIsFecAppliedMId = env->GetMethodID(m_dabServiceComponentClass, "setIsFecSchemeApplied", "(Z)V");

    m_dabServiceComponentAddUserApplicationMId = env->GetMethodID(m_dabServiceComponentClass, "addScUserApplication", "(Lorg/omri/radioservice/RadioServiceDabUserApplication;)V");
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

void JTunerUsbDevice::setJavaClassTermId(JNIEnv *env, jclass dabServiceClass) {
    //local reference from GlobalRef in OnLoad
    m_termIdClass = dabServiceClass;

    m_termIdConstructorMId = env->GetMethodID(m_termIdClass, "<init>", "()V");
    m_termIdSetGenreTextMId = env->GetMethodID(m_termIdClass, "setGenreText", "(Ljava/lang/String;)V");
}

void JTunerUsbDevice::callCallback(TUNER_CALLBACK_TYPE callbackType) {
    std::cout << m_logTag << "Calling tuner callback: " << +callbackType << std::endl;

    bool wasDetached = false;
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThread(&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            std::cout << "jniEnv thread failed to attach!" << std::endl;
            return;
        }
    }

    enve->CallVoidMethod(m_usbTunerObject, m_usbTunerCallbackMId, callbackType);

    if(wasDetached) {
        m_javaVm->DetachCurrentThread();
    }
}

void JTunerUsbDevice::scanProgress(int percentDone, int freqHz) {
    std::cout << m_logTag << "scanProgress: " << +percentDone << "%, freq "
        << +(freqHz/1000) << " kHz" << std::endl;

    bool wasDetached = false;
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThread(&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            std::cout << "jniEnv thread failed to attach!" << std::endl;
            return;
        }
    }

    enve->CallVoidMethod(m_usbTunerObject, m_usbTunerScanProgressMId, percentDone, freqHz);

    if(wasDetached) {
        m_javaVm->DetachCurrentThread();
    }
}

void JTunerUsbDevice::ensembleReady(DabEnsemble& ensemble) {
    std::stringstream logStr;
    logStr << m_logTag << " Ensemble ready: " << +ensemble.getDabServices().size()
        << " services, EId: " << std::hex << +ensemble.getEnsembleId() << std::dec << std::endl;
    std::cout << logStr.str() << std::endl;

    m_dabTimeCallback = ensemble.registerDateTimeCallback(
                std::bind(&JTunerUsbDevice::dabTimeUpdate, this, std::placeholders::_1));

    bool wasDetached = false;
    JNIEnv *enve;

    int envState = m_javaVm->GetEnv((void **) &enve, JNI_VERSION_1_6);
    if (envState == JNI_EDETACHED) {
        if (m_javaVm->AttachCurrentThread(&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            std::cout << "jniEnv thread failed to attach!" << std::endl;
            return;
        }
    }

    jstring ensembleLabel = getSafeJniStringFromCString(enve,
                                                        ensemble.getEnsembleLabel().c_str(),
                                                        ensemble.getEnsembleLabel().size());
    jstring ensembleShortLabel = getSafeJniStringFromCString(enve,
                                                            ensemble.getEnsembleShortLabel().c_str(),
                                                            ensemble.getEnsembleShortLabel().size());

    for(const auto& srv : ensemble.getDabServices()) {
        std::cout << m_logTag << " Scan service: " << srv->getServiceLabel() << std::endl;

        jobject dabServiceObject = enve->NewObject(m_dabServiceClass, m_dabServiceConstructorMId);

        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetEnsembleEccMId, ensemble.getEnsembleEcc());
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetEnsembleIdMId, ensemble.getEnsembleId());
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetEnsembleLabelMId, ensembleLabel);
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetEnsembleShortLabelMId, ensembleShortLabel);
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetEnsembleFrequencyMId, (jint)srv->getEnsembleFrequency());
        if(srv->isCaApplied()) {
            enve->CallVoidMethod(dabServiceObject, m_dabServiceSetIsCaAppliedMId, JNI_TRUE);
        } else {
            enve->CallVoidMethod(dabServiceObject, m_dabServiceSetIsCaAppliedMId, JNI_FALSE);
        }
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetCaIdMId, (jint)srv->getCaId());

        jstring dabServiceLabel;
        jstring dabServiceShortLabel;

        dabServiceLabel = getSafeJniStringFromCString(enve,
                                                      srv->getServiceLabel().c_str(),
                                                      srv->getServiceLabel().size());
        dabServiceShortLabel = getSafeJniStringFromCString(enve,
                                                           srv->getServiceShortLabel().c_str(),
                                                           srv->getServiceShortLabel().size());

        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetServiceLabelMId, dabServiceLabel);
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetServiceShortLabelMId, dabServiceShortLabel);
        enve->CallVoidMethod(dabServiceObject, m_dabServiceSetServiceIdMId, srv->getServiceId());

        if(srv->hasAudioServiceComponent()) {
            enve->CallVoidMethod(dabServiceObject, m_dabServiceSetServiceIsProgrammeMId, JNI_TRUE);
        } else {
            enve->CallVoidMethod(dabServiceObject, m_dabServiceSetServiceIsProgrammeMId, JNI_FALSE);
        }

        jstring genrePty = getSafeJniStringFromCString(enve,
                                                       srv->getProgrammeTypeFullName().c_str(),
                                                       srv->getProgrammeTypeFullName().size());
        jobject termIdObject = enve->NewObject(m_termIdClass, m_termIdConstructorMId);

        enve->CallVoidMethod(termIdObject, m_termIdSetGenreTextMId, genrePty);
        enve->CallVoidMethod(dabServiceObject, m_dabServiceAddGenreTermIdMId, termIdObject);
        enve->DeleteLocalRef(genrePty);

        enve->DeleteLocalRef(termIdObject);

        //DABServiceComponent creation
        for(const auto& srvComp : srv->getServiceComponents()) {
            jobject dabServiceComponentObject = enve->NewObject(m_dabServiceComponentClass, m_dabServiceComponentConstructorMId);

            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetBitrateMId, (jint)srvComp->getSubchannelBitrate());
            //enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetCaFlagMId, static_cast<jboolean>(srvComp->isCaApplied()));
            if(srvComp->isCaApplied() > 0) {
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetCaFlagMId, JNI_TRUE);
            } else {
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetCaFlagMId, JNI_FALSE);
            }

            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetServiceIdMId, (jint)srv->getServiceId());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetSubchannelIdMId, srvComp->getSubChannelId());

            jstring dabServiceComponentLabel;
            dabServiceComponentLabel = getSafeJniStringFromCString(enve,
                                                                   srvComp->getServiceComponentLabel().c_str(),
                                                                   srvComp->getServiceComponentLabel().size());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetLabelMId, dabServiceComponentLabel);

            jint packetAddress;
            uint8_t tmId;
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

            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetPacketAddressMId, packetAddress);
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetIsDgUsedMId, dgUsed);
            if(srvComp->isPrimary()) {
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetIsPrimaryMId, JNI_TRUE);
            } else {
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetIsPrimaryMId, JNI_FALSE);
            }

            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetScIDsMId, (jint)srvComp->getServiceComponentIdWithinService());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetTransportModeIdMId, (jint)tmId);
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetMscStartAddressMId, (jint)srvComp->getMscStartAddress());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetSubchanSizeMId, (jint)srvComp->getSubchannelSize());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetProtectionLvlMId, (jint)srvComp->getProtectionLevel());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetProtectionTypeMId, (jint)srvComp->getProtectionType());
            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetUepTblIdxMId, (jint)srvComp->getUepTableIndex());
            if(srvComp->isFecSchemeApplied()) {
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetIsFecAppliedMId, JNI_TRUE);
            } else {
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetIsFecAppliedMId, JNI_FALSE);
            }

            enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentSetScTypeMId, serviceComponentType);

            enve->DeleteLocalRef(dabServiceComponentLabel);

            //DABUserApplication creation
            for(const auto& uApp : srvComp->getUserApplications()) {
                if(uApp.getUserApplicationType() == registeredtables::USERAPPLICATIONTYPE::DYNAMIC_LABEL) {
                    std::cout << m_logTag << "Filtering DLS Userapplication" << std::endl;
                    continue;
                }

                jobject dabServiceUserapplicationObject = enve->NewObject(m_dabServiceUserApplicationClass, m_dabServiceUserApplicationConstructorMId);
                enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetAppTypeMId, (jint)uApp.getUserApplicationType());
                if(uApp.isCaApplied()) {
                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetIsCaAppliedMId, JNI_TRUE);
                } else {
                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetIsCaAppliedMId, JNI_FALSE);
                }

                enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetCaOrgMId, (jint)uApp.getCaOrganization());
                if(uApp.isXpadApp()) {
                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetIsXPadMId, JNI_TRUE);
                } else {
                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetIsXPadMId, JNI_FALSE);
                }

                enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetXPadAppTypeMId, (jint)uApp.getXpadAppType());

                if(uApp.dataGroupsUsed()) {
                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetIsDgUsedMId, JNI_TRUE);
                } else {
                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetIsDgUsedMId, JNI_FALSE);
                }

                enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetDSCTyMId, (jint)uApp.getDataServiceComponentType());

                if(!uApp.getUserApplicationData().empty()) {
                    jbyteArray uAppData = enve->NewByteArray(uApp.getUserApplicationData().size());
                    enve->SetByteArrayRegion(uAppData, 0, uApp.getUserApplicationData().size(), (jbyte*)uApp.getUserApplicationData().data());

                    enve->CallVoidMethod(dabServiceUserapplicationObject, m_dabServiceUserApplicationSetUappDataMId, uAppData);
                    enve->DeleteLocalRef(uAppData);
                }

                //Add Userapplication to DabServiceComponent
                enve->CallVoidMethod(dabServiceComponentObject, m_dabServiceComponentAddUserApplicationMId, dabServiceUserapplicationObject);

                enve->DeleteLocalRef(dabServiceUserapplicationObject);
            }
            //DABUserApplication creation END

            //Add DabServiceComponent to DabService
            enve->CallVoidMethod(dabServiceObject, m_dabServiceAddServiceComponentMId, dabServiceComponentObject);

            enve->DeleteLocalRef(dabServiceComponentObject);
        }
        //DABServiceComponent creation END

        enve->DeleteLocalRef(dabServiceLabel);
        enve->DeleteLocalRef(dabServiceShortLabel);

        enve->CallVoidMethod(m_usbTunerObject, m_usbTunerServiceFoundMId, dabServiceObject);

        enve->DeleteLocalRef(dabServiceObject);
    }

    enve->DeleteLocalRef(ensembleLabel);
    enve->DeleteLocalRef(ensembleShortLabel);

    if(wasDetached) {
        m_javaVm->DetachCurrentThread();
    }
}

void JTunerUsbDevice::serviceStarted(jobject dabService) {
    bool wasDetached = false;
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThread(&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            std::cout << "jniEnv thread failed to attach!" << std::endl;
            return;
        }
    }

    enve->CallVoidMethod(m_usbTunerObject, m_usbTunerServiceStartedMId, dabService);

    if(wasDetached) {
        m_javaVm->DetachCurrentThread();
    }
}

void JTunerUsbDevice::serviceStopped(jobject dabService) {
    bool wasDetached = false;
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThread(&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            std::cout << "jniEnv thread failed to attach!" << std::endl;
            return;
        }
    }

    enve->CallVoidMethod(m_usbTunerObject, m_usbTunerServiceStoppedMId, dabService);

    if(wasDetached) {
        m_javaVm->DetachCurrentThread();
    }
}

void JTunerUsbDevice::receptionStatistics(bool rfLock, int qual) {
    bool wasDetached = false;
    JNIEnv* enve;

    int envState = m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(m_javaVm->AttachCurrentThread(&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            std::cout << "jniEnv thread failed to attach!" << std::endl;
            return;
        }
    }

    enve->CallVoidMethod(m_usbTunerObject, m_usbTunerReceptionStatisticsMId, (jboolean)rfLock, (jint)qual);

    if(wasDetached) {
        m_javaVm->DetachCurrentThread();
    }
}

void JTunerUsbDevice::setJavaClassDabTime(JNIEnv *env, jclass dabTimeClass) {
    m_dabTimeClass = dabTimeClass;
    m_dabTimeConstructorMId = env->GetMethodID(m_dabTimeClass, "<init>", "(J)V");
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

    bool wasDetached;
    if (!JNI_ATTACH(m_javaVm, wasDetached)) {
        std::cerr << "jniEnv thread failed to attach!" << std::endl;
        return;
    }

    JNIEnv *enve;
    m_javaVm->GetEnv((void **) &enve, JNI_VERSION_1_6);
    jobject javaDateObject = enve->NewObject(m_dabTimeClass, m_dabTimeConstructorMId, t);
    enve->CallVoidMethod(m_usbTunerObject, m_dabTimeUpdateMId, javaDateObject);

    enve->DeleteLocalRef(javaDateObject);

    if (!JNI_DETACH(m_javaVm, wasDetached)) {
        std::cerr << "jniEnv thread failed to detach!" << std::endl;
    }
}
