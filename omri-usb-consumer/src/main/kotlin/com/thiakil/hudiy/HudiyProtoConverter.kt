package com.thiakil.com.thiakil.hudiy

import com.google.protobuf.CodedOutputStream
import com.google.protobuf.MessageLite
import com.google.protobuf.Parser
import hudiy.app.api.*
import io.ktor.serialization.WebsocketContentConverter
import io.ktor.serialization.WebsocketConverterNotFoundException
import io.ktor.serialization.WebsocketDeserializeException
import io.ktor.util.reflect.TypeInfo
import io.ktor.utils.io.charsets.Charset
import io.ktor.websocket.Frame
import java.nio.ByteBuffer
import java.nio.ByteOrder

data class HudiyMessage(val messageType: MessageType, val payload: MessageLite? = null)

class HudiyProtoConverter: WebsocketContentConverter {

    override suspend fun deserialize(
        charset: Charset,
        typeInfo: TypeInfo,
        content: Frame
    ): HudiyMessage {
        if (content !is Frame.Binary) throw WebsocketConverterNotFoundException("Not a binary frame")
        val buffer = content.buffer.order(ByteOrder.LITTLE_ENDIAN)
        if (buffer.remaining() < HEADER_SIZE) {
            throw WebsocketConverterNotFoundException("Packet too small: ${buffer.remaining()}")
        }
        val size = buffer.getInt()
        val rawMessageType = buffer.getInt()
        val messageId = MessageType.forNumber(rawMessageType) ?: throw WebsocketDeserializeException("Unknown message type: $rawMessageType", frame = content)
        if (messageId == MessageType.MESSAGE_PING || messageId == MessageType.MESSAGE_PONG || messageId == MessageType.MESSAGE_BYEBYE) {
            return HudiyMessage(messageId)
        }
        buffer.position(HEADER_SIZE)//move past unused flags
        if (size == 0 || size > buffer.remaining()) {
            throw WebsocketDeserializeException("Size $size is greater than remaining: ${buffer.remaining()}", frame = content)
        }
        return HudiyMessage(messageId, messageId.parser.parseFrom(buffer))
    }

    override suspend fun serialize(
        charset: Charset,
        typeInfo: TypeInfo,
        value: Any?
    ): Frame {
        val payloadSize = when (value) {
            MessageType.MESSAGE_PING, MessageType.MESSAGE_PONG,MessageType.MESSAGE_BYEBYE -> 0
            is MessageLite -> value.serializedSize
            else -> throw WebsocketConverterNotFoundException("Unknown value type: $value")
        }
        //from here it is expected that value is either MessageLite or MessageType with no payload
        val messageType = when (value) {
            is MessageType -> value
            is MessageLite -> value.messageType
            else -> throw WebsocketConverterNotFoundException("Unexpected value: $value")
        }

        val rawBytes = ByteArray(HEADER_SIZE + payloadSize)
        val byteBuffer: ByteBuffer = ByteBuffer.wrap(rawBytes)
            .order(ByteOrder.LITTLE_ENDIAN)
            .putInt(payloadSize)
            .putInt(messageType.number)
            .putInt(0)//unused "flags"

        if (payloadSize > 0) {
            (value as MessageLite).writeTo(CodedOutputStream.newInstance(byteBuffer))
        }

        return Frame.Binary(true, rawBytes)
    }

    override fun isApplicable(frame: Frame): Boolean = frame is Frame.Binary

