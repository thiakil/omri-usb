package com.thiakil.tunerapi.messages

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.omri.tuner.ReceptionQuality

@Serializable
@SerialName("reception_status")
data class ReceptionStatus(
    val rfLock: Boolean,
    val quality: ReceptionQuality,
    val rawValue: Int
): WSMessage()
