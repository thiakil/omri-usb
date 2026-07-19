package com.thiakil.tunerapi.messages

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("stop_service")
data object StopService : WSMessage()
