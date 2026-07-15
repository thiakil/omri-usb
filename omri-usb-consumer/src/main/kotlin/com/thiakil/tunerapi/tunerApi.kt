package com.thiakil.tunerapi

import com.thiakil.standin.Context
import com.thiakil.tunerapi.messages.ServiceList
import com.thiakil.tunerapi.messages.TunerState
import io.ktor.server.application.Application
import io.ktor.server.response.respond
import io.ktor.server.routing.get
import io.ktor.server.routing.routing
import io.ktor.server.websocket.sendSerialized
import io.ktor.server.websocket.webSocket
import io.ktor.websocket.CloseReason
import io.ktor.websocket.close
import org.omri.radio.Radio
import org.omri.radioservice.RadioServiceDab
import org.omri.tuner.Tuner
import org.omri.tuner.TunerType

fun Application.tunerApi() {
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
        get("/tuners") {
            call.respond(
                instance.availableTuners.map {
                    TunerInfo(it)
                }
            )
        }
        get("/services") {
            call.respond(
                instance.radioServices
                    .filterIsInstance<RadioServiceDab>()
                    .map {
                        ServiceInfo(
                            it
                        )
                    }
                    .sortedWith(compareBy(String.CASE_INSENSITIVE_ORDER) { it.serviceLabel })
            )
        }
        webSocket("/socket") {
            if (availableTuners.isEmpty()) {
                close(CloseReason(CloseReason.Codes.TRY_AGAIN_LATER, "No available tuners"))
                return@webSocket
            }
            val tuner = availableTuners.first()
            sendSerialized(TunerState(tuner))
            sendSerialized(ServiceList(tuner))
        }
    }
}

val Tuner?.currentDabService get() = this?.currentRunningRadioService as? RadioServiceDab

