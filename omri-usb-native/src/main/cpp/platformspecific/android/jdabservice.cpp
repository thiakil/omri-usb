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

#include <algorithm>
#include <iostream>

#include "../../dabensemble.h"
#include "jdabservice.h"
#include "jni-helper.h"
#include "../../daemon-env.h"
#include "jnihelper.h"
#include "jenny/proxy/NativeHelperProxy.h"
#include "jenny/proxy/RadioServiceDabImplProxy.h"
#include "jenny/proxy/RadioServiceDabNativeProxy.h"
#include "jenny/proxy/RadioServiceImplProxy.h"
#include "jenny/proxy/TextualDabDynamicLabelImplProxy.h"
#include "jenny/proxy/TextualDabDynamicLabelPlusItemImplProxy.h"
#include "jenny/proxy/VisualDabSlideShowImplProxy.h"

static constexpr uint16_t MIME_LINK_TABLE[4] = {
        7,
        1,
        4,
        2
};

JDabService::JDabService(JavaVM* javaVm, JNIEnv* env, jobject dabserviceObject): m_linkedJavaDabServiceObject(env, dabserviceObject) {
    // Note: don't JNI_ATTACH !
    
    std::cout << m_logTag << "Constructing" << std::endl;

    m_javaVm = javaVm;

    m_ensembleFrequency = static_cast<uint32_t >(RadioServiceDabNativeProxy::getEnsembleFrequency(env, m_linkedJavaDabServiceObject.get()));
    m_ensembleEcc = static_cast<uint8_t >(RadioServiceDabNativeProxy::getEnsembleEcc(env, m_linkedJavaDabServiceObject.get()));
    m_ensembleId = static_cast<uint16_t >(RadioServiceDabNativeProxy::getEnsembleId(env, m_linkedJavaDabServiceObject.get()));
    m_serviceId = static_cast<uint32_t >(RadioServiceDabNativeProxy::getServiceId(env, m_linkedJavaDabServiceObject.get()));

    m_sfServicesLastTime = std::chrono::steady_clock::now();

    std::cout << m_logTag << "Constructed SId " << std::hex << m_serviceId << std::dec << std::endl;
}

JDabService::~JDabService() {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    // stop processing audioDataInput
    JDabService::decodeAudio(false);

    JNIEnv* enve;
    m_javaVm->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if (enve == nullptr) {
        return;//ignore if jvm not attached
    }
    std::cout << m_logTag << "Destroyed SId " << std::hex << m_serviceId << std::dec << std::endl;
}

void JDabService::unlinkDabService() {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    std::clog << m_logTag << "Un-Linking DABServices... for SId " << std::hex << m_serviceId << std::dec << std::endl;
    if (m_linkedDabService != nullptr) {
        m_linkedDabService.reset();
        m_linkedDabService = nullptr;
    }
    if (m_audioDataCb != nullptr) {
        m_audioDataCb.reset();
        m_audioDataCb = nullptr;
    }
    if (m_dlsCallback != nullptr) {
        m_dlsCallback.reset();
        m_dlsCallback = nullptr;
    }
    if (m_slsCallback != nullptr) {
        m_slsCallback.reset();
        m_slsCallback = nullptr;
    }
    if (m_sfCallback != nullptr) {
        m_sfCallback.reset();
        m_sfCallback = nullptr;
    }
}