    val MessageType.parser: Parser<out MessageLite> get() = when (this) {
        MessageType.MESSAGE_INVALID_ID -> throw WebsocketConverterNotFoundException("Invalid id")
        MessageType.MESSAGE_HELLO_REQUEST -> HelloRequest.parser()
        MessageType.MESSAGE_HELLO_RESPONSE -> HelloResponse.parser()
        MessageType.MESSAGE_SET_STATUS_SUBSCRIPTIONS -> SetStatusSubscriptions.parser()
        MessageType.MESSAGE_SET_REVERSE_CAMERA_STATUS -> SetReverseCameraStatus.parser()
        MessageType.MESSAGE_PROJECTION_STATUS -> ProjectionStatus.parser()
        MessageType.MESSAGE_MEDIA_STATUS -> MediaStatus.parser()
        MessageType.MESSAGE_MEDIA_METADATA -> MediaMetadata.parser()
        MessageType.MESSAGE_NAVIGATION_STATUS -> NavigationStatus.parser()
        MessageType.MESSAGE_NAVIGATION_MANEUVER_DETAILS -> NavigationManeuverDetails.parser()
        MessageType.MESSAGE_NAVIGATION_MANEUVER_DISTANCE -> NavigationManeuverDistance.parser()
        MessageType.MESSAGE_REGISTER_STATUS_ICON_REQUEST -> RegisterStatusIconRequest.parser()
        MessageType.MESSAGE_REGISTER_STATUS_ICON_RESPONSE -> RegisterStatusIconResponse.parser()
        MessageType.MESSAGE_UNREGISTER_STATUS_ICON -> UnregisterStatusIcon.parser()
        MessageType.MESSAGE_CHANGE_STATUS_ICON_STATE -> ChangeStatusIconState.parser()
        MessageType.MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST -> RegisterNotificationChannelRequest.parser()
        MessageType.MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE -> RegisterNotificationChannelResponse.parser()
        MessageType.MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL -> UnregisterNotificationChannel.parser()
        MessageType.MESSAGE_SHOW_NOTIFICATION -> ShowNotification.parser()
        MessageType.MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST -> RegisterToastChannelRequest.parser()
        MessageType.MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE -> RegisterToastChannelResponse.parser()
        MessageType.MESSAGE_UNREGISTER_TOAST_CHANNEL -> UnregisterToastChannel.parser()
        MessageType.MESSAGE_SHOW_TOAST -> ShowToast.parser()
        MessageType.MESSAGE_OBD_CONNECTION_STATUS -> ObdConnectionStatus.parser()
        MessageType.MESSAGE_QUERY_OBD_DEVICE_REQUEST -> QueryObdDeviceRequest.parser()
        MessageType.MESSAGE_QUERY_OBD_DEVICE_RESPONSE -> QueryObdDeviceResponse.parser()
        MessageType.MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST -> RegisterAudioFocusReceiverRequest.parser()
        MessageType.MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE -> RegisterAudioFocusReceiverResponse.parser()
        MessageType.MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER -> UnregisterAudioFocusReceiver.parser()
        MessageType.MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST -> AudioFocusChangeRequest.parser()
        MessageType.MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE -> AudioFocusChangeResponse.parser()
        MessageType.MESSAGE_AUDIO_FOCUS_ACTION -> AudioFocusAction.parser()
        MessageType.MESSAGE_AUDIO_FOCUS_MEDIA_KEY -> AudioFocusMediaKey.parser()
        MessageType.MESSAGE_PHONE_CONNECTION_STATUS -> PhoneConnectionStatus.parser()
        MessageType.MESSAGE_PHONE_VOICE_CALL_STATUS -> PhoneVoiceCallStatus.parser()
        MessageType.MESSAGE_PHONE_LEVELS_STATUS -> PhoneLevelsStatus.parser()
        MessageType.MESSAGE_KEY_EVENT -> KeyEvent.parser()
        MessageType.MESSAGE_SET_DARK_MODE -> SetDarkMode.parser()
        MessageType.MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY -> SetCustomOverlayVisibility.parser()
        MessageType.MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY -> SetNavigationOverlayVisibility.parser()
        MessageType.MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY -> SetVolumeOverlayVisibility.parser()
        MessageType.MESSAGE_REGISTER_ACTION_REQUEST -> RegisterActionRequest.parser()
        MessageType.MESSAGE_REGISTER_ACTION_RESPONSE -> RegisterActionResponse.parser()
        MessageType.MESSAGE_DISPATCH_ACTION -> DispatchAction.parser()
        MessageType.MESSAGE_SET_EQUALIZER_PRESET -> SetEqualizerPreset.parser()
        MessageType.MESSAGE_COVERART_REQUEST -> CoverartRequest.parser()
        MessageType.MESSAGE_COVERART_RESPONSE -> CoverartResponse.parser()
        MessageType.MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE -> SetAndroidAutoDayNightMode.parser()
        MessageType.MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE -> SetAutoboxDayNightMode.parser()
        MessageType.MESSAGE_CURRENT_MENU_ACTION -> CurrentMenuAction.parser()
        MessageType.MESSAGE_SET_BASS_TREBLE_BOOST -> SetBassTrebleBoost.parser()
        MessageType.MESSAGE_PING,
        MessageType.MESSAGE_PONG,
        MessageType.MESSAGE_BYEBYE -> throw WebsocketConverterNotFoundException("No payload")
        else -> throw WebsocketConverterNotFoundException("Unknown message")
    }

