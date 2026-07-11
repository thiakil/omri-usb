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

/**
 * DabThread is an abstraction of a thread
 */

#ifndef DAB_THREAD_H
#define DAB_THREAD_H

#if __cplusplus < 201100
#  error "C++11 or better is required"
#endif

#include <exception>
#include <iostream>
#include <thread>
#include <syscall.h>
#include <unistd.h>

#define DAB_THREAD_NAME_LEN 20 // same as TASK_COMM_LEN in Linux kernel

#if __cpp_lib_jthread >= 201911L
using Base = std::jthread;
typedef DabThread = Base;
#else
using Base = std::thread;

class DabThreadState {
protected:
    bool                 mHasTerminationException = false;
    std::exception_ptr   mTerminationException;
};

class DabJoiningThread :
        private DabThreadState,
        public Base
{
public:
    /* Default constructor */
    explicit DabJoiningThread():
    DabThreadState(),
    Base()
    {
        // warning: this could mean that you created a thread object on the stack
        std::string str = LOG_TAG;
        str.append("Constructed default");
        std::clog << str << std::endl;
    };

    /**
     * typical use:
     *   std::unique_ptr<DabThread>(new DabThread( [this] () -> { some_class_method(); } ));
     */
    template<class Func, class... Args>
    explicit DabJoiningThread(const Func f, const Args... args):
    DabThreadState(),
    Base([this, f, args...] {
        try {
            threadFuncPre();
            f(args...);
            threadFuncPost();
        } catch (...) {
            mTerminationException = std::current_exception();
            mHasTerminationException = true;
            threadFuncException();
        }
    })
    {
        std::string str = LOG_TAG;
        str.append("Constructed with func");
        std::cout << str << std::endl;
    }

    /* No Constructors */
    DabJoiningThread(const DabJoiningThread&) = delete;
    DabJoiningThread(DabJoiningThread&) = delete;

    /* Destructor */
    ~DabJoiningThread();

    /* operator= */
    DabJoiningThread& operator=(DabJoiningThread&&) = default;
    /* No operator= */
    DabJoiningThread& operator=(const DabJoiningThread&) = delete;
    DabJoiningThread& operator=(DabJoiningThread&) = delete;

    inline auto hasException() const -> bool {
        return mHasTerminationException;
    }

    inline void rethrow_if_exception() const {
        if (hasException()) {
            rethrow_exception(mTerminationException);
        }
    }

    // intentionally overwrite/hide non-virtual std::thread::join()
    void join();

protected:
    inline long getCurrentThreadNativeId() const {
        return syscall(SYS_gettid);
    }

    void threadFuncPre();
    void threadFuncPost();
    void threadFuncException();

private:
    long mNativeThreadId{0}; // only valid if the thread is running or was run in the past
    const static std::string LOG_TAG;
};

/* Select if original std::thread or DabJoiningThread is used as DabThread */
#if 1 // so far, no benefit of DabJoiningThread over std::thread found
typedef DabJoiningThread DabThread;
#else
typedef std::thread DabThread;
#endif

#endif

#endif //DAB_THREAD_H
