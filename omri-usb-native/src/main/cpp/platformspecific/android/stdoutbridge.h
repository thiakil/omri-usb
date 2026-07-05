#ifndef IRTDAB_STDOUTBRIDGE_H
#define IRTDAB_STDOUTBRIDGE_H
#include <cstring>
#include <streambuf>
#include "log4jbridge.h"

//Hackish thing to redirect std::cout to androids logcat
class LogRedirector : public std::streambuf {
public:
    static constexpr int bufsize{512};
    LogRedirector() { this->setp(buffer, buffer + bufsize - 1); }

private:
    int overflow(int c) override {
        if (c == traits_type::eof()) {
            *this->pptr() = traits_type::to_char_type(c);
            this->sbumpc();
        }
        return this->sync()? traits_type::eof(): traits_type::not_eof(c);
    }

    int sync() override {
        int rc = 0;
        if (this->pbase() != this->pptr()) {
            char writebuf[bufsize+1];
            memcpy(writebuf, this->pbase(), this->pptr() - this->pbase());
            writebuf[this->pptr() - this->pbase()] = '\0';

            LOG_DEBUG("NativeDebug", buffer);
            this->setp(buffer, buffer + bufsize - 1);
        }
        return 0;
    }

    char buffer[bufsize]{};
};
#endif //IRTDAB_STDOUTBRIDGE_H