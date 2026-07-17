/*
 * Copyright (C) 2018 IRT GmbH
 *
 * Author:
 *  Xander Victory
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

#ifndef LOG4J_BRIDGE_H
#define LOG4J_BRIDGE_H

#include <jni.h>
#include <string>

class Log4JLogger {
private:
    JavaVM* jvm_;
    jclass bridgeClass_;
    jmethodID midTrace_;
    jmethodID midDebug_;
    jmethodID midInfo_;
    jmethodID midWarn_;
    jmethodID midError_;

    bool wasDetached = false;

    Log4JLogger();

    ~Log4JLogger();

    JNIEnv* getJniEnv(bool ignoreAttachFail = false);

    void checkDetach() const;

    void log(jmethodID logmethod, const char* tag, const std::string& message);

public:
    static Log4JLogger& getInstance();

    // Initialize JNI references (Call this from JNI_OnLoad or your init method)
    void init(JavaVM *vm, JNIEnv* env);

    void info(const char* tag, const std::string& message);

    void debug(const char* tag, const std::string& message);

    void trace(const char* tag, const std::string& message);

    void warn(const char* tag, const std::string& message);

    void error(const char* tag, const std::string& message);
};

#define LOG_TRACE(tag, msg) Log4JLogger::getInstance().trace(tag, msg)
#define LOG_DEBUG(tag, msg) Log4JLogger::getInstance().debug(tag, msg)
#define LOG_INFO(tag, msg)  Log4JLogger::getInstance().info(tag, msg)
#define LOG_WARN(tag, msg)  Log4JLogger::getInstance().warn(tag, msg)
#define LOG_ERROR(tag, msg) Log4JLogger::getInstance().error(tag, msg)

#endif //LOG4J_BRIDGE_H