    val MessageLite.messageType: MessageType get() = when (this) {
        is HelloRequest -> MessageType.MESSAGE_HELLO_REQUEST
        is SetStatusSubscriptions -> MessageType.MESSAGE_SET_STATUS_SUBSCRIPTIONS
        is SetReverseCameraStatus -> MessageType.MESSAGE_SET_REVERSE_CAMERA_STATUS
        is RegisterStatusIconRequest -> MessageType.MESSAGE_REGISTER_STATUS_ICON_REQUEST
        is UnregisterStatusIcon -> MessageType.MESSAGE_UNREGISTER_STATUS_ICON
        is ChangeStatusIconState -> MessageType.MESSAGE_CHANGE_STATUS_ICON_STATE
        is RegisterNotificationChannelRequest -> MessageType.MESSAGE_REGISTER_NOTIFICATION_CHANNEL_REQUEST
        is UnregisterNotificationChannel -> MessageType.MESSAGE_UNREGISTER_NOTIFICATION_CHANNEL
        is ShowNotification -> MessageType.MESSAGE_SHOW_NOTIFICATION
        is RegisterToastChannelRequest -> MessageType.MESSAGE_REGISTER_TOAST_CHANNEL_REQUEST
        is UnregisterToastChannel -> MessageType.MESSAGE_UNREGISTER_TOAST_CHANNEL
        is ShowToast -> MessageType.MESSAGE_SHOW_TOAST
        is QueryObdDeviceRequest -> MessageType.MESSAGE_QUERY_OBD_DEVICE_REQUEST
        is RegisterAudioFocusReceiverRequest -> MessageType.MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_REQUEST
        is RegisterAudioFocusReceiverResponse -> MessageType.MESSAGE_REGISTER_AUDIO_FOCUS_RECEIVER_RESPONSE
        is UnregisterAudioFocusReceiver -> MessageType.MESSAGE_UNREGISTER_AUDIO_FOCUS_RECEIVER
        is AudioFocusChangeRequest -> MessageType.MESSAGE_AUDIO_FOCUS_CHANGE_REQUEST
        is KeyEvent -> MessageType.MESSAGE_KEY_EVENT
        is SetDarkMode -> MessageType.MESSAGE_SET_DARK_MODE
        is SetCustomOverlayVisibility -> MessageType.MESSAGE_SET_CUSTOM_OVERLAY_VISIBILITY
        is SetNavigationOverlayVisibility -> MessageType.MESSAGE_SET_NAVIGATION_OVERLAY_VISIBILITY
        is SetVolumeOverlayVisibility -> MessageType.MESSAGE_SET_VOLUME_OVERLAY_VISIBILITY
        is RegisterActionRequest -> MessageType.MESSAGE_REGISTER_ACTION_REQUEST
        is DispatchAction -> MessageType.MESSAGE_DISPATCH_ACTION
        is SetEqualizerPreset -> MessageType.MESSAGE_SET_EQUALIZER_PRESET
        is CoverartRequest -> MessageType.MESSAGE_COVERART_REQUEST
        is SetAndroidAutoDayNightMode -> MessageType.MESSAGE_SET_ANDROID_AUTO_DAY_NIGHT_MODE
        is SetAutoboxDayNightMode -> MessageType.MESSAGE_SET_AUTOBOX_DAY_NIGHT_MODE
        is SetBassTrebleBoost -> MessageType.MESSAGE_SET_BASS_TREBLE_BOOST

        //client receiving messages, shouldn't really be serialised
        is HelloResponse -> MessageType.MESSAGE_HELLO_RESPONSE
        is MediaStatus -> MessageType.MESSAGE_MEDIA_STATUS
        is ProjectionStatus -> MessageType.MESSAGE_PROJECTION_STATUS
        is MediaMetadata -> MessageType.MESSAGE_MEDIA_METADATA
        is NavigationStatus -> MessageType.MESSAGE_NAVIGATION_STATUS
        is NavigationManeuverDetails -> MessageType.MESSAGE_NAVIGATION_MANEUVER_DETAILS
        is NavigationManeuverDistance -> MessageType.MESSAGE_NAVIGATION_MANEUVER_DISTANCE
        is RegisterStatusIconResponse -> MessageType.MESSAGE_REGISTER_STATUS_ICON_RESPONSE
        is RegisterNotificationChannelResponse -> MessageType.MESSAGE_REGISTER_NOTIFICATION_CHANNEL_RESPONSE
        is RegisterToastChannelResponse -> MessageType.MESSAGE_REGISTER_TOAST_CHANNEL_RESPONSE
        is ObdConnectionStatus -> MessageType.MESSAGE_OBD_CONNECTION_STATUS
        is QueryObdDeviceResponse -> MessageType.MESSAGE_QUERY_OBD_DEVICE_RESPONSE
        is AudioFocusChangeResponse -> MessageType.MESSAGE_AUDIO_FOCUS_CHANGE_RESPONSE
        is AudioFocusMediaKey -> MessageType.MESSAGE_AUDIO_FOCUS_MEDIA_KEY
        is AudioFocusAction -> MessageType.MESSAGE_AUDIO_FOCUS_ACTION
        is PhoneConnectionStatus -> MessageType.MESSAGE_PHONE_CONNECTION_STATUS
        is PhoneVoiceCallStatus -> MessageType.MESSAGE_PHONE_VOICE_CALL_STATUS
        is PhoneLevelsStatus -> MessageType.MESSAGE_PHONE_LEVELS_STATUS
        is RegisterActionResponse -> MessageType.MESSAGE_REGISTER_ACTION_RESPONSE
        is CoverartResponse -> MessageType.MESSAGE_COVERART_RESPONSE
        is CurrentMenuAction -> MessageType.MESSAGE_CURRENT_MENU_ACTION


        else -> throw WebsocketConverterNotFoundException("Unknown value type: ${this.javaClass}")
    }

    companion object {
        private const val HEADER_SIZE = Int.SIZE_BYTES * 3
    }
}