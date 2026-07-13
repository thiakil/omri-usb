package org.omri.radio.impl;

import java.lang.reflect.Array;
import java.util.Arrays;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.jetbrains.annotations.Nullable;
import org.omri.radio.Radio;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.freedesktop.gstreamer.*;
import org.freedesktop.gstreamer.elements.AppSrc;
import java.nio.ByteBuffer;

//import de.irt.dabaudiodecoderplugininterface.IDabPluginCallback;
//import de.irt.dabaudiodecoderplugininterface.IDabPluginInterface;


/**
 * Copyright (C) 2018 IRT GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License
 * at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 *
 * @author Fabian Sattler, IRT GmbH
 */

public class DabAudioDecoder {

	public static final int[] ADTS_FREQ_INDEX = {
		96000,
		88200,
		64000,
		48000,
		44100,
		32000,
		24000,
		22050,
		16000,
		12000,
		11025,
		8000,
		7350,
		};

	private static final Logger LOGGER = LogManager.getLogger("DabAudioDecoder");

	private final int BUFFER_TIMEOUT = 1000;

	//DAB ASCTy
	private final int DAB_CODEC_MP2 = 0;
	private final int DAB_CODEC_AAC = 63;

	private final String[] DAB_MIME = {"audio/unknown", "audio/mpeg-l2" /*"audio/mpeg"*/, "audio/mp4a-latm"};

	private Pipeline pipeline = null;
	private AppSrc appSrc = null;

	private @Nullable Thread mDecodeThread = null;
	private boolean mDecode = false;

	private DabDecoderCallback mCallback = null;

	private int mConfCodec = 0;
	private int mConfSampling = 0;
	private int mConfChans = 0;
	private boolean mConfSbr = false;
	private boolean mConfPs = false;

	private final ConcurrentLinkedQueue<byte[]> mDataQ = new ConcurrentLinkedQueue<>();

	DabAudioDecoder() {
		LOGGER.debug("Creating new decoder instance");
	}

	int getConfChans() {
		return mConfChans;
	}

	int getConfCodec() {
		return mConfCodec;
	}

	int getConfSampling() {
		return mConfSampling;
	}

	boolean getConfSbr() {
		return mConfSbr;
	}

	boolean getConfPs() {
		return mConfPs;
	}


	synchronized void setCodecCallback(DabDecoderCallback codecCallback) {
		mDataQ.clear();
		mCallback = codecCallback;
	}


	void feedData(byte[] audioData) {
		if (mDecodeThread == null || !mDecodeThread.isAlive()) {
			LOGGER.warn("Discarding audio data as thread is not alive");
			return;
		}
		if (mConfCodec == DAB_CODEC_AAC && audioData != null && audioData.length > 0) {
			mDataQ.offer(audioData);
		}//todo non-aac
	}

	void stopCodec() {
		stopDecodeThread();

		closeGst();

		ArrayList<DabAudioDecoderStateCallBack> currentCallbacks;
		synchronized (mCodecStateCallbacks){
			currentCallbacks = new ArrayList<>(mCodecStateCallbacks);
		}
		//callbacks delete themselves
		for (DabAudioDecoderStateCallBack cb : currentCallbacks) {
			if (cb != null) {
				cb.codecStopped(this);
			}
		}
	}

	private void closeGst() {
		if (this.appSrc != null) {
			this.appSrc.endOfStream();
			this.appSrc = null;
		}
		if (this.pipeline != null) {
			this.pipeline.stop();
			this.pipeline.close();
		}
	}

	private void stopDecodeThread() {
		mDecode = false;

		if (mDecodeThread != null) {
			LOGGER.debug("Stopping DecodeThread");

			if (mDecodeThread.isAlive()) {
				mDecodeThread.interrupt();
				try {
					mDecodeThread.join(2000);
				} catch (InterruptedException interExc) {
					LOGGER.debug("InterruptedException while joining Decodethread");
				}
			}
		}
		mDataQ.clear();
	}

	boolean configure(int dabCodec, int samplingRate, int channelCnt, boolean sbr, boolean ps) {
        LOGGER.debug("Configuring Codec: {} with: {} kHz, {} Channels and SBR: {}", dabCodec, samplingRate, channelCnt, sbr);
		if (dabCodec == DAB_CODEC_MP2) {
			mOutputChannels = channelCnt;
			mOutputSampling = samplingRate;
		} else if (dabCodec == DAB_CODEC_AAC) {
			mOutputChannels = channelCnt == 2 || ps ? 2 : 1;
			mOutputSampling = getSamplingIndex(samplingRate);
		}

		LOGGER.debug("Reconfiguring Decoder!");

		stopDecodeThread();

		mDataQ.clear();

		closeGst();

		mConfCodec = dabCodec;
		mConfSampling = samplingRate;
		mConfChans = channelCnt;
		mConfSbr = sbr;
		mConfPs = ps;

		if (mConfCodec == DAB_CODEC_AAC) {
			if (!creatMediaFormat()) {
				return false;
			}

			/*if(mMediaCodec == null) {
				return false;
			}*/

			mDecodeThread = new Thread(DecoderRunnable, "aac decoder thread");
			mDecodeThread.start();
		}

		return true;
	}

