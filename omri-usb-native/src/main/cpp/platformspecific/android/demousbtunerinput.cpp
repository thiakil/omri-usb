
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

#include <iostream>
#include <chrono>

#include "jenny/proxy/DemoTunerProxy.h"
#include "jenny/proxy/RadioServiceDemoProxy.h"
#ifndef WIN32
#include <__bit_reference>
#include <sys/endian.h>
#else
#if defined(__MINGW32__) || defined(__MINGW64__)
#define htonq(x) __builtin_bswap64(x)
#define ntohq(x) __builtin_bswap64(x)
#endif
#endif
#include "demousbtunerinput.h"

const std::string DemoUsbTunerInput::DEMO_DEVICE_NAME = "DemoDevice";

DemoUsbTunerInput::DemoUsbTunerInput(JavaVM* javaVm, jobject demoTuner): m_demoTunerObject(demoTuner) {
    std::cout << LOG_TAG << "Constructing...." << std::endl;
    m_javaVm = javaVm;

    m_ensembleFinishedCb = DabEnsemble::registerEnsembleCollectDoneCallback(std::bind(&DemoUsbTunerInput::ensembleCollectFinished, this));
}

DemoUsbTunerInput::~DemoUsbTunerInput() {
    std::cout << LOG_TAG << "Destructing...." << std::endl;

    stopAllRunningServices();

    if (m_ensembleFinishedCb != nullptr) {
        m_ensembleFinishedCb.reset();
        m_ensembleFinishedCb = nullptr;
    }
}

void DemoUsbTunerInput::initialize() {
    m_isInitialized = true;
}

void DemoUsbTunerInput::deInitialize() {
    m_isInitialized = false;
}

bool DemoUsbTunerInput::isInitialized() const {
    return m_isInitialized;
}

uint32_t DemoUsbTunerInput::getCurrentTunedFrequency() const {
    return m_currentFrequency;
}

void DemoUsbTunerInput::tuneFrequency(uint32_t frequencyKHz) {
    std::cout << LOG_TAG << "Demo Tuning Frequency: " << +frequencyKHz << " kHz" << std::endl;
    m_currentFrequency = static_cast<uint32_t>(frequencyKHz);
    m_ensembleFrequency = static_cast<uint32_t>(frequencyKHz);
}

const DabEnsemble &DemoUsbTunerInput::getEnsemble() const {
    return *this;
}

int DemoUsbTunerInput::getMaximumConcurrentSubChannels() const {
    return MAXIMUM_CONCURRENT_SUBCHANNELS;
}

void DemoUsbTunerInput::addMscCallback(DabInput::CallbackFunction cb, uint8_t subchanId) {
}

void DemoUsbTunerInput::addFicCallback(DabInput::CallbackFunction cb) {
}

void DemoUsbTunerInput::startService(std::shared_ptr<JDabService>& serviceLink) {
    if (serviceLink != nullptr) {
        // stop any running service
        stopAllRunningServices();

        // reset all DabEnsemble information
        reset();

        // need to refer to serviceLink, otherwise it may be destroyed
        m_startServiceLink = serviceLink;

        jenny::LocalRef javaDabServiceObject = serviceLink->getJavaDabServiceObject();
        if (javaDabServiceObject.get() != nullptr) {
            std::string description = callJavaRadioServiceGetDescription(javaDabServiceObject);
            std::cout << LOG_TAG << "startService " << description << std::endl;

            m_ensembleCollectFinished = false;
            tuneFrequency(serviceLink->getEnsembleFrequency());

            inputStreamOpen(description); // description contains the absolute filename
            readDataThreadStart();
        } else {
            std::clog << LOG_TAG << "startService: object null" << std::endl;
        }
    } else {
        std::clog << LOG_TAG << "startService: serviceLink null" << std::endl;
    }
}
std::shared_ptr<JDabService>& DemoUsbTunerInput::getStartedService() {
    return m_startServiceLink;
}

