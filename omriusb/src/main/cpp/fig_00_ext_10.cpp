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

#include "fig_00_ext_10.h"

#include <cerrno>
#include <ctime>
#include <iostream>

Fig_00_Ext_10::Fig_00_Ext_10(const std::vector<uint8_t>& figData) : Fig_00(figData) {
    parseFigData(figData);
}

Fig_00_Ext_10::~Fig_00_Ext_10() {

}

void Fig_00_Ext_10::parseFigData(const std::vector<uint8_t>& figData) {
    auto figIter = figData.cbegin() +1;
    while(figIter < figData.cend()) {
        //bool rfu = ((*figIter & 0x80) >> 7) & 0xFF;
        uint32_t mjd = (*figIter++ & 0x7F) << 10 | (*figIter++ & 0xFF) << 2 |
                       (((*figIter & 0xC0) >> 6) & 0xFF);
        m_leapSecondPending = ((*figIter & 0x20) >> 5) & 0xFF;
        //bool rfa = ((*figIter & 0x10) >> 4) & 0xFF; // was Confidence Indicator in 1.4.1
        bool utcFlag = ((*figIter & 0x08) >> 3) & 0xFF;
        // common with Long form (utcFlag = 1) and Short form (utcFlag = 0)
        m_dabTime.hour = (*figIter++ & 0x07) << 2 | ((*figIter & 0xC0) >> 6);
        m_dabTime.minute = (*figIter++ & 0x3F) & 0xFF;

        mjd2ymd(mjd, &m_dabTime.year, &m_dabTime.month, &m_dabTime.day);

        if (utcFlag) {
            m_dabTime.second = ((*figIter & 0xFC) >> 2) & 0xFF;
            m_dabTime.milliseconds = (*figIter++ & 0x03) << 8 | (*figIter++ & 0xFF);
        }

        std::tm dabDateTime{};
        dabDateTime.tm_hour = m_dabTime.hour;
        dabDateTime.tm_min = m_dabTime.minute;
        dabDateTime.tm_sec = m_dabTime.second;
        dabDateTime.tm_year = m_dabTime.year - 1900;
        dabDateTime.tm_mon = m_dabTime.month - 1;
        dabDateTime.tm_mday = m_dabTime.day;
        dabDateTime.tm_isdst = 0;

        // note: mktime interprets input as local time
        m_dabTime.unixEpoch = std::mktime(&dabDateTime) - timezone;

        /*std::stringstream logStr;
        logStr << m_logTag << " Y: " << +m_dabTime.year << ", M: " << +m_dabTime.month
               << ", D: " << +m_dabTime.day << ", h: " << +m_dabTime.hour << ", m: "
               << +m_dabTime.minute << ", s: " << +m_dabTime.second << ", ms: "
               << +m_dabTime.milliseconds << ", UnixEpoch: " << +m_dabTime.unixEpoch << ": "
               << std::put_time(std::gmtime(&m_dabTime.unixEpoch), "%c %Z");
        std::cout << logStr.str() << std::endl;*/
    }
}


bool Fig_00_Ext_10::isLeapSecondPending() const {
    return m_leapSecondPending;
}

Fig_00_Ext_10::DabTime Fig_00_Ext_10::getDabTime() const {
    return m_dabTime;
}
