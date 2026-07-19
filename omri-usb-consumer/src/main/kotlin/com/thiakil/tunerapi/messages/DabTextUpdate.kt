package com.thiakil.tunerapi.messages

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.omri.radioservice.metadata.TextualDabDynamicLabel

@Serializable
@SerialName("dab_text_update")
data class DabTextUpdate(
    val text: String,
    val tags: Map<String, String>
) : WSMessage() {
    constructor(label: TextualDabDynamicLabel): this(
        label.text,
        label.dlPlusItems.associateBy(
            { it.dlPlusContentTypeDescription },
            { it.dlPlusContentText }
        )
    )

}
