package com.thiakil.com.thiakil.hudiy

import hudiy.app.api.AudioFocusAction
import hudiy.app.api.AudioFocusChangeRequest.AudioFocusType
import hudiy.app.api.AudioFocusChangeResponse
import hudiy.app.api.Constants
import hudiy.app.api.HelloResponse
import hudiy.app.api.MessageType
import hudiy.app.api.RegisterAudioFocusReceiverRequest.AudioStreamCategory
import hudiy.app.api.RegisterAudioFocusReceiverResponse
import hudiy.app.api.RegisterAudioFocusReceiverResponse.RegisterAudioFocusReceiverResult
import hudiy.app.api.audioFocusChangeRequest
import hudiy.app.api.helloRequest
import hudiy.app.api.registerAudioFocusReceiverRequest
import hudiy.app.api.version
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.websocket.DefaultClientWebSocketSession
import io.ktor.client.plugins.websocket.WebSockets
import io.ktor.client.plugins.websocket.receiveDeserialized
import io.ktor.client.plugins.websocket.sendSerialized
import io.ktor.client.plugins.websocket.webSocket
import io.ktor.http.HttpMethod
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.currentCoroutineContext
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.job
import kotlinx.coroutines.launch
import org.apache.logging.log4j.LogManager
import org.omri.radio.Radio
import kotlin.coroutines.cancellation.CancellationException

enum class AudioFocusState {
    NOT_HELD,
    REQUESTED,
    HELD,
    SUSPENDED,
    DUCK,
    NOT_CONNECTED
}

object AudioFocusManager {
    private val LOGGER = LogManager.getLogger(AudioFocusManager::class.java)
    /** Behaviour for request focus when not connected */
    private const val NOT_CONNECTED_BEHAVIOUR = true
    private val hudiyHost = "car-pi.lan"

    @Volatile
    private var socketReference: DefaultClientWebSocketSession? = null
    @Volatile
    private var focusRegistered = false
    @Volatile
    private var myFocusId: Int = -1
    @Volatile
    var focusStatus: AudioFocusState = AudioFocusState.NOT_CONNECTED
    @Volatile
    private var waitingOnFocus: CompletableDeferred<Boolean>? = null

    private val client = HttpClient(CIO) {
        install(WebSockets) {
            contentConverter = HudiyProtoConverter()
        }
    }

    fun CoroutineScope.install() {
        launch {
            run()
        }
    }

    private suspend fun run() {
        while (true) {
            currentCoroutineContext().ensureActive()
            LOGGER.info("Connecting to Hudiy api")
            try {
                client.webSocket(
                    method = HttpMethod.Get,
                    host = hudiyHost,
                    port = 44406
                ) {
                    handleSocket()
                }
            } catch (_: CancellationException) {
                return
            } catch (e: Exception) {
                LOGGER.error("Unhandled exception", e)
            } finally {
                synchronized(this) {
                    focusRegistered = false
                    socketReference = null
                    focusStatus = AudioFocusState.NOT_CONNECTED
                    completeWaitingFocus(false)
                }
            }
        }
    }

