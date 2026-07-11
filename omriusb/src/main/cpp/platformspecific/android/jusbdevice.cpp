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


#include "jusbdevice.h"

JUsbDevice::JUsbDevice(libusb_device* device) : m_usbDevice(device) {
    if(device != nullptr) {

        libusb_device_descriptor desc;

        libusb_get_device_descriptor(device, &desc);

        unsigned char product_name[256] = "Unknown Product";
        libusb_device_handle		*handle;
        int r = libusb_open(device, &handle);
        if(r == 0) {
            // Get the Product Name if an index exists
            if (desc.iProduct > 0) {
                r = libusb_get_string_descriptor_ascii(
                    handle, desc.iProduct, product_name, sizeof(product_name)
                );
                if (r < 0) {
                    snprintf((char*)product_name, sizeof(product_name), "Error reading string");
                }
            }
            libusb_close(handle);
            handle = nullptr;
        }

        m_usbDeviceName = std::string((char*)product_name);
        m_vendorId = desc.idVendor;
        m_productId = desc.idProduct;

        if( (m_vendorId == 0x1D19 && m_productId == 0x110D) || (m_vendorId == 0x0FD9 && m_productId == 0x004C) || (m_vendorId == 0x16C0 && m_productId == 0x05DC)) {
            m_interfaceNum = 0;
        }

        if(m_vendorId == 0x0416 && m_productId == 0xB003) {
            m_interfaceNum = 1;
        };

        //std::cout << "ProductID: " << std::hex << +m_productId << " VendorID: " << +m_vendorId << std::dec << std::endl;
    }
}

JUsbDevice::~JUsbDevice() {
    if (m_usbDeviceHandle) {
        libusb_release_interface(m_usbDeviceHandle, 0);
        libusb_close(m_usbDeviceHandle);
    }
    libusb_unref_device(m_usbDevice);
}

std::string JUsbDevice::getDeviceName() const {
    return m_usbDeviceName;
}

uint16_t JUsbDevice::getProductId() const {
    return m_productId;
}

uint16_t JUsbDevice::getVendorId() const {
    return m_vendorId;
}

libusb_device* JUsbDevice::device_handle() const {
    return m_usbDevice;
}

int JUsbDevice::writeBulkTransferData(uint8_t endPointAddress, std::vector<uint8_t> &buffer, int timeOutMs) {
    int transferred;
    int r=libusb_bulk_transfer(m_usbDeviceHandle, endPointAddress, buffer.data(), buffer.size(), &transferred, timeOutMs*10);
    if (r) {
        std::cout << "writeBulkTransferData error: " << libusb_error_name(r) << "handle: " << m_usbDeviceHandle << std::endl;
        return r;
    }
    return transferred;

}

int JUsbDevice::readBulkTransferData(uint8_t endPointAddress, std::vector<uint8_t> &buffer, int timeOutMs) {
    int transferred;
    int r=libusb_bulk_transfer(m_usbDeviceHandle, endPointAddress, buffer.data(), buffer.size(), &transferred, timeOutMs*10);
    if (r) {
        std::cout << "readBulkTransferData error: " << libusb_error_name(r) << std::endl;
        return r;
    }
    buffer.resize(transferred);
    return transferred;
}

bool JUsbDevice::openDevice() {
    int r = libusb_open(m_usbDevice, &m_usbDeviceHandle);
    if (r) {
        std::cout << "openDevice error: " << libusb_error_name(r) << std::endl;
        return false;
    }
    r = libusb_claim_interface(m_usbDeviceHandle, 0);
    if (r) {
        std::cout << "claim_interface error: " << libusb_error_name(r) << std::endl;
    }
    return r == 0;
}