void JDabService::setLinkDabService(std::shared_ptr<DabService> linkedDabSrv) {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);

    if (linkedDabSrv->hasAudioServiceComponent()) {
        std::cout << m_logTag << "Linking DABServices... for SId " << std::hex << m_serviceId
                  << std::dec << std::endl;
        m_linkedDabService = linkedDabSrv;

        for (const auto &srvComp : linkedDabSrv->getServiceComponents()) {

            if (srvComp->getServiceComponentType() == DabServiceComponent::SERVICECOMPONENTTYPE::MSC_STREAM_AUDIO
                        && (srvComp->isPrimary() || linkedDabSrv->getNumberServiceComponents() == 1)) {

                std::cout << m_logTag << "Registering audiocallback SubChanId " << +srvComp->getSubChannelId()
                    << ", SCIds " << +srvComp->getServiceComponentIdWithinService() << std::endl;

                std::shared_ptr<DabServiceComponentMscStreamAudio> audioComponent =
                        std::static_pointer_cast<DabServiceComponentMscStreamAudio>(srvComp);
                m_audioDataCb = audioComponent->registerAudioDataCallback(
                        std::bind(&JDabService::audioDataInput, this, std::placeholders::_1,
                                  std::placeholders::_2, std::placeholders::_3,
                                  std::placeholders::_4, std::placeholders::_5,
                                  std::placeholders::_6));

                for (const auto &uApp : srvComp->getUserApplications()) {
                    switch (uApp.getUserApplicationType()) {
                        case registeredtables::USERAPPLICATIONTYPE::DYNAMIC_LABEL: {
                            std::cout << m_logTag
                                      << "Registering UserApplication Type DYNAMIC_LABEL "
                                      << ", DSCTy: " << +uApp.getDataServiceComponentType()
                                      << std::endl;
                            m_dlsCallback = uApp.getUserApplicationDecoder()->registerUserapplicationDataCallback(
                                    std::bind(&JDabService::dynamicLabelInput, this,
                                              std::placeholders::_1));
                            break;
                        }
                        case registeredtables::USERAPPLICATIONTYPE::MOT_SLIDESHOW: {
                            std::cout << m_logTag
                                      << "Registering UserApplication Type MOT_SLIDESHOW "
                                      << ", DSCTy: " << +uApp.getDataServiceComponentType()
                                      << std::endl;
                            m_slsCallback = uApp.getUserApplicationDecoder()->registerUserapplicationDataCallback(
                                    std::bind(&JDabService::slideshowInput, this,
                                              std::placeholders::_1));
                            break;
                        }

                        //Other UserApp decoders not yet implemented
                        default:
                            std::cout << m_logTag << "Unknown UserApplication Type 0x"
                                      << uApp.getUserApplicationType() << ", DSCTy: "
                                      << +uApp.getDataServiceComponentType() << std::endl;
                            break;
                    }
                }
            }
            // found the audio stream component
            break;
        }

        DabEnsemble* pDabEnsemble = m_linkedDabService->getDabEnsemble();
        const std::string register_service_following = "register service following";
        if (pDabEnsemble != nullptr) {
            m_sfCallback = pDabEnsemble->registerServiceFollowingCallback(
                    std::bind(&JDabService::callJavaServiceFollowingDabServicesChanged, this));
            std::cout << m_logTag << register_service_following << std::endl;
        } else {
            std::clog << m_logTag << "failed to " << register_service_following << std::endl;
        }
    } else {
        std::clog << m_logTag << "failed attempt to link non Programme Service SId "
                  << std::hex << m_serviceId << std::dec << std::endl;
    }
}

std::shared_ptr<DabService> JDabService::getLinkDabService() const {
    return m_linkedDabService;
}

jobject JDabService::getJavaDabServiceObject() const {
    if (m_linkedJavaDabServiceObject.get() == nullptr) {
        std::cerr << m_logTag << "Returning linked Java DabService object nullptr" << std::endl;
    }
    return m_linkedJavaDabServiceObject.get();
}

uint32_t JDabService::getEnsembleFrequency() const {
    return m_ensembleFrequency;
}

uint16_t JDabService::getEnsembleId() const {
    return m_ensembleId;
}

uint8_t JDabService::getEnsembleEcc() const {
    return m_ensembleEcc;
}

uint32_t JDabService::getServiceId() const {
    return m_serviceId;
}

