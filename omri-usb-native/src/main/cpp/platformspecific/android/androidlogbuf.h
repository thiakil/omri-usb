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

#ifndef CMAKETEST_ANDROIDLOGBUF_H
#define CMAKETEST_ANDROIDLOGBUF_H

#include <android/log.h>
#include <cstring>
#include <mutex>
#include <streambuf>

//Hackish thing to redirect std::cout/std::clog/std::cerr to Android logcat
// https://stackoverflow.com/questions/8870174/is-stdcout-usable-in-android-ndk
// https://gist.github.com/dzhioev/6127982

class androidlogbuf : public std::streambuf {
public:
    static constexpr int bufsize{512};
    static constexpr int alogtagsize{9};

    inline androidlogbuf(const char* tag = "std", android_LogPriority prio = ANDROID_LOG_INFO) :
            alogprio(prio) {
        std::lock_guard<std::recursive_mutex> lockGuard(mLock);
        strncpy(alogtag, tag, alogtagsize-1);
        alogtag[alogtagsize-1] = '\0';
        this->setp(buffer, buffer + bufsize - 1);
    }

private:
    inline int overflow(int c) {
        std::lock_guard<std::recursive_mutex> lockGuard(mLock);
        if (c == traits_type::eof()) {
            *this->pptr() = traits_type::to_char_type(c);
            this->sbumpc();
        }
        return this->sync()? traits_type::eof(): traits_type::not_eof(c);
    }

    inline int sync() {
        std::lock_guard<std::recursive_mutex> lockGuard(mLock);
        int rc = 0;
        if (this->pbase() != this->pptr()) {

            rc = __android_log_print(alogprio, alogtag, "%s",
                                      std::string(this->pbase(),
                                                  this->pptr() - this->pbase()).c_str());

            this->setp(buffer, buffer + bufsize - 1);
        }
        return rc;
    }

    char buffer[bufsize];
    char alogtag[alogtagsize];
    android_LogPriority alogprio{ANDROID_LOG_INFO};
    std::recursive_mutex mLock;
};


#endif //CMAKETEST_ANDROIDLOGBUF_H