    private suspend fun DefaultClientWebSocketSession.handleSocket() {
        sendSerialized(helloRequest {
            apiVersion = version {
                major = Constants.API_MAJOR_VERSION_VALUE
                minor = Constants.API_MINOR_VERSION_VALUE
            }
            name = "DAB-Backend"
        })
        val radio = Radio.getInstance()
        while (true) {
            val receivedMsg = receiveDeserialized<HudiyMessage>()
            when (receivedMsg.messageType) {
                MessageType.MESSAGE_PING -> sendSerialized(MessageType.MESSAGE_PONG)

                else -> {
                    when (val payload = receivedMsg.payload) {
                        is HelloResponse -> {
                            if (!payload.isOK) {
                                LOGGER.error("HelloResponse is not OK: {}", payload)
                                return
                            } else {
                                LOGGER.info("Connected to Hudiy OK")
                                synchronized(this) {
                                    this@AudioFocusManager.socketReference = this
                                }
                                sendSerialized(registerAudioFocusReceiverRequest {
                                    name = "DAB Radio"
                                    category = AudioStreamCategory.AUDIO_STREAM_CATEGORY_ENTERTAINMENT
                                    duckPriority = 0
                                })
                            }
                        }
                        is RegisterAudioFocusReceiverResponse -> {
                            if (payload.result == RegisterAudioFocusReceiverResult.REGISTER_AUDIO_FOCUS_RECEIVER_RESULT_OK) {
                                synchronized(this) {
                                    myFocusId = payload.id
                                    focusRegistered = true
                                    focusStatus = AudioFocusState.NOT_HELD
                                    //todo check
                                }
                                LOGGER.info("Registered audio focus receiver")
                            } else {
                                LOGGER.error("RegisterAudioFocusReceiver result is not OK: {}", payload)
                                return//not really any point continuing
                            }
                        }
                        is AudioFocusAction -> {
                            if (payload.id != myFocusId) {
                                LOGGER.info("Got audio focus action for not us? our id: {}, received: {}", myFocusId, payload.id)
                                continue
                            }
                            synchronized(this) {
                                when (payload.action) {
                                    AudioFocusAction.AudioFocusActionType.AUDIO_FOCUS_ACTION_TYPE_SUSPEND -> {
                                        focusStatus = AudioFocusState.SUSPENDED
                                        //todo pause the audio
                                    }

                                    AudioFocusAction.AudioFocusActionType.AUDIO_FOCUS_ACTION_TYPE_RESTORE -> {
                                        focusStatus = AudioFocusState.HELD
                                        //todo unpause the audio
                                    }

                                    AudioFocusAction.AudioFocusActionType.AUDIO_FOCUS_ACTION_TYPE_LOSS -> {
                                        focusStatus = AudioFocusState.NOT_HELD
                                        radio.availableTuners.forEach {
                                            if (it.currentRunningRadioService != null) {
                                                it.stopRadioService()
                                            }
                                        }
                                    }

                                    AudioFocusAction.AudioFocusActionType.AUDIO_FOCUS_ACTION_TYPE_DUCK_START -> {
                                        focusStatus = AudioFocusState.DUCK
                                        //todo actually duck
                                    }

                                    AudioFocusAction.AudioFocusActionType.AUDIO_FOCUS_ACTION_TYPE_DUCK_END -> {
                                        focusStatus = AudioFocusState.HELD
                                        //todo un-duck
                                    }
                                }
                            }
                        }
                        is AudioFocusChangeResponse -> {
                            if (payload.id != myFocusId) {
                                LOGGER.info("Got audio focus response for not us? our id: {}, received: {}", myFocusId, payload.id)
                                continue
                            }
                            val acquiredFocus = payload.result
                            synchronized(this) {
                                focusStatus = if (acquiredFocus) AudioFocusState.HELD else AudioFocusState.NOT_HELD
                            }
                            completeWaitingFocus(acquiredFocus)
                        }

                        else -> LOGGER.debug("Ignoring {}", receivedMsg)
                    }
                }
            }
        }
    }

    private fun completeWaitingFocus(success: Boolean) {
        synchronized(this) {
            val waitingOnFocusLocal = waitingOnFocus
            waitingOnFocusLocal?.complete(success)
            waitingOnFocus = null
        }
    }

    private suspend fun requestFocusInternal(): CompletableDeferred<Boolean> {
        val toWait = CompletableDeferred<Boolean>(currentCoroutineContext().job)
        var localSock: DefaultClientWebSocketSession? = null
        synchronized(this) {
            localSock = socketReference ?: return@synchronized toWait.complete(NOT_CONNECTED_BEHAVIOUR)
            val currentStatus = focusStatus
            when (currentStatus) {
                AudioFocusState.NOT_CONNECTED -> toWait.complete(NOT_CONNECTED_BEHAVIOUR)
                AudioFocusState.HELD -> toWait.complete(true)
                AudioFocusState.REQUESTED -> {
                    //return the existing wait, or fail due to mismatched state
                    val existingWait = waitingOnFocus
                    if (existingWait != null) {
                        return existingWait
                    }
                    toWait.complete(false)
                } //duplicate request?
                AudioFocusState.SUSPENDED,
                AudioFocusState.DUCK -> toWait.complete(false)//deny when ducked or suspended
                AudioFocusState.NOT_HELD -> {
                    //assign before exiting sync, so it guarantees being called
                    waitingOnFocus = toWait
                    focusStatus = AudioFocusState.REQUESTED
                }
            }
        }
        if (toWait.isCompleted) {
            return toWait
        }
        checkNotNull(localSock) { "If localSock is null, the deferred should already be completed" }
        //if we get to here, we have to request focus (can't do it inside the sync block)
        try {
            localSock.sendSerialized(audioFocusChangeRequest {
                id = myFocusId
                type = AudioFocusType.AUDIO_FOCUS_TYPE_GAIN
            })
        } catch (e: Exception) {
            LOGGER.error("Failed to request focus", e)
            synchronized(this) {
                waitingOnFocus = null
                if (focusStatus != AudioFocusState.NOT_CONNECTED) {
                    focusStatus = AudioFocusState.NOT_HELD
                }
            }
            toWait.complete(false)
            return toWait
        }
        return toWait
    }

    suspend fun requestFocus() = requestFocusInternal().await()
}