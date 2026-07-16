plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(ktorLibs.plugins.ktor)
    alias(libs.plugins.kotlin.serialization)
}

val nativeDebug = configurations.create("nativeDebug") {
    isCanBeConsumed = false
    isCanBeResolved = true
}
val nativeRelease = configurations.create("nativeRelease") {
    isCanBeConsumed = false
    isCanBeResolved = true
}

group = "com.thiakil"
version = "1.0.0-SNAPSHOT"

application {
    mainClass = "io.ktor.server.netty.EngineMain"
}

kotlin {
    jvmToolchain(25)
}
java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(25))
    }
}
dependencies {
    implementation(ktorLibs.serialization.kotlinx.json)
    implementation(ktorLibs.server.config.yaml)
    implementation(ktorLibs.server.contentNegotiation)
    implementation(ktorLibs.server.core)
    implementation(ktorLibs.server.netty)
    implementation(ktorLibs.server.websockets)
    //implementation(ktorLibs.server.openapi)
    //implementation(ktorLibs.server.routingOpenapi)
    implementation(libs.log4j.api)
    implementation(libs.log4j.core)
    implementation(libs.log4j.slf4j.impl)


    implementation(project(":omriusb"))
    implementation("org.freedesktop.gstreamer:gst1-java-core:1.4.0")

    testImplementation(kotlin("test"))
    testImplementation(ktorLibs.server.testHost)

    nativeDebug(project(":omri-usb-native", "debugRuntimeElements"))
    nativeRelease(project(":omri-usb-native", "releaseRuntimeElements"))

}


sourceSets {
    main {
        runtimeClasspath += files(nativeDebug.artifacts.files.map { it.parentFile.toPath() })
    }
}
tasks["assemble"].dependsOn(nativeRelease)

