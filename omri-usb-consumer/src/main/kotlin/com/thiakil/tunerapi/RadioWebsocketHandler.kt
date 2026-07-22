package com.thiakil.com.thiakil.tunerapi

import com.thiakil.tunerapi.messages.DabSlideshow
import com.thiakil.tunerapi.messages.DabTextUpdate
import com.thiakil.tunerapi.messages.ErrorMessage
import com.thiakil.tunerapi.messages.ReceptionStatus
import com.thiakil.tunerapi.messages.ServiceList
import com.thiakil.tunerapi.messages.StartService
import com.thiakil.tunerapi.messages.StopService
import com.thiakil.tunerapi.messages.TunerState
import com.thiakil.tunerapi.messages.WSMessage
import io.ktor.serialization.*
import io.ktor.server.websocket.*
import io.ktor.utils.io.*
import kotlinx.coroutines.channels.ClosedReceiveChannelException
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.launch
import org.apache.logging.log4j.LogManager
import org.omri.radioservice.RadioService
import org.omri.radioservice.RadioServiceDab
import org.omri.radioservice.metadata.Textual
import org.omri.radioservice.metadata.TextualDabDynamicLabel
import org.omri.radioservice.metadata.TextualMetadataListener
import org.omri.radioservice.metadata.Visual
import org.omri.radioservice.metadata.VisualDabSlideShow
import org.omri.radioservice.metadata.VisualMetadataListener
import org.omri.tuner.ReceptionQuality
import org.omri.tuner.Tuner
import org.omri.tuner.TunerListener
import org.omri.tuner.TunerStatus
import java.util.Date
import kotlin.time.Duration.Companion.seconds

class RadioWebsocketHandler(
    private val session: WebSocketServerSession,
    val tuner: Tuner
): TunerListener, TextualMetadataListener, VisualMetadataListener
{
    private var lastReceptionSentAt: Long = 0
    suspend fun handleSession() {
        tuner.subscribe(this)
        sendMessage(TunerState(tuner))
        sendMessage(ServiceList(tuner))
        tuner.currentRunningRadioService?.subscribe(
            this
        )
        try {
            while (true) {
                session.ensureActive()
                try {
                    when (val message = session.receiveDeserialized<WSMessage>()) {
                        is StartService -> {
                            val service = tuner.radioServices.firstOrNull { it is RadioServiceDab && it.serviceId == message.serviceId && it.ensembleId == message.ensembleId }
                            if (service != null) {
                                tuner.startRadioService(service)
                            } else {
                                sendMessage(ErrorMessage("Service not found"))
                            }
                        }
                        is StopService -> tuner.stopRadioService()
                        else -> sendMessage(ErrorMessage("Unknown message"))
                    }
                } catch (e: WebsocketDeserializeException) {
                    LOGGER.error("Received websocket deserialize exception.", e)
                }
            }
        }
        catch (e: CancellationException) {
            LOGGER.debug("Cancelled", e)
        }
        catch (e: ClosedReceiveChannelException) {
            LOGGER.debug("Closed", e)
        }
        catch (e: Exception) {
            LOGGER.error("Caught exception", e)//todo decide which one is an actual error
        }
        finally {
            tuner.unsubscribe(this)
        }
    }

    private suspend fun sendMessage(message: WSMessage) {
        session.sendSerialized<WSMessage>(message)
    }
    
    private fun sendMessageSync(message: WSMessage) {
        session.launch {
            sendMessage(message)
        }
    }

    override fun tunerStatusChanged(
        tuner: Tuner,
        newStatus: TunerStatus
    ) {
        sendMessageSync(TunerState(tuner))
    }

    override fun tunerScanStarted(tuner: Tuner) {
        sendMessageSync(TunerState(tuner))
    }

    override fun tunerScanProgress(
        tuner: Tuner,
        percentScanned: Int,
        frequencyHz: Int
    ) {
        //todo
    }

    override fun tunerScanFinished(tuner: Tuner) {
        sendMessageSync(TunerState(tuner))
        sendMessageSync(ServiceList(tuner))
    }

    override fun tunerScanServiceFound(
        tuner: Tuner,
        foundService: RadioService
    ) {

    }

    override fun radioServiceStarted(
        tuner: Tuner,
        startedRadioService: RadioService
    ) {
        startedRadioService.subscribe(this)
        sendMessageSync(TunerState(tuner))
    }

    override fun radioServiceStopped(
        tuner: Tuner,
        stoppedRadioService: RadioService
    ) {
        stoppedRadioService.unsubscribe(this)
        sendMessageSync(TunerState(tuner))
    }

    override fun tunerReceptionStatistics(
        tuner: Tuner,
        rfLock: Boolean,
        quality: ReceptionQuality,
        rawValue: Int
    ) {
        val currTime = Date().time
        if (currTime - lastReceptionSentAt > 1.seconds.inWholeMilliseconds) {
            lastReceptionSentAt = currTime
            sendMessageSync(ReceptionStatus(rfLock, quality, rawValue))
        }
    }

    override fun tunerRawData(tuner: Tuner, data: ByteArray) {

    }

    override fun dabDateTime(tuner: Tuner, dabDateTime: Date) {
        //todo?
    }

    override fun newTextualMetadata(textualMetadata: Textual) {
        val dabText = textualMetadata as? TextualDabDynamicLabel ?: return
        sendMessageSync(DabTextUpdate(dabText))
    }

    override fun newVisualMetadata(visualMetadata: Visual) {
        if (visualMetadata is VisualDabSlideShow) {
            sendMessageSync(DabSlideshow(visualMetadata))
        }
    }

    companion object {
        private val LOGGER = LogManager.getLogger(RadioWebsocketHandler::class.java)
    }
}