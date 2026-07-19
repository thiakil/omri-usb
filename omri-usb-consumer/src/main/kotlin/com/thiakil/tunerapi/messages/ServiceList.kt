package com.thiakil.tunerapi.messages

import com.thiakil.tunerapi.ServiceInfo
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.omri.radioservice.RadioServiceDab
import org.omri.tuner.Tuner

@Serializable
@SerialName("service_list")
data class ServiceList(val services: List<ServiceInfo>): WSMessage() {
    constructor(tuner: Tuner): this(
        tuner.radioServices.filterIsInstance<RadioServiceDab>().map {
            ServiceInfo(
                it
            )
        }
    )
}