void DemoUsbTunerInput::ensembleCollectFinished() {
    std::cout << LOG_TAG << "Ensemble collect finished" << std::endl;
    setService();
}

void DemoUsbTunerInput::setService() {
    auto & service = m_startServiceLink;
    if(service != nullptr) {
        std::cout << LOG_TAG << "Starting service 0x" << std::hex
            << +service->getServiceId() << std::dec << std::endl;

        bool foundSId = false, foundSrvComp = false;

        for(const auto& srv : getDabServices()) {
            if(srv->getServiceId() == service->getServiceId()) {
                service->setLinkDabService(srv);

                for (const auto& srvComp : srv->getServiceComponents()) {
                    if((srvComp->getServiceComponentType() == DabServiceComponent::MSC_STREAM_AUDIO) &&
                       (srvComp->isPrimary() || srv->getNumberServiceComponents() == 1)) {
                        std::cout << LOG_TAG << "Starting SubChanId: " << +srvComp->getSubChannelId() << std::endl;
                        m_currentSubchanId = srvComp->getSubChannelId();

                        service->decodeAudio(true);
                        foundSrvComp = true;
                        break;
                    }
                }
                foundSId = true;
                break;
            }
        }

        if (!foundSId) {
            std::clog << LOG_TAG << "setService: not found SId " << std::hex
                      << +service->getServiceId() << std::dec << std::endl;
        } else if (!foundSrvComp) {
            std::clog << LOG_TAG << "setService: not found primary srv " << std::hex
                      << +service->getServiceId() << std::dec << std::endl;
        }
    } else {
        std::clog << LOG_TAG << "setService: nullptr" << std::endl;
    }
}

void DemoUsbTunerInput::stopService(const DabService &service) {
    std::cout << LOG_TAG << "stopService" << std::endl;
    stopAllRunningServices();
}

void DemoUsbTunerInput::stopAllRunningServices() {
    readDataThreadStop();
    inputStreamClose();
    auto & service = m_startServiceLink;
    if (service != nullptr) {
        auto radioService = service->getJavaDabServiceObject();
        if (radioService.get() != nullptr) {
            serviceStopped(radioService);
        }
        service->decodeAudio(false);
        service->unlinkDabService();
        m_startServiceLink.reset();
        m_startServiceLink = nullptr;
    }
}

void DemoUsbTunerInput::startServiceScan() {
    std::cout << LOG_TAG << "startServiceScan not supported" << std::endl;
}

void DemoUsbTunerInput::stopServiceScan() {
    std::cout << LOG_TAG << "stopServiceScan not supported" << std::endl;
}

std::string DemoUsbTunerInput::getDeviceName() {
    return DEMO_DEVICE_NAME;
}

std::vector<std::shared_ptr<LinkedServiceDab>>
DemoUsbTunerInput::getLinkedServices(const LinkedServiceDab &service) {
    return getLinkedDabServices(service);
}

void DemoUsbTunerInput::serviceStarted(jenny::LocalRef<jobject>& radioService) {
    if (radioService.get() != nullptr && m_demoTunerObject.get() != nullptr) {
        JNIEnv *enve = jenny::Env().get();
        DemoTunerProxy::serviceStarted(enve, m_demoTunerObject.get(), radioService.get());
    }
}

void DemoUsbTunerInput::serviceStopped(jenny::LocalRef<jobject>& radioService) {
    if (radioService.get() != nullptr && m_demoTunerObject.get() != nullptr) {
        JNIEnv *enve = jenny::Env().get();
        DemoTunerProxy::serviceStopped(enve, m_demoTunerObject.get(), radioService.get());
    }
}

std::string DemoUsbTunerInput::callJavaRadioServiceGetDescription(jenny::LocalRef<jobject>& radioService) {
    std::string retString;
    if (radioService.get() != nullptr) {
        JNIEnv *enve = jenny::Env().get();
        retString = jenny::fromJavaString(enve, RadioServiceDemoProxy::filePath(enve, radioService.get()));
    }

    return retString;
}


