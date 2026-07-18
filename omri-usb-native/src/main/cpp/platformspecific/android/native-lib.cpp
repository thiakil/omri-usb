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
#include <org_omri_radio_impl_UsbHelper.h>
#include "jenny/proxy/jenny_fusion_proxies.h"
#include "jnihelper.h"

#include "log4jbridge.h"
#include "stdoutbridge.h"
#include "demousbtunerinput.h"
#include "jni-helper.h"
#include "jtunerusbdevice.h"
#include "jusbdevice.h"
#include "raontunerinput.h"

extern "C" {

const static std::string LOG_TAG{"UsbHelperNative"};

static std::vector<std::shared_ptr<JUsbDevice>> m_usbDevices;

static std::vector<std::unique_ptr<DabUsbTunerInput>> m_dabInputs;

static JavaVM *m_javaVm = nullptr;

static jboolean m_CoutRedirectedToALog = JNI_FALSE;
static std::string m_rawRecordingPath;

static LogRedirector * clogDirector;
static LogRedirector * cerrDirector;
static LogRedirector * coutDirector;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env;
    if (vm != nullptr) {
        if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
            return JNI_ERR;
        }
        env->GetJavaVM(&m_javaVm);
    } else {
        std::cerr << LOG_TAG << "JNI_OnLoad: vm null" << std::endl;
        return JNI_ERR;
    }
    jenny::Env::attachJvm(m_javaVm);
    jenny::initAllProxies(env);
    Log4JLogger::getInstance().init(m_javaVm, env);
    //clogDirector = new LogRedirector(LOGLEVEL_WARN);
    //cerrDirector = new LogRedirector(LOGLEVEL_ERROR);
    coutDirector = new LogRedirector(LOGLEVEL_DEBUG);
    //sets the redirect stream for logcat logging
    std::clog.rdbuf(clogDirector);
    std::cerr.rdbuf(cerrDirector);
    std::cout.rdbuf(coutDirector);
    return JNI_VERSION_1_6;
}

JNIEXPORT void JNI_OnUnload(JavaVM *vm, void *reserved) {
    std::clog << LOG_TAG << " OnUnload" << std::endl;

    JNIEnv *env;
    vm->GetEnv((void **) &env, JNI_VERSION_1_6);
    env->GetJavaVM(&m_javaVm);

    if (coutDirector) {
        std::cout.rdbuf(nullptr);
        delete coutDirector;
    }
    if (cerrDirector) {
        std::cerr.rdbuf(nullptr);
        delete cerrDirector;
    }
    if (clogDirector) {
        std::clog.rdbuf(nullptr);
        delete clogDirector;
    }
}


JNIEXPORT jboolean JNICALL Java_org_omri_radio_impl_UsbHelper_created(JNIEnv *env, jobject thiz,
                                                                  jstring rawRecordingPath = nullptr) {
    int r = libusb_init(nullptr);
    if (r != 0) {
        LOG_ERROR(LOG_TAG.c_str(), std::string("error in libusb init! ") + libusb_error_name(r));
        return JNI_FALSE;
    }

    if (rawRecordingPath != nullptr) {
        m_rawRecordingPath = jenny::fromJavaString(env, rawRecordingPath);
    }
    std::cout << LOG_TAG << " created (redirectCout="
              << std::boolalpha << (JNI_TRUE == m_CoutRedirectedToALog) << std::noboolalpha
              << ",rawRecordingPath=" << m_rawRecordingPath
              << ")" << std::endl;

    return JNI_TRUE;
}