void JDabService::audioDataInput(const std::vector<uint8_t>& audioData, int ascty, int channels, int sampleRate, bool sbrUsed, bool psUsed) {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    if (!m_decodeAudio) {
        return;
    }

    JNIEnv* enve = DaemonEnv().get();

    if (m_ascty != ascty || m_audioChannelCount != channels || m_audioSamplingRate != sampleRate ||
        m_audioSbrUsed != sbrUsed || m_audioPsUsed != psUsed) {
        std::cout << m_logTag << "audioFormatChanged SId " << std::hex << m_serviceId << std::dec <<
                  ", ASCTY: " << +ascty << ", Sampling: " << +sampleRate << " : " << +channels
                  << std::endl;
        m_ascty = ascty;
        m_audioChannelCount = channels;
        m_audioSamplingRate = sampleRate;
        m_audioSbrUsed = sbrUsed;
        m_audioPsUsed = psUsed;

        if (m_decodeAudio) {
            if (m_linkedJavaDabServiceObject.get() != nullptr) {
                RadioServiceImplProxy::audioFormatChanged(enve, m_linkedJavaDabServiceObject.get(), m_ascty,
                                     m_audioChannelCount, m_audioSamplingRate, m_audioSbrUsed,
                                     m_audioPsUsed);
            } else {
                std::cerr<< m_logTag << "LinkedDabServiceObject is NULL at changed audioparams"
                          << std::endl;
            }
        }
    }

    if (audioData.size() > 0) {
        jenny::LocalRef<jbyteArray> data = jenny::makeByteArray(audioData.size(), audioData.data());

        if (m_decodeAudio) {
            if (m_linkedJavaDabServiceObject.get() != nullptr) {
                RadioServiceImplProxy::audioData(enve, m_linkedJavaDabServiceObject.get(),
                                     data.get(), channels, sampleRate);
            } else {
                std::cerr << m_logTag << "LinkedDabServiceObject is NULL at audiodata callback"
                          << std::endl;
            }
        }
    }
}

void JDabService::decodeAudio(bool decode) {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    m_decodeAudio = decode;
    if(!m_decodeAudio) {
        m_audioSamplingRate = -1;
        m_audioChannelCount = -1;
    } else {
        if(m_lastDynamicLabel != nullptr) {
            callJavaDynamiclabelCallback(m_lastDynamicLabel);
        }
        if(m_lastSlideshow != nullptr) {
            callJavaSlideshowCallback(m_lastSlideshow);
        }
    }
}

bool JDabService::isDecodingAudio() {
    return m_decodeAudio;
}

void JDabService::dynamicLabelInput(std::shared_ptr<void> label) {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    m_lastDynamicLabel = std::static_pointer_cast<DabDynamicLabel>(label);

    if(m_lastDynamicLabel == nullptr) {
        std::cerr << m_logTag << "SharedPointerCast to DynamicLabel failed!" << std::endl;
        return;
    }

    if(m_decodeAudio) {
        callJavaDynamiclabelCallback(m_lastDynamicLabel);
    }
}

void JDabService::slideshowInput(std::shared_ptr<void> slideShow) {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    m_lastSlideshow = std::static_pointer_cast<DabSlideshow>(slideShow);

    if(m_lastSlideshow == nullptr) {
        std::cerr << m_logTag << "SharedPointerCast to Slideshow failed!" << std::endl;
        return;
    }

    if(m_lastSlideshow->slideshowData.empty()) {
        std::cout << m_logTag << "Slideshow is empty!" << std::endl;
        return;
    }

    if(m_decodeAudio) {
        callJavaSlideshowCallback(m_lastSlideshow);
    }
}

