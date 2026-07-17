
#include "log4jbridge.h"
#include <cstdint>//jnihelper dep
#include "jenny/proxy/jnihelper.h"

#include <iostream>

Log4JLogger::Log4JLogger(): jvm_(nullptr), bridgeClass_(nullptr),
                            midTrace_(nullptr), midDebug_(nullptr),
                            midInfo_(nullptr), midWarn_(nullptr), midError_(nullptr) {}

Log4JLogger::~Log4JLogger() {
    // Clean up global references if the JVM is still alive
    if (bridgeClass_) {
        if (JNIEnv* env = getJniEnv(true)) {
            env->DeleteGlobalRef(bridgeClass_);
            checkDetach();
        }
    }
}

JNIEnv * Log4JLogger::getJniEnv(bool ignoreAttachFail) {
    JNIEnv* enve;

    wasDetached = false;
    int envState = jvm_->GetEnv((void**)&enve, JNI_VERSION_1_6);
    if(envState == JNI_EDETACHED) {
        if(jvm_->AttachCurrentThreadAsDaemon((void**)&enve, nullptr) == 0) {
            wasDetached = true;
        } else {
            if (!ignoreAttachFail) {
                //can't use cerr/cout here, as it will try to redirect and stack overflow
                std::fprintf(stderr, "jniEnv thread failed to attach!\n");
            }
            return nullptr;
        }
    }
    return enve;
}

void Log4JLogger::checkDetach() const {
    if (wasDetached) {
        jvm_->DetachCurrentThread();
    }
}

void Log4JLogger::log(jmethodID logmethod, const char* tag, const std::string &message) {
    JNIEnv* env = getJniEnv();
    if (!env || !bridgeClass_) return;

    env->CallStaticVoidMethod(bridgeClass_, logmethod, jenny::toJavaString(env, tag), jenny::toJavaString(env, message.c_str()));

    checkDetach();
}

Log4JLogger & Log4JLogger::getInstance() {
    static Log4JLogger instance;
    return instance;
}

void Log4JLogger::init(JavaVM *vm, JNIEnv *env) {
    jvm_ = vm;
    jclass localClass = env->FindClass("com/thiakil/nativebridge/Log4jBridge");
    if (localClass) {
        bridgeClass_ = (jclass)env->NewGlobalRef(localClass);
        env->DeleteLocalRef(localClass);

        midTrace_ = env->GetStaticMethodID(bridgeClass_, "logTrace", "(Ljava/lang/String;Ljava/lang/String;)V");
        midDebug_ = env->GetStaticMethodID(bridgeClass_, "logDebug", "(Ljava/lang/String;Ljava/lang/String;)V");
        midInfo_ = env->GetStaticMethodID(bridgeClass_, "logInfo", "(Ljava/lang/String;Ljava/lang/String;)V");
        midWarn_ = env->GetStaticMethodID(bridgeClass_, "logWarn", "(Ljava/lang/String;Ljava/lang/String;)V");
        midError_ = env->GetStaticMethodID(bridgeClass_, "logError", "(Ljava/lang/String;Ljava/lang/String;)V");
    }
}

void Log4JLogger::info(const char* tag, const std::string &message) {
    log(midInfo_, tag, message);
}

void Log4JLogger::debug(const char* tag, const std::string &message) {
    log(midDebug_, tag, message);
}

void Log4JLogger::trace(const char* tag, const std::string &message) {
    log(midTrace_, tag, message);
}

void Log4JLogger::warn(const char* tag, const std::string &message) {
    log(midWarn_, tag, message);
}

void Log4JLogger::error(const char* tag, const std::string &message) {
    log(midError_, tag, message);
}