void print_device_endpoints(libusb_device *dev) {
    // 1. Get the configuration descriptor
    libusb_config_descriptor *config;
    int r = libusb_get_config_descriptor(dev, 0, &config); // Index 0 = default config
    if (r < 0) {
        LOG_ERROR(LOG_TAG.c_str(), std::string("Failed to get config descriptor") + libusb_error_name(r));
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
    ssize_t numdevices = libusb_get_device_list(NULL, &devices);
    std::vector<jlong> javaPointers;
    libusb_device_descriptor desc{};
    for (int i = 0; i < numdevices; ++i) {

        libusb_device *dev = devices[i];
        libusb_get_device_descriptor(dev, &desc);

        //std::cout << "V " << std::hex << desc.idVendor << " P " << desc.idProduct << std::endl;

        if (desc.idVendor == 0x16C0 && desc.idProduct == 0x05DC) {
            javaPointers.push_back(reinterpret_cast<jlong>(dev));
            libusb_ref_device(dev);

            //print_device_endpoints(dev);
        }
    }
    jlongArray javaArray = env->NewLongArray(javaPointers.size());
    if (javaArray == NULL) {
        return NULL; // Out of memory exception thrown automatically
    }
    if (!javaPointers.empty()) {
        env->SetLongArrayRegion(javaArray, 0, javaPointers.size(), javaPointers.data());
    }
    libusb_free_device_list(devices, 1);

    return javaArray;
}

JNIEXPORT void JNICALL
Java_org_omri_radio_impl_UsbHelper_detachDevice(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);
    auto bla = m_dabInputs.begin();
    while(bla < m_dabInputs.end()) {
        if(bla->get() != nullptr && bla->get()->getDeviceHandle() == device_handle) {
            LOG_DEBUG(LOG_TAG.c_str(),  std::format("Removing UsbTunerInput: {}", bla->get()->getDeviceName()));
            bla->get()->deInitialize();
            m_dabInputs.erase(bla);
            break;
        }
        ++bla;
    }

    auto devIter = m_usbDevices.cbegin();
    while(devIter != m_usbDevices.cend()) {
        if(devIter->get() != nullptr && devIter->get()->device_handle() == device_handle) {
            LOG_DEBUG(LOG_TAG.c_str(),  std::format("Removing device: {}", devIter->get()->getDeviceName()));
            m_usbDevices.erase(devIter);
            break;
        }
        ++devIter;
    }
}

JNIEXPORT void JNICALL
Java_org_omri_radio_impl_UsbHelper_deviceAttached(JNIEnv* env, jobject thiz, jobject usbDevice, jlong libusbDevice) {
    auto device = reinterpret_cast<libusb_device *>(libusbDevice);
    std::shared_ptr<JTunerUsbDevice> jusbDevice = std::make_shared<JTunerUsbDevice>(env, usbDevice, device);

    m_usbDevices.push_back(jusbDevice);

    uint16_t prodId = jusbDevice->getProductId();
    uint16_t vendId = jusbDevice->getVendorId();

    if (vendId == 0x16C0 && prodId == 0x05DC) {
        m_dabInputs.push_back(std::unique_ptr<RaonTunerInput>(
                new RaonTunerInput(jusbDevice, m_rawRecordingPath)));
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_startSrv(JNIEnv* env, jobject thiz, jlong libusbDevice, jobject dabService) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);
    LOG_DEBUG(LOG_TAG.c_str(),  std::format("UsbHelper starting service for Device: {}", libusbDevice));

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {
            std::shared_ptr<JDabService> sharedPtr = std::make_shared<JDabService>(m_javaVm, env,
                                                                                   dabService);
            (*devIter).get()->startService(sharedPtr);
            break;
        }
        devIter++;
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_stopSrv(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    LOG_DEBUG(LOG_TAG.c_str(),  std::format("UsbHelper stopping service on device: {}", libusbDevice));

    auto devIter = m_dabInputs.cbegin();
    boolean found = false;
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->stopAllRunningServices();
            found = true;
            break;
        }
        devIter++;
    }
    if (!found) {
        LOG_ERROR(LOG_TAG.c_str(),  std::format("Device not found: {}", libusbDevice));
    }
}


JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_tuneFreq(JNIEnv* env, jobject thiz, jlong libusbDevice, jlong freq) {
   
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    std::cerr << LOG_TAG << " tuning to frequency not implemented!" << std::endl;

    //TODO UsbHelper.tuneFreq
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_startServiceScan(JNIEnv* env, jobject thiz, jlong libusbDevice) {

    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    LOG_DEBUG(LOG_TAG.c_str(),  std::format("UsbHelper starting serviceScan on device: {}", libusbDevice));

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->startServiceScan();
            break;
        }
        devIter++;
    }
}

JNIEXPORT void JNICALL Java_org_omri_radio_impl_UsbHelper_stopServiceScan(JNIEnv* env, jobject thiz, jlong libusbDevice) {
    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    LOG_DEBUG(LOG_TAG.c_str(),  std::format("UsbHelper stopping serviceScan on device: {}", libusbDevice));

    auto devIter = m_dabInputs.cbegin();
    while(devIter != m_dabInputs.cend()) {
        if(devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {
            (*devIter).get()->stopServiceScan();
            break;
        }
        devIter++;
    }
}

JNIEXPORT jobject JNICALL
Java_org_omri_radio_impl_UsbHelper_getLinkedServices(JNIEnv *env, jobject thiz, jlong libusbDevice,
                                                     jobject dabService) {

    jobject retObj = nullptr;

    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    std::cout << LOG_TAG << " getting service linking services for device: " << device_handle
              << std::endl;

    auto devIter = m_dabInputs.cbegin();
    while (devIter != m_dabInputs.cend()) {
        if (devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {

            // convert Java input RadioServiceDab dabService via JDabService to a LinkedServiceDab
            JDabService jDabService(m_javaVm, env, dabService);
            jenny::LocalRef inputServiceLabel(RadioServiceDabNativeProxy::getServiceLabel(env, dabService));

            bool isProgrammeService = false;
            const auto & service = jDabService.getLinkDabService();
            if (service != nullptr) {
                isProgrammeService = service->hasAudioServiceComponent();
            }

            LinkedServiceDab inputService(jDabService.getEnsembleEcc(),
                                          jDabService.getServiceId(),
                                          jDabService.getEnsembleId(),
                                          jDabService.getEnsembleFrequency() / 1000,
                                          isProgrammeService);
            // retrieve data
            auto retServices = devIter->get()->getLinkedServices(inputService);

            // build output return data
            retObj = NativeHelperProxy::newList(env, retServices.size());
            for (const auto &s : retServices) {

                jenny::LocalRef<jobject> jLinkedServiceDab(RadioServiceDabNativeProxy::newInstance(env));
                RadioServiceDabNativeProxy::setEnsembleEcc(env, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getEnsembleEcc()));
                RadioServiceDabNativeProxy::setEnsembleFrequency(env, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getEnsembleFrequencyKHz() * 1000));
                RadioServiceDabNativeProxy::setEnsembleId(env, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getEnsembleId()));
                RadioServiceDabNativeProxy::setServiceId(env, jLinkedServiceDab.get(),
                                    static_cast<jint>(s.get()->getServiceId()));
                RadioServiceDabNativeProxy::setIsProgrammeService(env, jLinkedServiceDab.get(),
                                    static_cast<jboolean>(s.get()->getIsProgrammeService()));
                // assume that all such services have the same Service Label as the requested service
                if (inputServiceLabel.get() != nullptr) {
                    RadioServiceDabNativeProxy::setServiceLabel(env, jLinkedServiceDab.get(),
                                        inputServiceLabel.get());
                }

                NativeHelperProxy::listAdd(env, retObj, jLinkedServiceDab.get());
            }
            break;
        }
    }

    return retObj;
}

