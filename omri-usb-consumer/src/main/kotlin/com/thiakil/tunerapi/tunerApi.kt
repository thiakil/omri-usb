package com.thiakil.tunerapi

import com.thiakil.com.thiakil.tunerapi.RadioWebsocketHandler
import com.thiakil.standin.Context
import com.thiakil.tunerapi.messages.ServiceList
import com.thiakil.tunerapi.messages.TunerState
import com.thiakil.tunerapi.messages.WSMessage
import io.ktor.server.application.Application
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.routing
import io.ktor.server.websocket.receiveDeserialized
import io.ktor.server.websocket.sendSerialized
import io.ktor.server.websocket.webSocket
import io.ktor.websocket.CloseReason
import io.ktor.websocket.close
import kotlinx.coroutines.ensureActive
import org.freedesktop.gstreamer.Gst
import org.freedesktop.gstreamer.Version
import org.omri.radio.Radio
import org.omri.radioservice.RadioServiceDab
import org.omri.tuner.Tuner
import org.omri.tuner.TunerType

fun Application.tunerApi() {
    Gst.init(Version(1, 28))
    val instance = Radio.getInstance()
    instance.initialize(Context(), null)
    val availableTuners = instance.getAvailableTuners(TunerType.TUNER_TYPE_DAB)
    availableTuners.forEach { tuner ->
        tuner.initializeTuner()
    }
    Runtime.getRuntime().addShutdownHook(Thread {
        instance.deInitialize()
    })
    routing {
        webSocket("/socket") {
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

