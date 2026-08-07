package com.thiakil.tunerapi

import com.thiakil.com.thiakil.tunerapi.RadioWebsocketHandler
import com.thiakil.standin.Context
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import org.omri.radio.Radio
import org.omri.radioservice.RadioServiceDab
import org.omri.tuner.Tuner
import org.omri.tuner.TunerType

fun Application.tunerApi() {
    val instance = Radio.getInstance()
    instance.initialize(Context(), null)
    Runtime.getRuntime().addShutdownHook(Thread {
        instance.deInitialize()
    })
    routing {
        webSocket("/socket") {
            val availableTuners = instance.getAvailableTuners(TunerType.TUNER_TYPE_DAB)
            if (availableTuners.isEmpty()) {
                close(CloseReason(CloseReason.Codes.TRY_AGAIN_LATER, "No available tuners"))
                return@webSocket
            }
            val tuner = availableTuners.first()
            RadioWebsocketHandler(this, tuner).handleSession()
        }
    }
}

val Tuner?.currentDabService get() = this?.currentRunningRadioService as? RadioServiceDab

