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

#include <jni.h>

#include <memory>
#include <string>
#include <vector>
#include <memory>

#include "jtunerusbdevice.h"
#include "jusbdevice.h"
#include "raontunerinput.h"
#include "ediinput.h"

extern "C" {

const std::string LOG_TAG{"UsbHelperNative"};

std::vector<std::shared_ptr<JUsbDevice>> m_usbDevices;

std::vector<std::unique_ptr<DabUsbTunerInput>> m_dabInputs;

JavaVM* m_javaVm;

jclass m_usbTunerClass = nullptr;
jclass m_dabServiceClass = nullptr;
jclass m_dabServiceComponentClass = nullptr;
jclass m_dabServiceUserApplicationClass = nullptr;
jclass m_termIdClass = nullptr;
jclass m_dynamicLabelClass = nullptr;
jclass m_dynamicLabelPlusItemClass = nullptr;
jclass m_slideshowClass = nullptr;

jclass m_ediTunerClass = nullptr;
jclass m_dabTimeClass = nullptr;

void cacheClassDefinitions(JavaVM *vm) {
    JNIEnv* env;
    vm->GetEnv ((void **) &env, JNI_VERSION_1_6);

    m_usbTunerClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TunerUsb"));
    m_dabServiceClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/RadioServiceDabImpl"));
    m_dabServiceComponentClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/RadioServiceDabComponentImpl"));
    m_dabServiceUserApplicationClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/RadioServiceDabUserApplicationImpl"));

    //Metadata classes
    m_termIdClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TermIdImpl"));
    m_dynamicLabelClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TextualDabDynamicLabelImpl"));
    m_dynamicLabelPlusItemClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TextualDabDynamicLabelPlusItemImpl"));
    m_slideshowClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/VisualDabSlideShowImpl"));

    m_ediTunerClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TunerEdistream"));
    //DABtime class
    m_dabTimeClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/DabTime"));
}

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    //sets the redirect stream for logcat logging...should be deleted at cleanup with
    //delete std::cout.rdbuf(0);

    //TODO set to enable debug output
#ifdef DEBUGOUTPUT
//    std::cout.rdbuf(new androidlogbuf);
#endif

    JNIEnv* env;
    vm->GetEnv((void **)&env, JNI_VERSION_1_6);
    env->GetJavaVM(&m_javaVm);

    cacheClassDefinitions(m_javaVm);

    return JNI_VERSION_1_6;
}


JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_created(JNIEnv* env, jobject thiz) {
    std::cout << LOG_TAG << " created!" << std::endl;
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_detachDevice(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);
    auto bla = m_dabInputs.begin();
    while(bla < m_dabInputs.end()) {
        if(bla->get()->getDeviceHandle() == device_handle) {
            std::cout << LOG_TAG << " Removing UsbTunerInput: " << " : " << bla->get()->getDeviceName() << std::endl;
            m_dabInputs.erase(bla);
            break;
        }
        ++bla;
    }

    auto devIter = m_usbDevices.cbegin();
    while(devIter != m_usbDevices.cend()) {
        if(devIter->get()->device_handle() == device_handle) {
            std::cout << LOG_TAG << " Removing device: " << devIter->get()->getDeviceName() << std::endl;
            m_usbDevices.erase(devIter);
            break;
        }
        ++devIter;
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_deviceAttached(JNIEnv* env, jobject thiz, jobject usbDevice, jlong libusbDevice) {
    std::cout << LOG_TAG << " Device attached!" << std::endl;

    std::shared_ptr<JTunerUsbDevice> jusbDevice = std::make_shared<JTunerUsbDevice>(m_javaVm, env, usbDevice, reinterpret_cast<libusb_device *>(libusbDevice));

    jusbDevice->setJavaClassUsbTuner(env, m_usbTunerClass);
    jusbDevice->setJavaClassDabService(env, m_dabServiceClass);
    jusbDevice->setJavaClassDabServiceComponent(env, m_dabServiceComponentClass);
    jusbDevice->setJavaClassDabServiceUserApplication(env, m_dabServiceUserApplicationClass);
    jusbDevice->setJavaClassTermId(env, m_termIdClass);

    m_usbDevices.push_back(jusbDevice);

    uint16_t prodId = jusbDevice->getProductId();
    uint16_t vendId = jusbDevice->getVendorId();

    if(vendId == 0x16C0 && prodId == 0x05DC) {
        m_dabInputs.push_back(std::unique_ptr<RaonTunerInput>(new RaonTunerInput(jusbDevice)));
    };
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_startSrv(JNIEnv* env, jobject thiz, jlong libusbDevice, jobject dabService) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);
    std::cout << LOG_TAG << " UsbHelper starting service for Device: " << libusbDevice << std::endl;

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->startService(std::move(std::shared_ptr<JDabService>(new JDabService(m_javaVm, env, m_dabServiceClass, m_dynamicLabelClass, m_dynamicLabelPlusItemClass, m_slideshowClass, dabService))));
            break;
        }
        devIter++;
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_stopSrv(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);
    std::cout << LOG_TAG << " UsbHelper stopping service!" << std::endl;

    std::cout << LOG_TAG << " UsbHelper stopping service on device: " << libusbDevice << std::endl;

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->stopAllRunningServices();
            break;
        }
        devIter++;
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_tuneFreq(JNIEnv* env, jobject thiz, jlong libusbDevice, jlong freq) {
    std::cout << LOG_TAG << " UsbHelper starting service!" << std::endl;
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);
    //TODO
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_startServiceScan(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    std::cout << LOG_TAG << " UsbHelper starting serviceScan on device: " << libusbDevice << std::endl;

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->startServiceScan();
            break;
        }
        devIter++;
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_stopServiceScan(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    std::cout << LOG_TAG << " UsbHelper stopping serviceScan on device: " << libusbDevice << std::endl;

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->stopServiceScan();
            break;
        }
        devIter++;
    }
}


}