/**
 * Private methods
 */

void DemoUsbTunerInput::readDataThreadStart() {
    if (m_readThread != nullptr) {
        readDataThreadStop();
    }
    m_readThreadRunning = true;
    m_readThread = new DabThread([this] () { readThreadProc(); });
}

void DemoUsbTunerInput::readDataThreadStop() {
    if (m_readThread != nullptr && m_readThreadRunning) {
        m_readThreadRunning = false;
        if (m_readThread->joinable()) {
            m_readThread->join();
        }
        delete m_readThread;
        m_readThread = nullptr;
    }
}

void DemoUsbTunerInput::readThreadProc() {
    pthread_setname_np(pthread_self(), "DemoTunerRead");

    if (m_startServiceLink == nullptr) {
        m_readThreadRunning = false;
        std::clog << LOG_TAG << "readThreadProc: startServiceLink null" << std::endl;
        return;
    }
    jenny::LocalRef radioService = m_startServiceLink->getJavaDabServiceObject();

    if (radioService.get() == nullptr) {
        m_readThreadRunning = false;
        std::clog << LOG_TAG << "readThreadProc: radioService null" << std::endl;
        return;
    }
    if (m_inFileStream.bad()) {
        m_readThreadRunning = false;
        std::clog << LOG_TAG << "readThreadProc: input stream bad" << std::endl;
        return;
    }
    if (!m_inFileStream.is_open()) {
        m_readThreadRunning = false;
        std::clog << LOG_TAG << "readThreadProc: input stream not open" << std::endl;
        return;
    }

    serviceStarted(radioService);

    // buffer for reading from file (except for the actual huge data)
    char buffer[8]; // biggest element to buffer is a uint64_t
    uint64_t prevFileTimeMs;
    uint32_t frameCount;
    bool error_occured;

    // label to use for returning to begin of file when EOF was reached
file_at_beginning:

    m_inFileStream.clear();
    m_inFileStream.seekg(0, m_inFileStream.beg);
    prevFileTimeMs = 0;
    frameCount = 0;  // for logging purpose only
    error_occured = false;

    while (m_readThreadRunning && !m_inFileStream.eof()) {
        uint32_t marker, dataSize;
        uint64_t fileTimeMs;
        int64_t filePos;
        auto timeBeforeFrame = std::chrono::steady_clock::now();

        if (error_occured) { // in previous loop !
            // to be able to see logs online
            std::this_thread::sleep_for(std::chrono::milliseconds(1000));
            error_occured = false;
        }

        frameCount++;
        filePos = m_inFileStream.tellg();

        // read marker
        m_inFileStream.read(buffer, sizeof(uint32_t));
        if (m_inFileStream.bad()) {
            std::clog << LOG_TAG << "readThreadProc: failed to read marker"
                << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
            error_occured = true;
            continue;
        }
        marker = ntohl(*((uint32_t*)&buffer[0]));

        // read recording timestamp in millisec (monotonic)
        m_inFileStream.read(buffer, sizeof(uint64_t));
        if (m_inFileStream.bad()) {
            std::clog << LOG_TAG << "readThreadProc: failed to read timestamp"
                    << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
            error_occured = true;
            continue;
        }
        fileTimeMs = ntohq(*((uint64_t*)&buffer[0]));
        if (prevFileTimeMs == 0) {
            prevFileTimeMs = fileTimeMs; // first loop
        } else if (prevFileTimeMs > fileTimeMs) {
            std::clog << LOG_TAG << "readThreadProc: file timestamp " << fileTimeMs
                    << " lower than previous " << prevFileTimeMs
                    << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
            error_occured = true;
            continue;
        }

        // read data vector size
        m_inFileStream.read(buffer, sizeof(uint32_t));
        if (m_inFileStream.bad()) {
            std::clog << LOG_TAG << "readThreadProc: failed to read data len"
                    << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
            error_occured = true;
            continue;
        }
        dataSize = ntohl(*((uint32_t*)&buffer[0]));
        if (dataSize > 100*1024) { // 100 KB is implausible
            std::clog << LOG_TAG << "readThreadProc: data size implausible" << dataSize
                      << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
            error_occured = true;
            continue;
        }

        if (dataSize > 0) {
            // read data vector
            std::vector<uint8_t> vec(dataSize);
            m_inFileStream.read((char*)vec.data(), dataSize);
            if (m_inFileStream.bad()) {
                std::clog << LOG_TAG << "readThreadProc: failed to read data of size "
                          << dataSize
                          << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
                if (vec.size() >= 3) {
                    std::clog << LOG_TAG << "readThreadProc: data 0..2: " << std::hex
                              << +vec[0] << " " << +vec[1] << " " << +vec[2] << std::dec << std::endl;
                }
                error_occured = true;
                continue;
            }

            // log every 100th frame
            if (frameCount % 100 == 1) { // 1 because we start counting frames at 1, not 0
                std::cout << LOG_TAG << "readThreadProc frame " << frameCount
                          << " @filepos " << filePos
                          << ": marker " << std::hex << marker << std::dec
                          << ", time " << fileTimeMs
                          << ", size " << dataSize;
                if (vec.size() >= 3) {
                    std::cout<< ", data 0..2: 0x" << std::hex
                              << +vec[0] << " " << +vec[1] << " " << +vec[2] << std::dec;
                }
                std::cout << std::endl;
            }

            if (FILEMARKER_MSC == marker) {
                dataInput(vec, m_currentSubchanId, false);
            } else if (FILEMARKER_FIC == marker) {
                dataInput(vec, 0x64, false);
            } else {
                std::clog << LOG_TAG << "readThreadProc: invalid marker 0x" << std::hex << marker << std::dec
                          << " at file pos " << std::dec << m_inFileStream.tellg() << std::endl;
                error_occured = true;
                continue;
            }
        }

        // throttle reading from file to best match with the recording time sequence
        auto timeAfterFrame = std::chrono::steady_clock::now();
        int64_t frameProcessDurationMs = std::chrono::duration_cast<std::chrono::milliseconds>
                (timeAfterFrame - timeBeforeFrame).count();
        int64_t sleepForMs = fileTimeMs - prevFileTimeMs;
        if (sleepForMs > frameProcessDurationMs) { // don't allow to get negative sleepForMs
            sleepForMs -= frameProcessDurationMs;
        }
        if (sleepForMs > 100) {
            sleepForMs -= 50; // be slightly faster than realtime to mitigate stuttering
        }
        if (sleepForMs >= 0) {
            std::this_thread::sleep_for(std::chrono::milliseconds(sleepForMs));
        } else {
            std::clog << LOG_TAG << "readThreadProc: timestamp diff implausible " << sleepForMs << std::endl;
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
        }
        prevFileTimeMs = fileTimeMs;
    }

    if (m_inFileStream.eof() && m_readThreadRunning) {
        std::cout << LOG_TAG << "readThreadProc: EOF, rewinding ..." << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        reset();
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        goto file_at_beginning;
    }

    m_readThreadRunning = false;
}

void DemoUsbTunerInput::inputStreamOpen(const std::string & filename) {
    inputStreamClose();
    m_inFileStream.open(filename, std::ios::in | std::ios::binary);
    // Stop eating new lines in binary mode
    m_inFileStream.unsetf(std::ios::skipws);
}

void DemoUsbTunerInput::inputStreamClose() {
    if (m_inFileStream.is_open()) {
        m_inFileStream.close();
    }
}

libusb_device * DemoUsbTunerInput::getDeviceHandle() const {
    return (libusb_device*)-1;
}
