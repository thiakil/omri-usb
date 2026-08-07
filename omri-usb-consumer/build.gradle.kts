plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(ktorLibs.plugins.ktor)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.protobuf.gradle)
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

sourceSets {
    main {
        runtimeClasspath += files(nativeDebug.artifacts.files.map { it.parentFile.toPath() })
    }
}

sourceSets.create("tsgen")

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

    implementation(libs.protobuf.kotlin)

    implementation(ktorLibs.client.core)
    implementation(ktorLibs.client.cio)
    implementation(ktorLibs.client.websockets)

    implementation(project(":omriusb"))

    testImplementation(kotlin("test"))
    testImplementation(ktorLibs.server.testHost)

    nativeDebug(project(":omri-usb-native", "debugRuntimeElements"))
    nativeRelease(project(":omri-usb-native", "releaseRuntimeElements"))

    "tsgenImplementation"("dev.adamko.kxstsgen:kxs-ts-gen-core-jvm:0.2.4")
    "tsgenImplementation"(project(":omriusb"))
    "tsgenImplementation"(sourceSets.main.get().output)
    "tsgenImplementation"(ktorLibs.serialization.kotlinx.json)

}

protobuf {
    // Configure the protoc executable
    protoc {
        // Download from repositories
        artifact = "com.google.protobuf:protoc:${libs.versions.protobuf.asProvider().get()}"
    }
    generateProtoTasks {
        all().configureEach {
            builtins {
                create("kotlin")
                named("java") {
                    option("lite")
                }
            }
        }
    }
}

tasks["assemble"].dependsOn(nativeRelease)

tasks.compileKotlin {
    dependsOn(tasks.generateProto)
}