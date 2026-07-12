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

#ifndef CMAKETEST_JUSBDEVICE_H
#define CMAKETEST_JUSBDEVICE_H

#include <jni.h>
#include <cstdint>
#include <string>
#include <functional>
#include <vector>
#include <map>

#include "libusb-1.0/libusb.h"
#include <memory>

class JUsbDevice {

public:
    explicit JUsbDevice(libusb_device* device);
    virtual ~JUsbDevice();

    virtual std::string getDeviceName() const;
    virtual uint16_t getProductId() const;
    virtual uint16_t getVendorId() const;
    virtual libusb_device* device_handle() const;

    virtual bool openDevice();

    virtual int writeBulkTransferData(uint8_t endPointAddress, std::vector<uint8_t> &buffer, int timeOutMs = 500);
    virtual int readBulkTransferData(uint8_t endPointAddress, std::vector<uint8_t>& buffer, int timeOutMs = 500);

private:
    libusb_device* m_usbDevice{nullptr};
    libusb_device_handle* m_usbDeviceHandle{nullptr};

    std::string m_usbDeviceName;
    uint16_t m_vendorId{0xFFFF};
    uint16_t m_productId{0xFFFF};

    std::map<uint8_t, jobject> m_endpointsMap;

    uint8_t m_interfaceNum{0};

};


#endif //CMAKETEST_JUSBDEVICE_H
