package com.thiakil.tunerapi.messages

import com.thiakil.com.thiakil.tunerapi.radioServices
import com.thiakil.tunerapi.ServiceInfo
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.omri.radioservice.RadioServiceDab
import org.omri.tuner.Tuner

@Serializable
@SerialName("service_list")
data class ServiceList(val services: List<ServiceInfo>): WSMessage() {
    constructor(tuner: Tuner): this(
        radioServices.filter { it.isProgrammeService }.map {
            ServiceInfo(
                it
            )
        }
    )
}