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

#include "dabservice.h"

#include <iostream>

#include "dabservicecomponentmscstreamaudio.h"
#include "dabservicecomponentmscpacketdata.h"
#include "dabensemble.h"

DabService::DabService() {
    m_ensembleFrequency = DabEnsemble::FREQ_INVALID;
    //std::cout << "DabService constructed" << std::endl;
}

DabService::~DabService() {
    //std::cout << "DabService got deleted" << std::endl;

    m_components.clear();
}

uint32_t DabService::getServiceId() const {
    return m_serviceId;
}

bool DabService::isCaApplied() const {
    return m_caApplied;
}

uint8_t DabService::getCaId() const {
    return m_caId;
}

uint8_t DabService::getNumberServiceComponents() const {
    return m_numSrvComps;
}

bool DabService::hasAudioServiceComponent() const {
    // Following is not covered by DAB specs:
    // A DabService is a Programme Service if it has at least one audio service component
    bool hasProgrammeComponent = false;
    for (const auto& srvComp : m_components) {
        if (srvComp->isAudioComponent()) {
            hasProgrammeComponent = true;
            break;
        }
    }
    return hasProgrammeComponent;
}

uint8_t DabService::getLabelCharset() const {
    return m_labelCharset;
}

std::string DabService::getServiceLabel() const {
    return m_serviceLabel;
}

std::string DabService::getServiceShortLabel() const {
    return m_serviceShortLabel;
}

const std::vector<std::shared_ptr<DabServiceComponent>>& DabService::getServiceComponents() const {
    return m_components;
}

uint8_t DabService::getProgrammeTypeCode() const {
    return m_ptyCode;
}

bool DabService::isProgrammeTypeDynamic() const {
    return m_ptyIsDynamic;
}

std::string DabService::getProgrammeTypeFullName() const {
    return m_ptyNameFull;
}

std::string DabService::getProgrammeType16charName() const {
    return m_ptyName16;
}

std::string DabService::getProgrammeType8CharName() const {
    return m_ptyName8;
}

uint32_t DabService::getEnsembleFrequency() const {
    return m_ensembleFrequency;
}

void DabService::setServiceId(uint32_t serviceId) {
    m_serviceId = serviceId;
}

void DabService::setCaId(uint8_t caId) {
    m_caId = caId;
    m_caApplied = true;
}

void DabService::setNumberOfServiceComponents(uint8_t numSc) {
    m_numSrvComps = numSc;
}

void DabService::setLabelCharset(uint8_t charset) {
    m_labelCharset = charset;
}

void DabService::setServiceLabel(const std::string& label) {
    if(m_serviceLabel.empty()) {
        m_serviceLabel = label;

        //std::cout << m_logTag << "Setting ServiceLabel: " << m_serviceLabel << " to SId: " << std::hex << +m_serviceId << std::dec << std::endl;
    }
}

void DabService::setServiceShortLabel(const std::string& shortLabel) {
    if(m_serviceShortLabel.empty()) {
        m_serviceShortLabel = shortLabel;

        //std::cout << m_logTag << "Setting ServiceShortlabel: " << m_serviceShortLabel << " to SId: " << std::hex << +m_serviceId << std::dec << std::endl;
    }
}

