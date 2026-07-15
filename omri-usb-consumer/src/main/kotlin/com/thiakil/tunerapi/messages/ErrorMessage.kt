package com.thiakil.tunerapi.messages

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("error")
data class ErrorMessage(val message: String, val fatal: Boolean = false) : WSMessage()