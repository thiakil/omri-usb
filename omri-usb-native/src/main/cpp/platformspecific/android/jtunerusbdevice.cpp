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

#include "jtunerusbdevice.h"

#include "jenny/proxy/RadioServiceDabComponentImplProxy.h"
#include "jenny/proxy/RadioServiceDabNativeProxy.h"
#include "jenny/proxy/RadioServiceDabUserApplicationImplProxy.h"
#include "jenny/proxy/TunerUsbProxy.h"

using jenny::LocalRef;

JTunerUsbDevice::JTunerUsbDevice(JNIEnv* env, jobject tunerUsbDevice, libusb_device* device) : JUsbDevice(device), m_usbTunerObject(jenny::GlobalRef(env, tunerUsbDevice)) {
    std::cout << m_logTag << "Creating JTuner" << std::endl;
}

JTunerUsbDevice::~JTunerUsbDevice() {

}

void JTunerUsbDevice::callCallback(TUNER_CALLBACK_TYPE callbackType) {
    std::cout << m_logTag << "Calling tuner callback: " << +callbackType << std::endl;

    m_usbTunerObject.callBack(callbackType);
}

void JTunerUsbDevice::scanProgress(int percentDone, int freqHz) {
    std::cout << m_logTag << "scanProgress: " << +percentDone << "%, freq "
        << +(freqHz/1000) << " kHz" << std::endl;

    m_usbTunerObject.scanProgressCallback(percentDone, freqHz);
}

