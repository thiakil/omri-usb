#ifndef IRTDAB_THREAD_ID_H
#define IRTDAB_THREAD_ID_H
#ifdef _WIN32
#include <windows.h>
// Windows implementation
#define GET_THREAD_ID GetCurrentThreadId()
#else
#include <sys/syscall.h>
#include <unistd.h>
// Linux implementation
#define GET_THREAD_ID syscall(SYS_gettid)
#endif
#endif //IRTDAB_THREAD_ID_H