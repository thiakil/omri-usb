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
#include "jenny/proxy/jnihelper.h"

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

static jclass m_usbTunerClass = nullptr;
static jclass m_radioServiceDabImplClass = nullptr;
static jmethodID m_radioServiceDabImpl_init_mId = nullptr;
static jmethodID m_radioServiceDabImpl_setEnsembleEcc_mId = nullptr;
static jmethodID m_radioServiceDabImpl_setEnsembleFrequency_mId = nullptr;
static jmethodID m_radioServiceDabImpl_setEnsembleId_mId = nullptr;
static jmethodID m_radioServiceDabImpl_setServiceId_mId = nullptr;
static jmethodID m_radioServiceDabImpl_setIsProgrammeService_mId = nullptr;
static jmethodID m_radioServiceDabImpl_setServiceLabel_mId = nullptr;
static jmethodID m_radioServiceDabImpl_getServiceLabel_mId = nullptr;
static jclass m_radioServiceImplClass = nullptr;
static jclass m_dabServiceComponentClass = nullptr;
static jclass m_dabServiceUserApplicationClass = nullptr;
static jclass m_dynamicLabelClass = nullptr;
static jclass m_dynamicLabelPlusItemClass = nullptr;
static jclass m_slideshowClass = nullptr;

//static jclass m_ediTunerClass = nullptr;
static jclass m_dabTimeClass = nullptr;
static jclass m_javaDateClass = nullptr;

static jclass m_demoTunerClass = nullptr;

static jclass m_ArrayListClass = nullptr;
static jmethodID m_ArrayList_init_mId = nullptr;
static jmethodID m_ArrayList_add_mId = nullptr;

static jboolean m_CoutRedirectedToALog = JNI_FALSE;
static std::string m_rawRecordingPath;

static jclass m_SafeUtfClass = nullptr;
static jmethodID m_SafeUtf_convertCStringToJniStringSafe_mId = nullptr;

static void cacheClassDefinitions(JavaVM *vm) {
    bool wasDetached;
    if (!JNI_ATTACH(m_javaVm, wasDetached)) {
        std::cerr << LOG_TAG << "jniEnv thread failed to attach!" << std::endl;
        return;
    }

    JNIEnv *env;
    vm->GetEnv((void **) &env, JNI_VERSION_1_6);

    // ArrayList
    m_ArrayListClass = (jclass) env->NewGlobalRef(env->FindClass("java/util/ArrayList"));
    m_ArrayList_init_mId = env->GetMethodID(m_ArrayListClass, "<init>", "(I)V");
    m_ArrayList_add_mId = env->GetMethodID(m_ArrayListClass, "add", "(Ljava/lang/Object;)Z");

    m_usbTunerClass = (jclass) env->NewGlobalRef(env->FindClass("org/omri/radio/impl/TunerUsbImpl"));
    m_radioServiceImplClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/RadioServiceImpl"));
    m_radioServiceDabImplClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/RadioServiceDabImpl"));
    m_radioServiceDabImpl_init_mId = env->GetMethodID(m_radioServiceDabImplClass, "<init>", "()V");
    m_radioServiceDabImpl_setEnsembleEcc_mId = env->GetMethodID(m_radioServiceDabImplClass,
                                                                "setEnsembleEcc", "(I)V");
    m_radioServiceDabImpl_setEnsembleFrequency_mId = env->GetMethodID(m_radioServiceDabImplClass,
                                                                      "setEnsembleFrequency",
                                                                      "(I)V");
    m_radioServiceDabImpl_setEnsembleId_mId = env->GetMethodID(m_radioServiceDabImplClass,
                                                               "setEnsembleId", "(I)V");
    m_radioServiceDabImpl_setServiceId_mId = env->GetMethodID(m_radioServiceDabImplClass,
                                                              "setServiceId", "(I)V");
    m_radioServiceDabImpl_setIsProgrammeService_mId = env->GetMethodID(m_radioServiceDabImplClass,
                                                        "setIsProgrammeService", "(Z)V");
    m_radioServiceDabImpl_setServiceLabel_mId = env->GetMethodID(m_radioServiceDabImplClass,
            "setServiceLabel", "(Ljava/lang/String;)V");
    m_radioServiceDabImpl_getServiceLabel_mId = env->GetMethodID(m_radioServiceDabImplClass,
            "getServiceLabel", "()Ljava/lang/String;");
    m_dabServiceComponentClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/RadioServiceDabComponentImpl"));
    m_dabServiceUserApplicationClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/RadioServiceDabUserApplicationImpl"));

    //Metadata classes
    m_dynamicLabelClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/TextualDabDynamicLabelImpl"));
    m_dynamicLabelPlusItemClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/TextualDabDynamicLabelPlusItemImpl"));
    m_slideshowClass = (jclass) env->NewGlobalRef(
            env->FindClass("org/omri/radio/impl/VisualDabSlideShowImpl"));

    //OMRI DabTime class
    m_dabTimeClass = (jclass) env->NewGlobalRef(env->FindClass("org/omri/radio/impl/DabTime"));
    //Java Date class
    m_javaDateClass = (jclass) env->NewGlobalRef(env->FindClass("java/util/Date"));

    m_demoTunerClass = (jclass) env->NewGlobalRef(env->FindClass("org/omri/radio/impl/DemoTuner"));

    //SafeUtf class
    m_SafeUtfClass = (jclass) env->NewGlobalRef(env->FindClass("org/omri/radio/impl/SafeUtf"));
    m_SafeUtf_convertCStringToJniStringSafe_mId = env->GetStaticMethodID(m_SafeUtfClass,
                                                                         "convertCStringToJniStringSafe",
                                                                         "([B)Ljava/lang/String;");
    if (!JNI_DETACH(m_javaVm, wasDetached)) {
        std::cerr << LOG_TAG << "jniEnv thread failed to detach!" << std::endl;
    }
}