void JDabService::callJavaSlideshowCallback(const std::shared_ptr<DabSlideshow>& slide) {
    JNIEnv* enve = DaemonEnv().get();

    jenny::LocalRef<jobject> slsObject(enve, VisualDabSlideShowImplProxy::newInstance(enve));

    jenny::LocalRef<jstring> slsContentName(getSafeJniStringFromCString(enve,
                                                         slide->contentName.c_str(),
                                                         slide->contentName.size()));

    jenny::LocalRef<jbyteArray> visualData(jenny::makeByteArray(slide->slideshowData.size(), slide->slideshowData.data()));

    VisualDabSlideShowImplProxy::setContentName(enve, slsObject.get(), slsContentName.get());
    VisualDabSlideShowImplProxy::setVisualData(enve, slsObject.get(), visualData.get());
    VisualDabSlideShowImplProxy::setVisualMimeType(enve, slsObject.get(), MIME_LINK_TABLE[slide->contentSubType]);
    VisualDabSlideShowImplProxy::setContentType(enve, slsObject.get(), 2);
    VisualDabSlideShowImplProxy::setContentSubType(enve, slsObject.get(), slide->contentSubType);

    if(slide->isCategorized) {
        jstring slsCategoryName = getSafeJniStringFromCString(enve,
                                                              slide->categoryTitle.c_str(),
                                                              slide->categoryTitle.size());
        VisualDabSlideShowImplProxy::setCategoryText(enve, slsObject.get(), slsCategoryName);
        enve->DeleteLocalRef(slsCategoryName);

        VisualDabSlideShowImplProxy::setSlideId(enve, slsObject.get(), slide->slideId);
        VisualDabSlideShowImplProxy::setCategoryId(enve, slsObject.get(), slide->categoryId);

        if(!slide->alternativeLocationUrl.empty()) {
            jenny::LocalRef<jstring> slsAltLocUrl(enve, getSafeJniStringFromCString(enve,
                                                               slide->alternativeLocationUrl.c_str(),
                                                               slide->alternativeLocationUrl.size()));
            VisualDabSlideShowImplProxy::setAlternativeLocationURL(enve, slsObject.get(), slsAltLocUrl.get());
        }
        if(!slide->clickThroughUrl.empty()) {
            jenny::LocalRef<jstring> slsCtUrl(enve, getSafeJniStringFromCString(enve,
                                                           slide->clickThroughUrl.c_str(),
                                                           slide->clickThroughUrl.size()));
            VisualDabSlideShowImplProxy::setCategoryClickThroughLink(enve, slsObject.get(), slsCtUrl.get());
        }
    }

    if(m_linkedJavaDabServiceObject.get() != nullptr) {
        RadioServiceImplProxy::slideshowReceived(enve, m_linkedJavaDabServiceObject.get(), slsObject.get());
    } else {
        std::cerr << m_logTag << " callJavaSlideshowCallback: m_linkedJavaDabServiceObject null" << std::endl;
    }
}

void JDabService::callJavaDynamiclabelCallback(const std::shared_ptr<DabDynamicLabel>& label) {
    JNIEnv* enve = DaemonEnv().get();

    jenny::LocalRef<jobject> dlsObject(enve, TextualDabDynamicLabelImplProxy::newInstance(enve));

    jenny::LocalRef<jstring> fullDlsString(getSafeJniStringFromCString(enve,
                                                        label->dynamicLabel.c_str(),
                                                        label->dynamicLabel.size()));
    TextualDabDynamicLabelImplProxy::setText(enve, dlsObject.get(), fullDlsString.get());

    TextualDabDynamicLabelImplProxy::setItemRunning(enve, dlsObject.get(), label->itemRunning);
    TextualDabDynamicLabelImplProxy::setItemToggled(enve, dlsObject.get(), label->itemToggle);

    for(const auto& tag : label->dlPlusTags) {
        jenny::LocalRef<jobject> dlPlusItemObject(enve, TextualDabDynamicLabelPlusItemImplProxy::newInstance(enve));

        TextualDabDynamicLabelPlusItemImplProxy::setDlPlusContentType(enve, dlPlusItemObject.get(), (jint)tag.contentType);

        jstring tagText = getSafeJniStringFromCString(enve,
                                                      tag.dlPlusTagText.c_str(),
                                                      tag.dlPlusTagText.size());
        TextualDabDynamicLabelPlusItemImplProxy::setDlPlusContentText(enve, dlPlusItemObject.get(), tagText);
        enve->DeleteLocalRef(tagText);

        //add item to dls
        TextualDabDynamicLabelImplProxy::addDlPlusItem(enve, dlsObject.get(), dlPlusItemObject.get());
    }
    if(m_linkedJavaDabServiceObject.get() != nullptr) {
        RadioServiceImplProxy::labelReceived(enve, m_linkedJavaDabServiceObject.get(), dlsObject.get());
    } else {
        std::cerr << m_logTag << " callJavaDynamiclabelCallback: m_linkedJavaDabServiceObject null" << std::endl;
    }
}