void DabService::addServiceComponent(const std::shared_ptr<DabServiceComponent>& component) {
    m_components.push_back(component);
    std::ostringstream logStr;
    const DabServiceComponent::SERVICECOMPONENTTYPE type = component->getServiceComponentType();
    logStr << m_logTag << "Adding ServiceComponent for SId: 0x" << std::hex << +m_serviceId
           << std::dec << " as Servicecomponent #" << +m_components.size()
           << " '" << component->getServiceComponentLabel() << "'"
           << " isPrim:" << +component->isPrimary()
           << " SubChanId:" << +component->getSubChannelId()
           << " SCIdS:" << +component->getServiceComponentIdWithinService()
           << " type:" << +type << ":";
    switch (type) {
        case DabServiceComponent::SERVICECOMPONENTTYPE::MSC_STREAM_AUDIO: {
            const auto mscStreamAudioComponent =
                    std::static_pointer_cast<DabServiceComponentMscStreamAudio>(component);
            const auto ascty = mscStreamAudioComponent->getAudioServiceComponentType();
            switch (ascty) {
                case DabServiceComponentMscStreamAudio::AUDIOTYPE_MP2:
                    logStr << "MP2";
                    break;
                case DabServiceComponentMscStreamAudio::AUDIOTYPE_AAC:
                    logStr << "AAC";
                    break;
                default:
                    logStr << "streamaudioinvalid";
                    break;
            }
            break;
        }
        case DabServiceComponent::SERVICECOMPONENTTYPE::MSC_PACKET_MODE_DATA:
            logStr << "packetdata";
            break;
        case DabServiceComponent::SERVICECOMPONENTTYPE::MSC_STREAM_DATA:
            logStr << "streamdata";
            break;
        case DabServiceComponent::SERVICECOMPONENTTYPE::RESERVED:
            logStr << "reserved";
            break;
        default:
            logStr << "?";
            break;
    }
    std::cout << logStr.str() << std::endl;
}

void DabService::setProgrammeTypeCode(uint8_t intPtyCode) {
    if(m_ptyCode != intPtyCode && intPtyCode < 32) {
        m_ptyCode = intPtyCode;
        m_ptyNameFull = registeredtables::PROGRAMME_TYPE_NAME[m_ptyCode][0];
        m_ptyName16 = registeredtables::PROGRAMME_TYPE_NAME[m_ptyCode][1];
        m_ptyName8 = registeredtables::PROGRAMME_TYPE_NAME[m_ptyCode][2];
        std::ostringstream logStr;
        logStr << m_logTag << "Setting " << (isProgrammeTypeDynamic() ? "dynamic" : "static")
               << " PTY for SId: 0x" << std::hex << +m_serviceId << std::dec
               << " to: " << +getProgrammeTypeCode()
               << " : " << getProgrammeTypeFullName() << " : " << getProgrammeType16charName()
               << " : " << getProgrammeType8CharName();
        std::cout << logStr.str() << std::endl;
    }
}

void DabService::setProgrammeTypeIsDynamic(bool dynamic) {
    m_ptyIsDynamic = dynamic;
}

void DabService::setEnsembleFrequency(uint32_t ensembleFrequency) {
    m_ensembleFrequency = ensembleFrequency;
}

void DabService::setDabEnsemble(DabEnsemble *pEnsemble) {
    m_ptr_dabEnsemble = pEnsemble;
}

DabEnsemble* DabService::getDabEnsemble() const {
    return m_ptr_dabEnsemble;
}

bool DabService::checkSanity() const {
    bool isSane = true;
    std::ostringstream logStr;
    logStr << m_logTag << "check sanity SId=0x" << std::hex << +getServiceId() << std::dec << ": ";

    if (getServiceId() == SID_INVALID) {
        logStr << "SID:invalid";
        isSane = false;
    }
    else if (getEnsembleFrequency() == DabEnsemble::FREQ_INVALID) {
        logStr << "EFreq:invalid";
        isSane = false;
    }
    else if (getNumberServiceComponents() == 0) {
        logStr << "numCmp:0";
        isSane = false;
    }
    else if (getLabelCharset() == CHARSET_INVALID) {
        logStr << "charset:invalid";
        isSane = false;
    }
    else if (getServiceLabel().empty()) {
        logStr << "label:empty";
        isSane = false;
    }
    else if (getServiceShortLabel().empty()) {
        logStr << "short label:empty";
        isSane = false;
    }
    else if (getServiceComponents().size() != getNumberServiceComponents()) {
        logStr << "components != numCmp:" << +getServiceComponents().size() << "/" << +getNumberServiceComponents();
        isSane = false;
    } else {
        for (const auto& srvCmp : getServiceComponents()) {
            bool wasSane = srvCmp->checkSanity();
            if (!wasSane) {
                // log message was created in checkSanity already, clear this logStr buffer
                logStr.str(std::string());
                isSane = false;
                break;
            }
        }
    }
    if (!isSane && logStr.str().length() > 0) {
        std::cout << logStr.str() << std::endl;
    }

    return isSane;
}
