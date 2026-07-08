plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(ktorLibs.plugins.ktor)
    alias(libs.plugins.kotlin.serialization)
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


    implementation(project(":omri-usb-java"))
    implementation("org.freedesktop.gstreamer:gst1-java-core:1.4.0")

    testImplementation(kotlin("test"))
    testImplementation(ktorLibs.server.testHost)
}

tasks["classes"].dependsOn(project(":omri-usb-native").tasks.filterIsInstance<LinkSharedLibrary>())