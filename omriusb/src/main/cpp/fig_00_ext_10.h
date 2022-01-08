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

#ifndef FIG_00_EXT_10_H
#define FIG_00_EXT_10_H

#include <chrono>

#include "fig_00.h"

/*
 * ETSI 300 401 clause 8.1.3.1 Date and time (d&t)
 *
 * The date and time feature is used to signal a location-independent timing reference in UTC format. This feature is
 * encoded in Extension 10 of FIG type 0 (FIG 0/10). Figure 38 shows the structure of the date and time field which is part
 * of the Type 0 field. The time reference shall be defined by the synchronization channel (see clause 14.3.3).
 *
 * The FIG 0/10 has a repetition rate of once per second (was not defined in V1.4.1)
 */
class Fig_00_Ext_10 : public Fig_00 {

public:
    struct DabTime {
        int year;
        int month;
        int day;
        int hour;
        int minute;
        int second;
        int milliseconds;
        std::time_t unixEpoch;
    };

public:
    explicit Fig_00_Ext_10(const std::vector<uint8_t>& figData);
    virtual ~Fig_00_Ext_10();

    /*
     * LSI (Leap Second Indicator): this 1-bit flag shall be set to "1" for the period of one hour before the occurrence of a leap second.
     */
    virtual bool isLeapSecondPending() const;

    virtual Fig_00_Ext_10::DabTime getDabTime() const;

private:
    void parseFigData(const std::vector<uint8_t>& figData);

private:
    const std::string m_logTag = {"[Fig_00_Ext_10]"};

    bool m_leapSecondPending;

    DabTime m_dabTime;

    inline void mjd2ymd(long mjd, int* year, int* month, int* day) {
        long J, C, Y, M;

        J = mjd + 2400001 + 68569;
        C = 4 * J / 146097;
        J = J - (146097 * C + 3) / 4;
        Y = 4000 * (J + 1) / 1461001;
        J = J - 1461 * Y / 4 + 31;
        M = 80 * J / 2447;
        *day = J - 2447 * M / 80;
        J = M / 11;
        *month = M + 2 - (12 * J);
        *year = 100 * (C - 49) + Y + J;
    }
};

#endif // FIG_00_EXT_10_H