static void cleanClassDefinitions(JavaVM *vm) {
    bool wasDetached;
    if (!JNI_ATTACH(m_javaVm, wasDetached)) {
        std::cerr << LOG_TAG << "jniEnv thread failed to attach!" << std::endl;
        return;
    }

    JNIEnv *env;
    vm->GetEnv((void **) &env, JNI_VERSION_1_6);

    env->DeleteGlobalRef(m_ArrayListClass);

    env->DeleteGlobalRef(m_usbTunerClass);
    env->DeleteGlobalRef(m_radioServiceDabImplClass);
    env->DeleteGlobalRef(m_radioServiceImplClass);
    env->DeleteGlobalRef(m_dabServiceComponentClass);
    env->DeleteGlobalRef(m_dabServiceUserApplicationClass);

    //Metadata classes
    env->DeleteGlobalRef(m_dynamicLabelClass);
    env->DeleteGlobalRef(m_dynamicLabelPlusItemClass);
    env->DeleteGlobalRef(m_slideshowClass);

    env->DeleteGlobalRef(m_dabTimeClass);
    env->DeleteGlobalRef(m_javaDateClass);
    env->DeleteGlobalRef(m_demoTunerClass);

    env->DeleteGlobalRef(m_SafeUtfClass);

    if (!JNI_DETACH(m_javaVm, wasDetached)) {
        std::cerr << LOG_TAG << "jniEnv thread failed to detach!" << std::endl;
    }
}

static LogRedirector * clogDirector;
static LogRedirector * cerrDirector;
static LogRedirector * coutDirector;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    clogDirector = new LogRedirector(LOGLEVEL_WARN);
    cerrDirector = new LogRedirector(LOGLEVEL_ERROR);
    coutDirector = new LogRedirector(LOGLEVEL_DEBUG);
    //sets the redirect stream for logcat logging
    std::clog.rdbuf(clogDirector);
    std::cerr.rdbuf(cerrDirector);
    std::cout.rdbuf(coutDirector);
    
    JNIEnv *env;
    if (vm != nullptr) {
        if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
            return JNI_ERR;
        }
        if (env->GetJavaVM(&m_javaVm) == 0) {
            cacheClassDefinitions(m_javaVm);
            Log4JLogger::getInstance().init(vm, env);
        } else {
            std::cerr << LOG_TAG << "JNI_OnLoad: GetJavaVM failed" << std::endl;
        }
    } else {
        std::cerr << LOG_TAG << "JNI_OnLoad: vm null" << std::endl;
    }
    jenny::Env::attachJvm(vm);
    jenny::initAllProxies(env);
    return JNI_VERSION_1_6;
}

