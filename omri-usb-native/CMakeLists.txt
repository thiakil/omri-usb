# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.
cmake_minimum_required(VERSION  3.22.1)
set(CMAKE_CXX_STANDARD 23)
project(irtdab)
set(CMAKE_MODULE_PATH ${PROJECT_SOURCE_DIR}/cmake/modules
        CACHE STRING "CMake module path")

find_package (Java REQUIRED)
find_package (JNI REQUIRED)
include (UseJava)
find_package(LIBUSB REQUIRED)
#find_package(PkgConfig REQUIRED)
#pkg_check_modules(LIBUSB libusb-1.0 REQUIRED)

include_directories(src/main/cpp/thirdparty/fec)
add_subdirectory(src/main/cpp/thirdparty/fec)

# Creates and names a library, sets it as either STATIC
# or SHARED, and provides the relative paths to its source code.
# You can define multiple libraries, and CMake builds them for you.
# Gradle automatically packages shared libraries with your APK.

add_library( # Sets the name of the library.
             ${PROJECT_NAME}

             # Sets the library as a shared library.
             SHARED

             # Provides a relative path to your source file(s).
             src/main/cpp/platformspecific/android/native-lib.cpp
             src/main/cpp/platformspecific/android/jni-helper.cpp
             src/main/cpp/fig_01.cpp
             src/main/cpp/fig_00_ext_05.cpp
             src/main/cpp/fig_00_ext_13.cpp
             src/main/cpp/fig_00_ext_21.cpp
             src/main/cpp/fig_01_ext_04.cpp
             src/main/cpp/fig_00_ext_00.cpp
             src/main/cpp/fig_00_ext_06.cpp
             src/main/cpp/fig_00_ext_14.cpp
             src/main/cpp/fig_00_ext_24.cpp
             src/main/cpp/fig_01_ext_05.cpp
             src/main/cpp/fig_00_ext_01.cpp
             src/main/cpp/fig_00_ext_07.cpp
             src/main/cpp/fig_00_ext_17.cpp
             src/main/cpp/fig_00_ext_25.cpp
             src/main/cpp/fig_01_ext_06.cpp
             src/main/cpp/fig_00_ext_02.cpp
             src/main/cpp/fig_00_ext_08.cpp
             src/main/cpp/fig_00_ext_18.cpp
             src/main/cpp/fig_00_ext_26.cpp
             src/main/cpp/fig_00_ext_03.cpp
             src/main/cpp/fig_00_ext_09.cpp
             src/main/cpp/fig_00_ext_19.cpp
             src/main/cpp/fig_01_ext_00.cpp
             src/main/cpp/fig_00_ext_04.cpp
             src/main/cpp/fig_00_ext_10.cpp
             src/main/cpp/fig_00_ext_20.cpp
             src/main/cpp/fig_01_ext_01.cpp
             src/main/cpp/dabservicecomponentmscstreamaudio.cpp
             src/main/cpp/motdecoder.cpp
             src/main/cpp/dynamiclabeldecoder.cpp
             src/main/cpp/slideshowdecoder.cpp
             src/main/cpp/mscdatagroupdecoder.cpp
             src/main/cpp/dabservicecomponentmscpacketdata.cpp
             src/main/cpp/dabuserapplicationdecoder.cpp
             src/main/cpp/dabmotuserapplicationdecoder.cpp
             src/main/cpp/dabservicecomponentdecoder.cpp
             src/main/cpp/dabuserapplication.cpp
             src/main/cpp/dabservicecomponent.cpp
             src/main/cpp/dabservice.cpp
             src/main/cpp/dabplusservicecomponentdecoder.cpp
             src/main/cpp/dabmpegservicecomponentdecoder.cpp
             src/main/cpp/dabservicecomponentmscstreamdata.cpp
             src/main/cpp/paddecoder.cpp
             src/main/cpp/dabensemble.cpp
             src/main/cpp/dabservicecomponentmscstream.cpp
             src/main/cpp/ficparser.cpp
             src/main/cpp/dabthread.cpp
             src/main/cpp/platformspecific/android/raontunerinput.cpp
             src/main/cpp/platformspecific/android/jusbdevice.cpp
             src/main/cpp/platformspecific/android/jtunerusbdevice.cpp
             src/main/cpp/platformspecific/android/jdabservice.cpp
             src/main/cpp/platformspecific/android/ediinput.cpp
             src/main/cpp/platformspecific/android/demousbtunerinput.cpp

        src/main/cpp/platformspecific/android/log4jbridge.cpp
        src/main/cpp/platformspecific/android/stdoutbridge.h
)

