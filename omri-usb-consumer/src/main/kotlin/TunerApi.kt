package com.thiakil

import com.thiakil.standin.Context
import io.ktor.server.application.*
import io.ktor.server.response.respond
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.omri.radio.Radio
import org.omri.radioservice.RadioService
import org.omri.radioservice.RadioServiceDab
import org.omri.tuner.Tuner
import org.omri.tuner.TunerStatus
import org.omri.tuner.TunerType
import kotlin.collections.map
import kotlin.collections.mapOf

fun Application.tunerApi() {
    val instance = Radio.getInstance()
    instance.initialize(Context())
    instance.getAvailableTuners(TunerType.TUNER_TYPE_DAB).forEach { tuner ->
        tuner.initializeTuner()
    }
    Runtime.getRuntime().addShutdownHook(Thread {
        instance.deInitialize()
    })
    routing {
        get("/tuners") {
            call.respond(
                instance.availableTuners.map {
                    tunerInfo(it)
                }
            )
        }
        get("/services") {
            call.respond(
                instance.radioServices
                    .filterIsInstance<RadioServiceDab>()
                    .map { it.info() }
                    .sortedWith(compareBy(String.CASE_INSENSITIVE_ORDER) { it.serviceLabel })
            )
        }
    }
}

@Serializable
data class ServiceInfo(
    val ensembleId: Int,
    val ensembleLabel: String,
    val ensembleFrequency: Int,
    val serviceLabel: String,
    val serviceId: Int,
)
@Serializable
data class TunerInfo(val type: TunerType, val status: TunerStatus, val currentService: ServiceInfo?)

private fun tunerInfo(tuner: Tuner) = TunerInfo(
    tuner.tunerType,
    tuner.tunerStatus,
    (tuner.currentRunningRadioService as? RadioServiceDab)?.info()
)

private fun RadioServiceDab.info() = ServiceInfo(
       ensembleId,
       ensembleLabel,
       ensembleFrequency,
       serviceLabel,
       serviceId,
    )