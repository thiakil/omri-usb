package com.thiakil.tunerapi.messages

import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import org.omri.radioservice.metadata.Visual
import org.omri.radioservice.metadata.VisualMimeType
import kotlin.io.encoding.Base64

@Serializable
@SerialName("dab_image")
data class DabSlideshow(
    val mimeType: String,
    @Serializable(with = Base64ByteArraySerializer::class)
    val imageData: ByteArray
): WSMessage() {
    constructor(visual: Visual): this(visual.visualMimeType.mimeTypeString, visual.visualData)
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as DabSlideshow

        if (mimeType != other.mimeType) return false
        if (!imageData.contentEquals(other.imageData)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = mimeType.hashCode()
        result = 31 * result + imageData.contentHashCode()
        return result
    }
}

object Base64ByteArraySerializer : KSerializer<ByteArray> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Base64ByteArray", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: ByteArray) {
        encoder.encodeString(Base64.encode(value))
    }

    override fun deserialize(decoder: Decoder): ByteArray {
        return Base64.decode(decoder.decodeString())
    }
}