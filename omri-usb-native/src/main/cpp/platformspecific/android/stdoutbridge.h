#ifndef IRTDAB_STDOUTBRIDGE_H
#define IRTDAB_STDOUTBRIDGE_H
#include <cstring>
#include <mutex>
#include <streambuf>
#include "log4jbridge.h"

enum Log4JPriority {
    LOGLEVEL_DEBUG,
    LOGLEVEL_WARN,
    LOGLEVEL_ERROR,
};

static const char* NATIVE_LOG_TAG = "irtdab-Native";

//Hackish thing to redirect std::cout to androids logcat
// https://stackoverflow.com/questions/8870174/is-stdcout-usable-in-android-ndk
// https://gist.github.com/dzhioev/6127982
class LogRedirector : public std::streambuf {
public:
    static constexpr int bufsize{512};
    LogRedirector(Log4JPriority logPrio): logLevel(logPrio) {
        std::lock_guard<std::recursive_mutex> lockGuard(mLock);
        this->setp(buffer, buffer + bufsize - 1);
    }

private:
    int overflow(int c) override {
        std::lock_guard<std::recursive_mutex> lockGuard(mLock);
        if (c == traits_type::eof()) {
            *this->pptr() = traits_type::to_char_type(c);
            this->sbumpc();
        }
        return this->sync()? traits_type::eof(): traits_type::not_eof(c);
    }

    int sync() override {
        std::lock_guard<std::recursive_mutex> lockGuard(mLock);
        int rc = 0;
        if (this->pbase() != this->pptr()) {
            auto msg = std::string(this->pbase(),
                                  this->pptr() - this->pbase());
            switch (this->logLevel) {
                case LOGLEVEL_DEBUG:
                    LOG_DEBUG(NATIVE_LOG_TAG, msg);
                    break;
                case LOGLEVEL_WARN:
                    LOG_WARN(NATIVE_LOG_TAG, msg);
                    break;
                case LOGLEVEL_ERROR:
                    LOG_ERROR(NATIVE_LOG_TAG, msg);
                    break;
                default:
                    LOG_INFO(NATIVE_LOG_TAG, msg);
                    break;
            }
            this->setp(buffer, buffer + bufsize - 1);
        }
        return 0;
    }

    char buffer[bufsize]{};
    std::recursive_mutex mLock;
    Log4JPriority logLevel;
};
#endif //IRTDAB_STDOUTBRIDGE_H