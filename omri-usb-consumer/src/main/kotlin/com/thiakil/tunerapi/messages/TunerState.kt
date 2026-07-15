package com.thiakil.tunerapi.messages

import com.thiakil.tunerapi.ServiceInfo
import com.thiakil.tunerapi.currentDabService
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.omri.tuner.Tuner
import org.omri.tuner.TunerStatus

@Serializable
@SerialName("tuner_state")
data class TunerState(val status: TunerStatus, val currentService: ServiceInfo?): WSMessage() {
    constructor(tuner: Tuner): this(tuner.tunerStatus, tuner.currentDabService?.let {
        ServiceInfo(
            it
        )
    })
}