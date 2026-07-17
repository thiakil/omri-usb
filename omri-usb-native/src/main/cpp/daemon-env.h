//
// Created by Xander on 17/07/2026.
//

#ifndef OMRI_USB_DAEMON_ENV_H
#define OMRI_USB_DAEMON_ENV_H
#include <jni.h>
#include <cassert>

/**
 * persisted jni env scope.
 * attach current thread to jvm, until it's dead.
 * Copied from jenny::Env, modified to use AttachCurrentThreadAsDaemon instead
 * Jenny's Apache licence applies
 */
class DaemonEnv {
  private:
    JNIEnv* _env;

  public:
    /**
     * MUST be called before any calls.
     * suggested on JNI_OnLoad
     */
    static void attachJvm(JavaVM* jvm);

    static void attachJvm(JNIEnv* env) {
      JavaVM* jvm;
      env->GetJavaVM(&jvm);
      attachJvm(jvm);
    }

  public:
    DaemonEnv() : _env(attachCurrentThreadIfNeed()) {}

    JNIEnv* operator->() const { return _env; }

    JNIEnv* get() const { return _env; }

  private:
    struct StaticState;

    static StaticState* staticState();

    static JNIEnv* attachCurrentThreadIfNeed();
};

#ifdef __ANDROID__

struct DaemonEnv::StaticState {
  JavaVM* _jvm{};
  ::pthread_key_t envWrapperKey{};

  StaticState() {
    ::pthread_key_create(&envWrapperKey, [](void*) {
      auto state = DaemonEnv::staticState();
      state->_jvm->DetachCurrentThread();
    });
  }
};

inline DaemonEnv::StaticState* DaemonEnv::staticState() {
  static DaemonEnv::StaticState state{};
  return &state;
}

inline void DaemonEnv::attachJvm(JavaVM* jvm) {
  auto state = staticState();
  state->_jvm = jvm;
}

inline JNIEnv* DaemonEnv::attachCurrentThreadIfNeed() {
  JNIEnv* env;
  auto state = staticState();
  assert(state->_jvm &&
         "please call DaemonEnv::attachJvm before any usage. (JNI_OnLoad is recommended.)");
  auto jvm = state->_jvm;
  if (jvm->GetEnv(reinterpret_cast<void**>(&env), JNI_VERSION_1_6) == JNI_EDETACHED) {
    assert(jvm);

    // thread_local on some version of NDK have bug, dtor not called...
    env = static_cast<JNIEnv*>(::pthread_getspecific(state->envWrapperKey));

    if (!env) {
      jvm->AttachCurrentThreadAsDaemon(&env, nullptr);
      assert(env);

      ::pthread_setspecific(state->envWrapperKey, env);
    }
  }
  assert(env != nullptr);
  return env;
}

#else

struct DaemonEnv::StaticState {
  JavaVM* _jvm{};
};

inline DaemonEnv::StaticState* DaemonEnv::staticState() {
  static DaemonEnv::StaticState state{};
  return &state;
}

inline void DaemonEnv::attachJvm(JavaVM* jvm) {
  assert(jvm);
  auto state = staticState();
  state->_jvm = jvm;
}

inline JNIEnv* DaemonEnv::attachCurrentThreadIfNeed() {
  JNIEnv* env;
  auto state = staticState();
  assert(state->_jvm &&
      "please call DaemonEnv::attachJvm before any usage. (JNI_OnLoad is recommended.)");
  auto jvm = state->_jvm;
  if (jvm->GetEnv(reinterpret_cast<void**>(&env), JNI_VERSION_1_6) == JNI_EDETACHED) {
    struct EnvWrapper {
      JavaVM* const jvm;
      JNIEnv* env;

      explicit EnvWrapper(JavaVM* _jvm) : jvm(_jvm), env(nullptr) {
        _jvm->AttachCurrentThreadAsDaemon(reinterpret_cast<void**>(&env), nullptr);
        assert(env != nullptr);
      }

      ~EnvWrapper() {
        // detach when our thread is exiting.
        jvm->DetachCurrentThread();
      }
    };

    thread_local EnvWrapper envWrapper(jvm);
    env = envWrapper.env;
  }
  assert(env != nullptr);
  return env;
}

#endif

#endif //OMRI_USB_DAEMON_ENV_H