void JTunerUsbDevice::ensembleReady(DabEnsemble& ensemble) {
    std::stringstream logStr;
    logStr << m_logTag << " Ensemble ready: " << +ensemble.getDabServices().size()
        << " services, EId: " << std::hex << +ensemble.getEnsembleId() << std::dec << std::endl;
    std::cout << logStr.rdbuf() << std::endl;

    m_dabTimeCallback = ensemble.registerDateTimeCallback(
                std::bind(&JTunerUsbDevice::dabTimeUpdate, this, std::placeholders::_1));


    JNIEnv* enve = jenny::Env().get();

    LocalRef<jstring> ensembleLabel = jenny::toJavaString(enve,
                                                        ensemble.getEnsembleLabel().c_str());
    LocalRef<jstring> ensembleShortLabel = jenny::toJavaString(enve,
                                                            ensemble.getEnsembleShortLabel().c_str());

    for(const auto& srv : ensemble.getDabServices()) {
        std::cout << m_logTag << " Scan service: " << srv->getServiceLabel() << std::endl;
        const jint sid = (jint) srv->getServiceId();
        RadioServiceDabNativeProxy dabServiceObject(RadioServiceDabNativeProxy::newInstance(enve), true);
        const jint ecc = (jint) ensemble.getEnsembleEcc();
        dabServiceObject.setEnsembleEcc(ecc);
        const jint eid = (jint) ensemble.getEnsembleId();
        dabServiceObject.setEnsembleId(eid);
        dabServiceObject.setEnsembleLabel(ensembleLabel);
        dabServiceObject.setEnsembleShortLabel(ensembleShortLabel);
        const jint freq = (jint) srv->getEnsembleFrequency();
        dabServiceObject.setEnsembleFrequency(freq);
        if(srv->isCaApplied()) {
            dabServiceObject.setIsCaProtected(JNI_TRUE);
        } else {
            dabServiceObject.setIsCaProtected(JNI_FALSE);
        }
        const jint caId = (jint) srv->getCaId();
        dabServiceObject.setCaId(caId);

        LocalRef<jstring> dabServiceLabel = jenny::toJavaString(enve, srv->getServiceLabel().c_str());
        LocalRef<jstring> dabServiceShortLabel = jenny::toJavaString(enve, srv->getServiceShortLabel().c_str());

        dabServiceObject.setServiceLabel(dabServiceLabel);
        dabServiceObject.setShortLabel(dabServiceShortLabel);

        dabServiceObject.setServiceId(sid);

        if(srv->hasAudioServiceComponent()) {
            dabServiceObject.setIsProgrammeService(JNI_TRUE);
        } else {
            dabServiceObject.setIsProgrammeService(JNI_FALSE);
        }

        LocalRef<jstring> genrePty = jenny::toJavaString(enve, srv->getProgrammeTypeFullName().c_str());

        dabServiceObject.addGenre(genrePty);

        //DABServiceComponent creation
        for(const auto& srvComp : srv->getServiceComponents()) {
            auto dabServiceComponentObject = RadioServiceDabComponentImplProxy::newInstance();
            const jint subChannelId = (jint) srvComp->getSubChannelId();
            const jint bitrate = (jint) srvComp->getSubchannelBitrate();
            const jint mscStartAddress = (jint) srvComp->getMscStartAddress();
            const jint subChannelSize = (jint) srvComp->getSubchannelSize();
            const jint protectionLevel = (jint) srvComp->getProtectionLevel();
            const jint protectionType = (jint) srvComp->getProtectionType();
            const jint uepTableIndex = (jint) srvComp->getUepTableIndex();

            dabServiceComponentObject.setScBitrate(bitrate);
            //dabServiceComponentObject.setCaFlag(static_cast<jboolean>(srvComp->isCaApplied()));
            if(srvComp->isCaApplied() > 0) {
                dabServiceComponentObject.setIsScCaFlagSet(JNI_TRUE);
            } else {
                dabServiceComponentObject.setIsScCaFlagSet(JNI_FALSE);
            }

            dabServiceComponentObject.setServiceId(sid);

            dabServiceComponentObject.setSubchannelId(subChannelId);

            {
                LocalRef<jstring> dabServiceComponentLabel;
                dabServiceComponentLabel = jenny::toJavaString(enve, srvComp->getServiceComponentLabel().c_str());
                dabServiceComponentObject.setScLabel(dabServiceComponentLabel);
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

            dabServiceComponentObject.setPacketAddress(packetAddress);
            dabServiceComponentObject.setDatagroupTransportUsed(dgUsed);
            if(srvComp->isPrimary()) {
                dabServiceComponentObject.setIsScPrimary(JNI_TRUE);
            } else {
                dabServiceComponentObject.setIsScPrimary(JNI_FALSE);
            }

            const jint scIdS = (jint)srvComp->getServiceComponentIdWithinService();
            dabServiceComponentObject.setServiceComponentIdWithinService(scIdS);
            dabServiceComponentObject.setDatagroupTransportUsed(tmId);
            dabServiceComponentObject.setMscStartAddress(mscStartAddress);
            dabServiceComponentObject.setSubchannelSize(subChannelSize);
            dabServiceComponentObject.setProtectionLevel(protectionLevel);
            dabServiceComponentObject.setProtectionType(protectionType);
            dabServiceComponentObject.setUepTableIndex(uepTableIndex);
            if(srvComp->isFecSchemeApplied()) {
                dabServiceComponentObject.setIsFecSchemeApplied(JNI_TRUE);
            } else {
                dabServiceComponentObject.setIsFecSchemeApplied(JNI_FALSE);
            }

            dabServiceComponentObject.setServiceComponentType(serviceComponentType);

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

                auto dabServiceUserApplicationObject = RadioServiceDabUserApplicationImplProxy::newInstance();
                dabServiceUserApplicationObject.setUserApplicationType(uAppType);
                if(uApp.isCaApplied()) {
                    dabServiceUserApplicationObject.setIsCaProtected(JNI_TRUE);
                } else {
                    dabServiceUserApplicationObject.setIsCaProtected(JNI_FALSE);
                }

                dabServiceUserApplicationObject.setCaOrganization(caOrg);
                if(uApp.isXpadApp()) {
                    dabServiceUserApplicationObject.setIsXpadApptype(JNI_TRUE);
                } else {
                    dabServiceUserApplicationObject.setIsXpadApptype(JNI_FALSE);
                }

                dabServiceUserApplicationObject.setXpadApptype(xPadAppType);

                if(uApp.dataGroupsUsed()) {
                    dabServiceUserApplicationObject.setIsDatagroupsUsed(JNI_TRUE);
                } else {
                    dabServiceUserApplicationObject.setIsDatagroupsUsed(JNI_FALSE);
                }

                dabServiceUserApplicationObject.setDSCTy(dataServiceComponentType);

                if(!uApp.getUserApplicationData().empty()) {
                    LocalRef<jbyteArray> uAppData = jenny::makeByteArray(enve, uApp.getUserApplicationData().size(), uApp.getUserApplicationData().data());

                    dabServiceUserApplicationObject.setUappdata(uAppData);
                }

                //Add Userapplication to DabServiceComponent
                dabServiceComponentObject.addScUserApplication(dabServiceUserApplicationObject.getThis());
            }
            //DABUserApplication creation END

            //Add DabServiceComponent to DabService
            dabServiceObject.addServiceComponent(dabServiceComponentObject.getThis());
        }
        //DABServiceComponent creation END

        m_usbTunerObject.serviceFound(dabServiceObject.getThis());
    }
}

void JTunerUsbDevice::serviceStarted(LocalRef<jobject>& dabService) {
    m_usbTunerObject.serviceStarted(dabService);
}

void JTunerUsbDevice::serviceStopped(LocalRef<jobject>& dabService) {
    m_usbTunerObject.serviceStopped(dabService);
}

void JTunerUsbDevice::receptionStatistics(bool rfLock, int level, int rawValue) {
    m_usbTunerObject.receptionStatistics(rfLock, level, rawValue);
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

    m_usbTunerObject.dabTimeUpdateEpoch(t);

}
