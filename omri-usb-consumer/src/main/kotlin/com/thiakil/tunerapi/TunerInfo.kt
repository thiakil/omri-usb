package com.thiakil.tunerapi

import kotlinx.serialization.Serializable
import org.omri.tuner.Tuner
import org.omri.tuner.TunerStatus
import org.omri.tuner.TunerType

@Serializable
data class TunerInfo(val type: TunerType, val status: TunerStatus, val currentService: ServiceInfo?) {
    constructor(tuner: Tuner): this(
        tuner.tunerType,
        tuner.tunerStatus,
        tuner.currentDabService?.let {
            ServiceInfo(
                it
            )
        }
    )
}