# Searches for a specified prebuilt library and stores the path as a
# variable. Because CMake includes system libraries in the search path by
# default, you only need to specify the name of the public NDK library
# you want to add. CMake verifies that the library exists before
# completing its build.

#find_library( # Sets the name of the path variable.
#              log-lib

              # Specifies the name of the NDK library that
              # you want CMake to locate.
#              log)

target_compile_options(${PROJECT_NAME} PUBLIC
        # start with super pedantic compiler settings ...
        -Wall -Wextra -pedantic -Werror
        -Wformat
        -Wformat-security
        -Werror=format-security
        -Werror=array-bounds
        # ... and relax them as needed
        -Wno-c++14-binary-literal
        -Wno-comment
        -Wno-four-char-constants
        #same as above but mingw64
        -Wno-error=multichar
        -Wno-gnu-statement-expression
        -Wno-sign-compare
        -Wno-unused-but-set-variable
        -Wno-unused-function
        -Wno-unused-parameter
        -Wno-unused-private-field
        -Wno-unused-variable
        # always keep frame-pointer
        -fno-omit-frame-pointer
        )

# hardening
target_compile_options(${PROJECT_NAME} PUBLIC
        -D_FORTIFY_SOURCE=2
        -fstack-protector-strong # not using -fstack-protector-all because of execution time impact
        )
if(!WIN32)
target_link_options(${PROJECT_NAME} PUBLIC
        -Wl,-z,now -Wl,-z,relro  # GOT protection
        -Wl,-z,noexecstack       # mark stack not-executable
        )
endif()

if(IRTDAB_ADDRESS_SANITIZER STREQUAL "yes")
    target_compile_options(${PROJECT_NAME} PUBLIC -fsanitize=address)
    set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS -fsanitize=address)
    file(GLOB_RECURSE ASAN_SRC ${ANDROID_TOOLCHAIN_ROOT}/lib*/clang/${CLANG_VERSION}/lib/linux/libclang_rt.asan-${ARCH}-android.so)
    set(ASAN_DEST ${CMAKE_LIBRARY_OUTPUT_DIRECTORY})
    add_custom_command(
            TARGET ${PROJECT_NAME} PRE_BUILD
            COMMAND ${CMAKE_COMMAND} -E copy ${ASAN_SRC} ${ASAN_DEST}
    )
elseif(IRTDAB_ADDRESS_SANITIZER STREQUAL "hw" AND ARCH STREQUAL "aarch64")
    target_compile_options(${PROJECT_NAME} PUBLIC -fsanitize=hwaddress)
    target_link_options(${PROJECT_NAME} PUBLIC -fsanitize=hwaddress)
    file(GLOB_RECURSE ASAN_SRC ${ANDROID_TOOLCHAIN_ROOT}/lib*/clang/${CLANG_VERSION}/lib/linux/libclang_rt.hwasan-${ARCH}-android.so)
    set(ASAN_DEST ${CMAKE_LIBRARY_OUTPUT_DIRECTORY})
    add_custom_command(
            TARGET ${PROJECT_NAME} PRE_BUILD
            COMMAND ${CMAKE_COMMAND} -E copy ${ASAN_SRC} ${ASAN_DEST}
    )
endif()

set(JNI_GENERATED_HEADERS "${PROJECT_SOURCE_DIR}/../omriusb/build/generated/sources/headers/java/main")

# Specifies libraries CMake should link to your target library. You
# can link multiple libraries, such as libraries you define in this
# build script, prebuilt third-party libraries, or system libraries.

if (WIN32)
    target_link_libraries(${PROJECT_NAME} "ws2_32")
endif ()

target_include_directories (irtdab PRIVATE ${JNI_GENERATED_HEADERS} ${JNI_INCLUDE_DIRS} ${LIBUSB_INCLUDE_DIRS})
target_link_libraries( # Specifies the target library.
                       ${PROJECT_NAME}

        ${JNI_LIBRARIES}
        ${LIBUSB_LIBRARIES}
                       fec

                       ${MAPFILE_LINK_OPTION}
                       )