	public static int getSamplingIndex(int samplingRate) {
		int output = -1;
		for (int i = 0; i < ADTS_FREQ_INDEX.length; i++) {
			if (ADTS_FREQ_INDEX[i] == samplingRate) {
				output = i;
				break;
			}
		}
		if (output == -1) {
			LOGGER.error("Didn't find sampling index for rate: {}", samplingRate);
			return 0;
		}
		return output;
	}

	public static void addADTStoPacket(byte[] packet, int packetLen, int profile, int sampleRate, int channels) {
		// Syncword: 12 bits, all 1s (0xFFF)
		packet[0] = (byte) 0xFF;
		packet[1] = (byte) 0xF1; // 0xF1 implies Layer = 0, Protection Absent = 1 (No CRC)

		// Profile (2 bits), Sample Rate Index (4 bits), Private bit (1 bit), Channel Config (high 1 bit)
		packet[2] = (byte) (((profile - 1) << 6) | (sampleRate << 2) | (channels >> 2));

		// Channel Config (low 2 bits), Originality (1 bit), Home (1 bit), Copyrighted (1 bit), Copyrighted Start (1 bit), Frame Length (high 2 bits)
		packet[3] = (byte) (((channels & 3) << 6) | (packetLen >> 11));

		// Frame Length (middle 8 bits)
		packet[4] = (byte) ((packetLen >> 3) & 0xFF);

		// Frame Length (low 3 bits), Buffer Fullness (high 5 bits)
		packet[5] = (byte) (((packetLen & 7) << 5) | 0x1F);

		// Buffer Fullness (low 6 bits), Number of AAC frames minus 1 (2 bits)
		packet[6] = (byte) 0xFC; // 0xFC sets buffer fullness to Variable Bitrate (VBR) and 1 data packet
		//LOGGER.debug("ADTS {}", toHex(packet).substring(0, 14));
	}

	private boolean creatMediaFormat() {
		/*if(mConfCodec == DAB_CODEC_AAC) {
			mMediaFormat = MediaFormat.createAudioFormat(DAB_MIME[2], mConfSampling, mConfChans);
		}
		if(mConfCodec == DAB_CODEC_MP2) {
			mMediaFormat = MediaFormat.createAudioFormat(DAB_MIME[1], mConfSampling, mConfChans);
		}*/

		/*gst-launch-1.0 filesrc location=raw_audio.aac ! \
    audio/mpeg,mpegversion=4,stream-format=raw,codec_data=(string)1210 ! \
    aacparse ! \
    avdec_aac ! \
    audioconvert ! \
    audioresample ! \
    autoaudiosink */
		byte[] ascBytes = null;
		if (mConfCodec == DAB_CODEC_AAC) {
			if (mConfSbr) {
				if (!mConfPs) {
					LOGGER.debug("Configuring ASC with SBR!");
					ascBytes = new byte[]{(byte) 0x2B, (byte) 0x11, (byte) 0x8A, (byte) 0x00};
				} else {
					LOGGER.debug("Configuring ASC with SBR and PS!");
					ascBytes = new byte[]{(byte) 0xEB, (byte) 0x11, (byte) 0x8A, (byte) 0x00};
				}
			} else {
				LOGGER.debug("Configuring ASC without SBR!");
				ascBytes = new byte[]{(byte) 0x11, (byte) 0x94, (byte) 0x00, (byte) 0x00};
			}

			if (mConfSampling == 32000) {
				LOGGER.debug("Configuring ASC for 32 kHz!");
				ascBytes[0] = (byte) (ascBytes[0] + 1);
				if (mConfSbr) {
					LOGGER.debug("Configuring ASC for 32 kHz and SBR!");
					ascBytes[1] = (byte) (ascBytes[1] + 1);
				}
			}

			if (mConfChans == 1) {
				LOGGER.debug("Configuring ASC for Mono!");
				ascBytes[1] = (byte) (ascBytes[1] - 8);
			}
		} else {
			throw new IllegalStateException("Unhandled codec: "+mConfCodec);
		}

		// Initialize GStreamer
		Gst.init();

		try {
			// 1. Create elements
			pipeline = new Pipeline("aac-pipeline");
			appSrc = (AppSrc) ElementFactory.make("appsrc", "source");
			Element aacParse = ElementFactory.make("aacparse", "parser");
			Element decoder;
			try {
				decoder = ElementFactory.make("faad", "decoder");
			} catch (Exception e) {
				LOGGER.warn("Falling back to avdec", e);
				decoder = ElementFactory.make("avdec_aac", "decoder");
			}
			//Element decoder = ElementFactory.make("avdec_aac", "decoder");

			Element audioConvert = ElementFactory.make("audioconvert", "converter");
			Element audioResample = ElementFactory.make("audioresample", "resampler");
			Element audioSink = ElementFactory.make("autoaudiosink", "sink");

			if (appSrc == null || decoder == null || audioSink == null) {
				System.err.println("Could not create all GStreamer elements.");
				if (appSrc != null) {
					appSrc.close();
				}
				pipeline.close();
				return false;
			}

			// 2. Set Caps for Raw AAC (Example: 44.1kHz, Stereo -> codec_data 1210)
			// Note: codec_data must be passed as a GstBuffer containing the raw hex bytes

			String capstr = "audio/mpeg, mpegversion=4, stream-format=adts, framed=true, plc=true, codec_data=(buffer)" + toHex(ascBytes, ascBytes.length);
			LOGGER.info("using {}", capstr);


			// 3. Assemble Pipeline
			pipeline.addMany(appSrc, aacParse, decoder, audioConvert, audioResample, audioSink);
			if (!Element.linkMany(appSrc, aacParse, decoder, audioConvert, audioResample, audioSink)) {
				throw new IllegalStateException("link failed");
			}
			Caps caps = Caps.fromString(capstr);
			appSrc.setCaps(caps);
			appSrc.setStreamType(AppSrc.StreamType.STREAM);

			//mDataQ.offer(ascBytes);
			// 4. Start Pipeline Playing
			pipeline.play();
		} catch (Exception e) {
			LOGGER.error("Failed to init gstreamer", e);
			if (appSrc != null) {
				appSrc.close();
			}
			if (pipeline != null) {
				pipeline.close();
			}
			return false;
		}

		return true;
	}

