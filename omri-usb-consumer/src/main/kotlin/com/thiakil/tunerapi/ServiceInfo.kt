package com.thiakil.tunerapi

import kotlinx.serialization.Serializable
import org.omri.radioservice.RadioServiceDab

@Serializable
data class ServiceInfo(
    val ensembleId: Int,
    val ensembleLabel: String,
    val serviceLabel: String,
    val serviceId: Int,
) {
    constructor(dab: RadioServiceDab): this(
        dab.ensembleId,
        dab.ensembleLabel,
        dab.serviceLabel,
        dab.serviceId)
}