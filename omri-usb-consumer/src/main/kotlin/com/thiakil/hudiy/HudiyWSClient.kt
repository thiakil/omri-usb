package com.thiakil.com.thiakil.hudiy

import hudiy.app.api.Constants
import hudiy.app.api.HelloResponse
import hudiy.app.api.MessageType
import hudiy.app.api.Version
import hudiy.app.api.helloRequest
import hudiy.app.api.setDarkMode
import hudiy.app.api.version
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.websocket.WebSockets
import io.ktor.client.plugins.websocket.receiveDeserialized
import io.ktor.client.plugins.websocket.sendSerialized
import io.ktor.client.plugins.websocket.webSocket
import io.ktor.http.HttpMethod
import kotlinx.coroutines.runBlocking

class HudiyWSClient {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val client = HttpClient(CIO) {
                install(WebSockets) {
                    contentConverter = HudiyProtoConverter()
                }
            }

            runBlocking {
                client.webSocket(
                    method = HttpMethod.Get,
                    host = "car-pi.lan",
                    port = 44406
                ) {
                    sendSerialized(helloRequest {
                        apiVersion = version {
                            major = Constants.API_MAJOR_VERSION_VALUE
                            minor = Constants.API_MINOR_VERSION_VALUE
                        }
                        name = "DAB-Backend"
                    })
                    while(true) {
                        val receivedMsg = receiveDeserialized<HudiyMessage>()
                        when (receivedMsg.messageType) {
                            MessageType.MESSAGE_PING -> sendSerialized(MessageType.MESSAGE_PONG)
                            MessageType.MESSAGE_HELLO_RESPONSE -> {
                                val response = receivedMsg.payload as HelloResponse
                                if (!response.isOK) {
                                    throw IllegalStateException("HelloResponse is not OK: $response")
                                } else {
                                    println("Connected OK")
                                    sendSerialized(setDarkMode {
                                        enabled = false
                                    })
                                }
                            }
                            else -> println("Ignoring ${receivedMsg.messageType}")
                        }
                    }
                }
            }
        }
    }
}