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
    const long myTid = getCurrentThreadNativeId();
    std::string str = LOG_TAG;
    // if next lines crash then this object is on the stack of a thread
    mNativeThreadId = myTid;
    str.append("Starting thread ").append(std::to_string(mNativeThreadId));
    std::cout << str << std::endl;
}
void DabJoiningThread::threadFuncPost() {
    std::string str = LOG_TAG;
    // if next line crashes then this object is on the stack of a thread
    str.append("Finished thread ").append(std::to_string(mNativeThreadId));
    std::cout << str << std::endl;
}
void DabJoiningThread::threadFuncException() {
    std::string str = LOG_TAG;
    // if next line crashes then this object is on the stack of a thread
    str.append("Exception thread ").append(std::to_string(mNativeThreadId));
    std::cout << str << std::endl;
}