JNIEXPORT jstring JNICALL
Java_org_omri_radio_impl_UsbHelper_getHardwareVersion(JNIEnv *env, jobject thiz,
                                                      jlong libusbDevice) {

    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    std::string hardwareVersion;
    auto devIter = m_dabInputs.cbegin();
    while (devIter != m_dabInputs.cend()) {
        if (devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {
            hardwareVersion = (*devIter).get()->getHardwareVersion();
            std::cout << LOG_TAG << " hardware version of device: " << device_handle << " : " << hardwareVersion << std::endl;
            break;
        }
    }

    jstring retString = getSafeJniStringFromCString(env,
                                                    hardwareVersion.c_str(),
                                                    hardwareVersion.size());

    return retString;
}

JNIEXPORT jstring JNICALL
Java_org_omri_radio_impl_UsbHelper_getSoftwareVersion(JNIEnv *env, jobject thiz,
                                                      jlong libusbDevice) {

    auto* device_handle = reinterpret_cast<libusb_device *>(libusbDevice);

    std::string softwareVersion;
    auto devIter = m_dabInputs.cbegin();
    while (devIter != m_dabInputs.cend()) {
        if (devIter->get() != nullptr && devIter->get()->getDeviceHandle() == device_handle) {
            softwareVersion = (*devIter).get()->getSoftwareVersion();
            std::cout << LOG_TAG << " software version of device: " << device_handle << " : " << softwareVersion << std::endl;
            break;
        }
    }

    jstring retString = getSafeJniStringFromCString(env,
                                                    softwareVersion.c_str(),
                                                    softwareVersion.size());

    return retString;
}

/* Demo Tuner */
static std::unique_ptr<DemoUsbTunerInput> m_demoInput = nullptr;

JNIEXPORT void JNICALL
Java_org_omri_radio_impl_UsbHelper_demoTunerAttached(JNIEnv *env, jobject thiz, jobject demoTuner) {

    if (m_demoInput == nullptr) {
        std::cout << LOG_TAG << "DemoTuner attached" << std::endl;
        DemoUsbTunerInput* demoUsbTunerInput = new DemoUsbTunerInput(m_javaVm, demoTuner);
        m_demoInput = std::unique_ptr<DemoUsbTunerInput>(demoUsbTunerInput);

        m_dabInputs.push_back(std::unique_ptr<DemoUsbTunerInput>(demoUsbTunerInput));
    } else {
        std::cerr << LOG_TAG << "DemoTuner already attached" << std::endl;
    }
}

JNIEXPORT void JNICALL
Java_org_omri_radio_impl_UsbHelper_demoTunerDetached(JNIEnv *env, jobject thiz, jobject demoTuner) {

    std::cout << LOG_TAG << "DemoTuner detached" << std::endl;

    auto bla = m_dabInputs.begin();
    while (bla != m_dabInputs.end()) {
        if (bla->get() != nullptr && bla->get()->getDeviceName() == DemoUsbTunerInput::DEMO_DEVICE_NAME) {
            bla->get()->deInitialize();
            m_dabInputs.erase(bla);
            break;
        }
        bla++;
    }

    if (m_demoInput != nullptr) {
        m_demoInput.release();
        m_demoInput = nullptr;
    }
}

JNIEXPORT void JNICALL
Java_org_omri_radio_impl_UsbHelper_demoServiceStart(JNIEnv *env, jobject thiz,
                                                    jobject radioService) {

    if (m_demoInput != nullptr) {
        std::shared_ptr<JDabService> service = std::make_shared<JDabService>(m_javaVm, env,
                                                                             radioService);
        m_demoInput->startService(service);
    }
}

JNIEXPORT void JNICALL
Java_org_omri_radio_impl_UsbHelper_demoServiceStop(JNIEnv *env, jobject thiz) {
    if (m_demoInput != nullptr) {
        m_demoInput->stopAllRunningServices();
    }
}

jstring getSafeJniStringFromCString(JNIEnv *env, const char *cStr, const size_t cStrSize) {
    if (env != nullptr && cStr != nullptr) {
        jenny::LocalRef<jbyteArray> bArray = jenny::makeByteArray(env, cStrSize, cStr);
        return SafeUtfProxy::convertCStringToJniStringSafe(env, bArray.get());
    }
    return nullptr; // null in, null out
}

} // extern "C"
