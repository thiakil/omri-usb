package com.thiakil.tunerapi.messages

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("start_service")
data class StartService(
    val ensembleId: Int,
    val serviceId: Int,
): WSMessage() {
}