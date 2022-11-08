/*
 * Copyright (C) 2022 realzoulou
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

#include <string>

#include "fig_01.h"

void Fig_01::parseLabel(std::vector<uint8_t>::const_iterator& labelIter,
                        std::string& label,
                        std::string& shortLabel) const {
    bool isOk = true;
    /* Character field: this 16-byte field shall define the label.
     * It shall be coded as a string of up to 16 characters, which are chosen from the character set
     * signalled by the Charset field in the first byte of the FIG type 1 data field.
     * The characters are coded from byte 15 to byte 0.
     * The first character starts at byte 15. Bytes at the end of the character field that are not
     * required to carry the label shall be filled with 0x00.
     */
    const std::vector<uint8_t> label16(labelIter, labelIter+16);
    labelIter += 16;

    std::string labelFull = DynamiclabelDecoder::convertToStdStringUsingCharset(label16,
        static_cast<const registeredtables::CHARACTER_SET>(m_charSet), isOk);

    std::vector<uint8_t> label8(8, 0);
    /* Character flag field: this 16-bit flag field shall indicate which of the characters of
     * the character field are to be displayed in an abbreviated form of the label, as follows:
     * bi: (i = 0, ... ,15);
     *  0: not to be displayed in abbreviated label;
     *  1: to be displayed in abbreviated label.
     * Not more than 8 of the bi may be set to "1".
     * If the character field contains fewer than 16 characters, the unused bits in the
     * character flag field (having no corresponding character) shall be set to zero.
    */
    const uint16_t flags = ((*labelIter++ << 8) & 0xFF00) + (*labelIter++ & 0x00FF);
    uint8_t cntBitsAre1 = 0;
    for (auto i=15; i>=0; i--) {
        if ((flags & (1 << i)) == (1 << i)) {
            cntBitsAre1++;
            if (cntBitsAre1 <= 8) {
                label8[cntBitsAre1-1] = label16[15-i];
            } else {
                isOk = false; // Not more than 8 of the bi may be set to "1"
            }
        }
    }
    std::string labelShort(8,0);
    if (isOk) {
        labelShort = DynamiclabelDecoder::convertToStdStringUsingCharset(label8,
            static_cast<const registeredtables::CHARACTER_SET>(m_charSet), isOk);
    }
    if (!isOk) {
        std::ostringstream logMsg;
        logMsg << "parseLabel " << (isOk?"Ok":"NOK") << " charSet:" << std::dec << +m_charSet << " '";
        for (auto i=0; i<16; i++) {
            if (isprint(label16[i])) {
                logMsg << static_cast<char>(label16[i]);
            } else {
                logMsg << "\\" << std::hex << +(label16[i]) << std::dec;
            }
        }
        logMsg << "', flags " << std::hex << +flags << std::dec;
        logMsg << ", short '";
        for (auto i=0; i<8; i++) {
            if (isprint(label8[i])) {
                logMsg << static_cast<char>(label8[i]);
            } else {
                logMsg << "\\" << std::hex << +(label8[i]) << std::dec;
            }
        }
        logMsg << "'";
        std::clog << logMsg.str() << std::endl;
    }

    // Do not truncate labels using std::string::substr(), it fails with UTF8 code units
    // trim
    DynamiclabelDecoder::rtrim(labelFull);
    DynamiclabelDecoder::rtrim(labelShort);

    // copy back to caller
    label = labelFull;
    shortLabel = labelShort;
}

void Fig_01::parseLabel(const std::vector <uint8_t> &labelData, std::string &label,
                        std::string &shortLabel) const {
    auto wrapIter = labelData.cbegin();
    parseLabel(wrapIter, label, shortLabel);
}




