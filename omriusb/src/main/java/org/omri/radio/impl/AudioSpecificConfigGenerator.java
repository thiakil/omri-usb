package org.omri.radio.impl;

import java.io.ByteArrayOutputStream;

public class AudioSpecificConfigGenerator {

    enum AudioObjectType {
        AOT_NULL(0),
        AOT_AAC_MAIN(1),          // Main
        AOT_AAC_LC(2),            // Low Complexity
        AOT_AAC_SSR(3),           // Scalable Sample Rate
        AOT_AAC_LTP(4),           // Long Term Prediction
        AOT_SBR(5),               // Spectral Band Replication
        AOT_AAC_SCALABLE(6),      // Scalable
        AOT_TWINVQ(7),            // Twin Vector Quantizer
        AOT_CELP(8),              // Code Excited Linear Prediction
        AOT_HVXC(9),              // Harmonic Vector eXcitation Coding
        AOT_TTSI(12),             // Text-To-Speech Interface
        AOT_MAINSYNTH(13),        // Main Synthesis
        AOT_WAVESYNTH(14),        // Wavetable Synthesis
        AOT_MIDI(15),             // General MIDI
        AOT_SAFX(16),             // Algorithmic Synthesis and Audio Effects
        AOT_ER_AAC_LC(17),        // Error Resilient Low Complexity
        AOT_ER_AAC_LTP(19),       // Error Resilient Long Term Prediction
        AOT_ER_AAC_SCALABLE(20),  // Error Resilient Scalable
        AOT_ER_TWINVQ(21),        // Error Resilient Twin Vector Quantizer
        AOT_ER_BSAC(22),          // Error Resilient Bit-Sliced Arithmetic Coding
        AOT_ER_AAC_LD(23),        // Error Resilient Low Delay
        AOT_ER_CELP(24),          // Error Resilient Code Excited Linear
        // Prediction
        AOT_ER_HVXC(25),          // Error Resilient Harmonic Vector eXcitation
        // Coding
        AOT_ER_HILN(26),          // Error Resilient Harmonic and Individual Lines
        // plus Noise
        AOT_ER_PARAM(27),         // Error Resilient Parametric
        AOT_SSC(28),              // SinuSoidal Coding
        AOT_PS(29),               // Parametric Stereo
        AOT_SURROUND(30),         // MPEG Surround
        AOT_ESCAPE(31),           // Escape Value
        AOT_L1(32),               // Layer 1
        AOT_L2(33),               // Layer 2
        AOT_L3(34),               // Layer 3
        AOT_DST(35),              // Direct Stream Transfer
        AOT_ALS(36),              // Audio LosslesS
        AOT_SLS(37),              // Scalable LosslesS
        AOT_SLS_NON_CORE(38),     // Scalable LosslesS (non core)
        AOT_ER_AAC_ELD(39),       // Error Resilient Enhanced Low Delay
        AOT_SMR_SIMPLE(40),       // Symbolic Music Representation Simple
        AOT_SMR_MAIN(41),         // Symbolic Music Representation Main
        AOT_USAC(42),             // Unified Speech and Audio Coding
        AOT_SAOC(43),             // Spatial Audio Object Coding
        AOT_LD_SURROUND(44),      // Low Delay MPEG Surround
        SAOC_DE(45),  // Spatial Audio Object Coding Dialogue Enhancement
        ;
        
        public final int id;

        AudioObjectType(int id) {
            this.id = id;
        }
    }

    /**
     * Generates a standard MPEG-4 AudioSpecificConfig (ASC) byte array
     * with explicit hierarchical signaling for HE-AAC v2 (SBR + PS).
     *
     * @param playbackFrequency The full target playback frequency (e.g., 44100).
     * @return Byte array containing the HE-AAC v2 AudioSpecificConfig.
     */
    public static byte[] generateHeAacV2Config(int playbackFrequency, int channels, boolean sbr, boolean ps) {
        BitPacker packer = new BitPacker();

        // 1. Core(?) Audio Object Type (5 bits)
        packer.writeBits(
              (  ps ? AudioObjectType.AOT_PS
              : sbr ? AudioObjectType.AOT_SBR
              :       AudioObjectType.AOT_AAC_LC
              ).id,
              5
        );

        // 2. Core Sampling Frequency Index (4 bits) -> Half of playback frequency
        int coreFrequency = playbackFrequency;
        if (sbr) {
            coreFrequency = playbackFrequency / 2;
        }
        int coreFreqIndex = getSamplingFreqIndex(coreFrequency);
        packer.writeBits(coreFreqIndex, 4);
        if (coreFreqIndex == 0xF) {
            packer.writeBits(coreFrequency, 24);
        }

        // 3. Core Channel Configuration (4 bits)
        packer.writeBits(ps ? 1 : channels, 4);

        if (sbr || ps) {
            // Extension Sampling Frequency Index (4 bits) -> Full Playback Frequency
            int extensionFreqIndex = getSamplingFreqIndex(playbackFrequency);
            packer.writeBits(extensionFreqIndex, 4);
            if (extensionFreqIndex == 0xF) {
                packer.writeBits(playbackFrequency, 24);
            }

            // Audio Object Type (5 bits)
            packer.writeBits(AudioObjectType.AOT_AAC_LC.id, 5);
        } else { //lc fields - untested
            //Frame length flag
            packer.writeBits(0, 1);
            //depends on core coder
            packer.writeBits(0,1);
            //extension flag
            packer.writeBits(0, 1);
        }

        // Flush remaining bits to ensure proper alignment at byte boundary
        packer.flush();

        return packer.toByteArray();
    }

    private static int getSamplingFreqIndex(int frequency) {
        switch (frequency) {
            case 96000: return 0;
            case 88200: return 1;
            case 64000: return 2;
            case 48000: return 3;
            case 44100: return 4;
            case 32000: return 5;
            case 24000: return 6;
            case 22050: return 7;
            case 16000: return 8;
            case 12000: return 9;
            case 11025: return 10;
            case 8000:  return 11;
            default:    return 15; // Escape value
        }
    }

    private static class BitPacker {
        private final ByteArrayOutputStream output = new ByteArrayOutputStream();
        private int currentByte = 0;
        private int numBitsInCurrentByte = 0;

        public void writeBits(int value, int numBits) {
            for (int i = numBits - 1; i >= 0; i--) {
                int bit = (value >> i) & 1;
                currentByte = (currentByte << 1) | bit;
                numBitsInCurrentByte++;

                if (numBitsInCurrentByte == 8) {
                    output.write(currentByte);
                    currentByte = 0;
                    numBitsInCurrentByte = 0;
                }
            }
        }

        public void flush() {
            if (numBitsInCurrentByte > 0) {
                currentByte <<= (8 - numBitsInCurrentByte);
                output.write(currentByte);
                currentByte = 0;
                numBitsInCurrentByte = 0;
            }
        }

        public byte[] toByteArray() {
            return output.toByteArray();
        }
    }
}