void JDabService::setSubchanHandle(uint8_t subChanHdl) {
    m_subchanHandle = subChanHdl;
}

uint16_t JDabService::getSubchanHandle() {
    return m_subchanHandle;
}

void JDabService::callJavaServiceFollowingDabServicesChanged() {
    std::lock_guard<std::recursive_mutex> lockGuard(m_mutex);
    const auto & dabService = getLinkDabService();
    if (dabService != nullptr && dabService->getDabEnsemble() != nullptr) {
        DabService* pService = dabService.get();
        DabEnsemble* pEnsemble = pService->getDabEnsemble();
        const auto eid = pEnsemble->getEnsembleId();
        const auto ecc = pEnsemble->getEnsembleEcc();
        const auto efreqKHz = pService->getEnsembleFrequency() / 1000;
        const auto sid = pService->getServiceId();
        const auto isPS = pService->hasAudioServiceComponent();

        LinkedServiceDab currentService(ecc, sid, eid, efreqKHz, isPS);
        const auto & sfServices = pEnsemble->getLinkedDabServices(currentService);

        // find out if sfServices is stable, or if the ensemble is still collecting them
        bool isEqual = (sfServices.size() == m_sfServices.size());
        if (isEqual) {
            for (int i = 0; i < sfServices.size(); i++) {
                const LinkedServiceDab & cmp1 = *(sfServices[i].get());
                const LinkedServiceDab & cmp2 = *(m_sfServices[i].get());
                if (cmp1 != cmp2) {
                    isEqual = false;
                    break;
                }
            }
        }
        bool isSteady;
        if (!isEqual) {
            // still different
            isSteady = false;
            m_sfServicesSteady = false; // in case it was steady previously
            m_sfServicesLastTime = std::chrono::steady_clock::now();
            m_sfServices = sfServices;
        } else {
            // equal, but steady?
            auto timeDiff = std::chrono::steady_clock::now() - m_sfServicesLastTime;
            // consider steady if no more changes after 1 minute
            // ETSI TS 103 176 V2.4.1 defines max 2 minutes for FIG 0/6, FIG 0/21, FIG 0/24
            // but typically updates are faster, thus use 1 min
            isSteady = (timeDiff >= std::chrono::minutes(1));
        }
        std::stringstream logStr;
        logStr << m_logTag << "SF svcs changed: isEqual:" << +isEqual << " isSteady:" << +isSteady << " wasSteady:" << +m_sfServicesSteady;
        std::cout << logStr.rdbuf() << std::endl;
        if (!isSteady) {
            return;
        } else {
            if (m_sfServicesSteady) {
                return; // nothing new, equal AND steady
            } else {
                m_sfServicesSteady = true; // last report
            }
        }

        JNIEnv* enve = DaemonEnv().get();
        if (enve != nullptr && m_linkedJavaDabServiceObject.get() != nullptr) {
            jenny::LocalRef<jobject> arrayList(enve, NativeHelperProxy::newList(enve, sfServices.size()));
            for (const auto &s : sfServices) {
                jenny::LocalRef<jobject> jLinkedServiceDab(enve, RadioServiceDabImplProxy::newInstance(enve));
                RadioServiceDabNativeProxy::setEnsembleEcc(enve, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getEnsembleEcc()));
                RadioServiceDabNativeProxy::setEnsembleFrequency(enve, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getEnsembleFrequencyKHz() * 1000));
                RadioServiceDabNativeProxy::setEnsembleId(enve, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getEnsembleId()));
                RadioServiceDabNativeProxy::setServiceId(enve, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getServiceId()));
                RadioServiceDabNativeProxy::setIsProgrammeService(enve, jLinkedServiceDab.get(),
                                     s.get()->getIsProgrammeService() ? JNI_TRUE : JNI_FALSE);

                NativeHelperProxy::listAdd(enve, arrayList.get(), jLinkedServiceDab.get());
            }
            RadioServiceImplProxy::serviceFollowingReceived(enve, m_linkedJavaDabServiceObject.get(), arrayList.get());
        }
    }

}
