package com.thiakil.tunerapi

import kotlinx.serialization.Serializable
import org.omri.radioservice.RadioServiceDab

@Serializable
data class ServiceInfo(
    val ensembleId: Int,
    val ensembleLabel: String,
    val serviceLabel: String,
    val serviceId: Int,
    val frequency: Int,
    val bitrate: Int,
    val programmeType: Int,
    val programmeTypeDynamic: Boolean,
) {
    constructor(dab: RadioServiceDab): this(
        dab.ensembleId,
        dab.ensembleLabel,
        dab.serviceLabel,
        dab.serviceId,
        dab.ensembleFrequency,
        dab.serviceComponents.firstOrNull()?.bitrate ?: 0,
        dab.programmeType,
        dab.isProgrammeTypeDynamic,
    )
}