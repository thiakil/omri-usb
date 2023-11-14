/*
 * Copyright (C) 2023 realzoulou
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

#include "dabthread.h"

const std::string DabJoiningThread::LOG_TAG{"[DabJoiningThread] "};

DabJoiningThread::~DabJoiningThread() {
    const std::string tidStr = std::to_string(mNativeThreadId);
    std::string str = LOG_TAG;
    if (joinable()) {
        str.append("~Joining thread ").append(tidStr);
        std::cout << str << std::endl;
        join();
        str = LOG_TAG;
        str.append("~Joined thread ").append(tidStr);
        std::cout << str << std::endl;
    } else {
        str.append("Not ~Joinable thread ").append(tidStr);
        std::cout << str << std::endl;
    }
    Base::~Base();
}

void DabJoiningThread::join() {
    const long joinerThreadId = getCurrentThreadNativeId();
    const std::string joinStr = std::to_string(joinerThreadId);
    const std::string tidStr = std::to_string(mNativeThreadId);
    std::string str = LOG_TAG;
    str.append("join thread ").append(tidStr).append(" from thread ").append(joinStr);
    std::cout << str << std::endl;
    Base::join();
    str = LOG_TAG;
    str.append("joined thread ").append(tidStr).append(" from thread ").append(joinStr);
    std::cout << str << std::endl;
}

void DabJoiningThread::threadFuncPre() {
    // Don't access mNativeThreadId !
    const long myId = getCurrentThreadNativeId();
    mNativeThreadId = myId;
    std::string str = LOG_TAG;
    str.append("Starting thread ").append(std::to_string(myId));
    std::cout << str << std::endl;
}
void DabJoiningThread::threadFuncPost() {
    // Don't access mNativeThreadId !
    const long myId = getCurrentThreadNativeId();
    std::string str = LOG_TAG;
    str.append("Finished thread ").append(std::to_string(myId));
    std::cout << str << std::endl;
}
void DabJoiningThread::threadFuncException() {
    // Don't access mNativeThreadId !
    const long myId = getCurrentThreadNativeId();
    std::string str = LOG_TAG;
    str.append("Exception thread ").append(std::to_string(myId));
    std::cout << str << std::endl;
}