JNIEXPORT void JNI_OnUnload(JavaVM *vm, void *reserved) {
    std::clog << LOG_TAG << " OnUnload" << std::endl;

    JNIEnv *env;
    vm->GetEnv((void **) &env, JNI_VERSION_1_6);
    env->GetJavaVM(&m_javaVm);

    cleanClassDefinitions(m_javaVm);

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
    std::shared_ptr<JTunerUsbDevice> jusbDevice = std::make_shared<JTunerUsbDevice>(m_javaVm, env, usbDevice, device);


    jusbDevice->setJavaClassDabServiceUserApplication(env, m_dabServiceUserApplicationClass);
    jusbDevice->setJavaClassDabTime(env, m_javaDateClass);

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
                                                                                   m_radioServiceDabImplClass,
                                                                                   m_dynamicLabelClass,
                                                                                   m_dynamicLabelPlusItemClass,
                                                                                   m_slideshowClass,
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
            JDabService jDabService(m_javaVm, env, m_radioServiceDabImplClass, m_dynamicLabelClass,
                                    m_dynamicLabelPlusItemClass, m_slideshowClass, dabService);
            // Wrong clang-tidy warning:
            // "JVM object referenced by 'dabService' is of type 'RadioServiceDab' and it does not
            // have access to method 'getServiceLabel()' declared in class 'RadioServiceDabImpl'."
            // NOLINTNEXTLINE
            auto inputServiceLabel = (jstring) env->CallObjectMethod(dabService, m_radioServiceDabImpl_getServiceLabel_mId);

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
            retObj = env->NewObject(m_ArrayListClass, m_ArrayList_init_mId,
                                    static_cast<jint>(retServices.size()));
            for (const auto &s : retServices) {

                jobject jLinkedServiceDab = env->NewObject(m_radioServiceDabImplClass,
                                                           m_radioServiceDabImpl_init_mId);
                env->CallVoidMethod(jLinkedServiceDab, m_radioServiceDabImpl_setEnsembleEcc_mId,
                                    static_cast<jint>(s.get()->getEnsembleEcc()));
                env->CallVoidMethod(jLinkedServiceDab,
                                    m_radioServiceDabImpl_setEnsembleFrequency_mId,
                                    static_cast<jint>(s.get()->getEnsembleFrequencyKHz() * 1000));
                env->CallVoidMethod(jLinkedServiceDab, m_radioServiceDabImpl_setEnsembleId_mId,
                                    static_cast<jint>(s.get()->getEnsembleId()));
                env->CallVoidMethod(jLinkedServiceDab, m_radioServiceDabImpl_setServiceId_mId,
                                    static_cast<jint>(s.get()->getServiceId()));
                env->CallVoidMethod(jLinkedServiceDab, m_radioServiceDabImpl_setIsProgrammeService_mId,
                                    static_cast<jboolean>(s.get()->getIsProgrammeService()));
                // assume that all such services have the same Service Label as the requested service
                if (inputServiceLabel != nullptr) {
                    env->CallVoidMethod(jLinkedServiceDab,
                                        m_radioServiceDabImpl_setServiceLabel_mId,
                                        inputServiceLabel);
                }

                env->CallBooleanMethod(retObj, m_ArrayList_add_mId, jLinkedServiceDab);
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
        DemoUsbTunerInput* demoUsbTunerInput = new DemoUsbTunerInput(m_javaVm, env);
        m_demoInput = std::unique_ptr<DemoUsbTunerInput>(demoUsbTunerInput);
        m_demoInput->setJavaClassDemoTuner(env, m_demoTunerClass);
        m_demoInput->setJavaObjectDemoTuner(env, demoTuner);
        m_demoInput->setJavaClassRadioService(env, m_radioServiceImplClass);

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
                                                                             m_radioServiceDabImplClass,
                                                                             m_dynamicLabelClass,
                                                                             m_dynamicLabelPlusItemClass,
                                                                             m_slideshowClass,
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
        const auto cppString = std::string(cStr);
        jbyteArray bArray = env->NewByteArray((jsize) cStrSize);
        env->SetByteArrayRegion(bArray, 0, (jsize) cStrSize, (jbyte*) cppString.c_str());
        auto jStr = (jstring) env->CallStaticObjectMethod(m_SafeUtfClass,
                                                          m_SafeUtf_convertCStringToJniStringSafe_mId,
                                                          bArray);
        env->DeleteLocalRef(bArray);
        return jStr;
    }
    return nullptr; // null in, null out
}

} // extern "C"
