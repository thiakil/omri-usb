package com.thiakil.tunerapi.messages

import com.thiakil.com.thiakil.tunerapi.ScanCounts
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
@SerialName("scan_status")
data class ScanStatus(
    val percentScanned: Int,
    val channel: String,
    val frequencyMHz: Float
): WSMessage() {
    constructor(percentScanned: Int, frequencyHz: Int) :this(percentScanned, hzToChannel(frequencyHz), frequencyHz / 1_000_000F)
    companion object {
        fun hzToChannel(frequencyHz: Int): String {
            return when (frequencyHz / 1000) {
                174928 -> "5A"
                176640 -> "5B"
                178352 -> "5C"
                180064 -> "5D"
                181936 -> "6A"
                183648 -> "6B"
                185360 -> "6C"
                187072 -> "6D"
                188928 -> "7A"
                190640 -> "7B"
                192352 -> "7C"
                194064 -> "7D"
                195936 -> "8A"
                197648 -> "8B"
                199360 -> "8C"
                201072 -> "8D"
                202928 -> "9A"
                204640 -> "9B"
                206352 -> "9C"
                208064 -> "9D"
                209936 -> "10A"
                210096 -> "10N"
                211648 -> "10B"
                213360 -> "10C"
                215072 -> "10D"
                216928 -> "11A"
                217088 -> "11N"
                218640 -> "11B"
                220352 -> "11C"
                222064 -> "11D"
                223936 -> "12A"
                224096 -> "12N"
                225648 -> "12B"
                227360 -> "12C"
                229072 -> "12D"
                230784 -> "13A"
                232496 -> "13B"
                234208 -> "13C"
                235776 -> "13D"
                237488 -> "13E"
                239200 -> "13F"
                else -> "Unknown"
            }
        }
    }
}

@Serializable
@SerialName("start_scan")
data class StartScan(val clearExisting: Boolean = false): WSMessage()
@Serializable
@SerialName("stop_scan")
data object StopScan: WSMessage()

@Serializable
@SerialName("scanned_service")
data class ScanFoundService(val countNew: Int, val countUpdated: Int, val countSame: Int): WSMessage() {
    constructor(scanCounts: ScanCounts): this(scanCounts.countNew, scanCounts.countUpdated, scanCounts.countSame)
}