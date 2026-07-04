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

#include <iomanip>
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

//jclass m_ediTunerClass = nullptr;
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

    //m_ediTunerClass = (jclass)env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TunerEdistream"));
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


JNIEXPORT jboolean JNICALL Java_org_omri_radio_impl_UsbHelper_created(JNIEnv* env, jobject thiz) {
    std::cout << LOG_TAG << " created!" << std::endl;
    int r = libusb_init(nullptr);
    if (r == 0) {
        return JNI_TRUE;
    }
    std::cout << LOG_TAG << " error in libusb init! " << r << std::endl;
    return JNI_FALSE;
}

    void print_device_endpoints(libusb_device *dev) {
    // 1. Get the configuration descriptor
    libusb_config_descriptor *config;
    int r = libusb_get_config_descriptor(dev, 0, &config); // Index 0 = default config
    if (r < 0) {
        std::cerr << "Failed to get config descriptor" << std::endl;
        return;
    }

    // 2. Iterate through interfaces
    for (uint8_t i = 0; i < config->bNumInterfaces; i++) {
        const libusb_interface &interface = config->interface[i];

        // 3. Iterate through alternate settings
        for (int j = 0; j < interface.num_altsetting; j++) {
            const libusb_interface_descriptor &interdesc = interface.altsetting[j];

            std::cout << "Interface " << (int)interdesc.bInterfaceNumber
                      << " (Alt Setting " << (int)interdesc.bAlternateSetting << "):\n";
            std::cout << "  Number of endpoints: " << (int)interdesc.bNumEndpoints << "\n";

            // 4. Iterate through endpoints
            for (int k = 0; k < (int)interdesc.bNumEndpoints; k++) {
                const libusb_endpoint_descriptor &epdesc = interdesc.endpoint[k];

                // Get Endpoint Address & Direction
                uint8_t ep_addr = epdesc.bEndpointAddress;
                bool is_in = (ep_addr & LIBUSB_ENDPOINT_IN) != 0; // 0x80 mask

                // Get Transfer Type (Bulk, Interrupt, Isochronous, Control)
                uint8_t transfer_type = epdesc.bmAttributes & LIBUSB_TRANSFER_TYPE_MASK; // 0x03 mask

                std::cout << "    - Endpoint Address: 0x"
                          << std::hex << std::setw(2) << std::setfill('0') << (int)ep_addr << std::dec;
                std::cout << (is_in ? " [IN]" : " [OUT]");

                switch (transfer_type) {
                    case LIBUSB_TRANSFER_TYPE_CONTROL:     std::cout << " (Control)\n"; break;
                    case LIBUSB_TRANSFER_TYPE_ISOCHRONOUS: std::cout << " (Isochronous)\n"; break;
                    case LIBUSB_TRANSFER_TYPE_BULK:        std::cout << " (Bulk)\n"; break;
                    case LIBUSB_TRANSFER_TYPE_INTERRUPT:   std::cout << " (Interrupt)\n"; break;
                    default: std::cout << " (UNKNOWN)\n"; break;
                }
                std::cout << "      Max Packet Size: " << epdesc.wMaxPacketSize << " bytes\n";
            }
        }
    }

    // 5. Always free the configuration descriptor
    libusb_free_config_descriptor(config);
}

JNIEXPORT jlongArray JNICALL Java_org_omri_radio_impl_UsbHelper_scanDevices(JNIEnv * env, jobject thiz) {
    libusb_device **devices;
    int numdevices = libusb_get_device_list(NULL, &devices);
    std::cout << "found " << numdevices << " devices" << std::endl;
    std::vector<jlong> javaPointers;
    libusb_device_descriptor desc;
    for (int i = 0; i < numdevices; ++i) {

        libusb_device *dev = devices[i];
        libusb_get_device_descriptor(dev, &desc);

        //std::cout << "V " << std::hex << desc.idVendor << " P " << desc.idProduct << std::endl;

        if (desc.idVendor == 0x16C0 && desc.idProduct == 0x05DC) {
            javaPointers.push_back(reinterpret_cast<jlong>(dev));
            libusb_ref_device(dev);

            print_device_endpoints(dev);
        }
    }
    jlongArray javaArray = env->NewLongArray(javaPointers.size());
    if (javaArray == NULL) {
        return NULL; // Out of memory exception thrown automatically
    }
    if (javaPointers.size()) {
        env->SetLongArrayRegion(javaArray, 0, javaPointers.size(), javaPointers.data());
    }
    libusb_free_device_list(devices, 1);

    return javaArray;
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

    auto device = reinterpret_cast<libusb_device *>(libusbDevice);
    std::cout << LOG_TAG << " after reinterpret" << std::endl;

    std::shared_ptr<JTunerUsbDevice> jusbDevice = std::make_shared<JTunerUsbDevice>(m_javaVm, env, usbDevice, device);
    std::cout << LOG_TAG << " made JTunerUsbDevice" << std::endl;

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