	private static String toHex(byte[] bytes, int limit) {
		StringBuilder builder = new StringBuilder(limit*2);
        for (int i = 0; i < bytes.length && i < limit; i++) {
            byte aByte = bytes[i];
            builder.append(String.format("%02X", aByte));
        }
		return builder.toString();
	}

	Runnable DecoderRunnable = new Runnable() {

		@Override
		public void run() {
			LOGGER.debug("Starting DecodeThread");
			mDecode = true;
			THREADLOOP:
			while (mDecode) {
				//todo better waiting?
				while (mDecode && mDataQ.isEmpty()) {
					try {
						Thread.sleep(5);
					} catch (InterruptedException e) {
						LOGGER.error("Interrupted", e);
						break THREADLOOP;
					}
				}
				if (!mDecode) {
					break THREADLOOP;
				}
				try {
					byte[] rawAacFrame = mDataQ.poll();
					if (rawAacFrame == null || rawAacFrame.length == 0)
						continue THREADLOOP;

					//LOGGER.debug("raw AAC start: {}", toHex(rawAacFrame, 7));

					int totalFrameSize = rawAacFrame.length + 7; // payload + header
					byte[] adtsPacket = new byte[totalFrameSize];

					addADTStoPacket(adtsPacket, rawAacFrame.length, 2, mOutputSampling, mConfChans);
					// 2. Copy the actual raw AAC payload into the packet immediately following the header
					System.arraycopy(rawAacFrame, 0, adtsPacket, 7, rawAacFrame.length);

					//LOGGER.debug("fixed AAC start: {}", toHex(adtsPacket, 7));

					// Wrap Java byte array into a GStreamer Buffer
					Buffer gstBuffer = new Buffer(adtsPacket.length);
					ByteBuffer nativeBuffer = gstBuffer.map(true);
					nativeBuffer.put(adtsPacket);
					gstBuffer.unmap();

					// Push the buffer downstream
					FlowReturn ret = appSrc.pushBuffer(gstBuffer);
					if (ret != FlowReturn.OK) {
						throw new IllegalStateException("Buffer push failed: " + ret);
					}
					if (mDecode && pipeline.getState(1000) == State.READY) {
						pipeline.play();
					}
				} catch (Exception e) {
					LOGGER.error(e);
				}
			}
			LOGGER.info("exiting decoder thread");
		}
	};

	private int mOutputChannels = 0;
	private int mOutputSampling = 0;

	interface DabDecoderCallback {
		void decodedAudioData(final byte[] pcmData, final int samplerate, final int channels);
		void outputFormatChanged(int sampleRate, int chanCnt);
	}

	private final ArrayList<DabAudioDecoderStateCallBack> mCodecStateCallbacks = new ArrayList<>();
	void registerDabAudioDecoderStateCallBack(DabAudioDecoderStateCallBack stateCb) {
		synchronized (mCodecStateCallbacks){
			if (!mCodecStateCallbacks.contains(stateCb)) {
				mCodecStateCallbacks.add(stateCb);
			}
		}
	}

	void unregisterDabAudioDecoderStateCallBack(DabAudioDecoderStateCallBack stateCb) {
		synchronized (mCodecStateCallbacks){
			mCodecStateCallbacks.remove(stateCb);
		}
	}

	interface DabAudioDecoderStateCallBack {

		void codecStopped(DabAudioDecoder decoder);
	}
}
