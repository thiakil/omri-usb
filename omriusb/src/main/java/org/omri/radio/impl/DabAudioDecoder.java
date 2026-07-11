package org.omri.radio.impl;

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

class DabAudioDecoder {

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
		if (mConfCodec == DAB_CODEC_AAC) {
			mDataQ.offer(audioData);
		}//todo non-aac
	}

	void stopCodec() {
		stopDecodeThread();

		closeGst();

		for (DabAudioDecoderStateCallBack cb : mCodecStateCallbacks) {
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
	}

	boolean configure(int dabCodec, int samplingRate, int channelCnt, boolean sbr, boolean ps) {
        LOGGER.debug("Configuring Codec: {} with: {} kHz, {} Channels and SBR: {}", dabCodec, samplingRate, channelCnt, sbr);
		if (dabCodec == DAB_CODEC_MP2) {
			mOutputChannels = channelCnt;
			mOutputSampling = samplingRate;
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

			if (mConfChans == 1/* && !mConfPs*/) {
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
				decoder = ElementFactory.make("fdkaacdec", "decoder");
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

			String capstr = "audio/mpeg, mpegversion=4, stream-format=raw, plc=true, codec_data=(buffer)" + toHex(ascBytes);
			LOGGER.info("using {}", capstr);
			Caps caps = Caps.fromString(capstr);
			appSrc.setCaps(caps);
			appSrc.setStreamType(AppSrc.StreamType.STREAM);

			// 3. Assemble Pipeline
			pipeline.addMany(appSrc, aacParse, decoder, audioConvert, audioResample, audioSink);
			if (!Element.linkMany(appSrc, aacParse, decoder, audioConvert, audioResample, audioSink)) {
				throw new IllegalStateException("link failed");
			}

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

	private static String toHex(byte[] bytes) {
		StringBuilder builder = new StringBuilder(bytes.length*2);
		for (byte aByte : bytes) {
			builder.append(String.format("%02X", aByte));
		}
		return builder.toString();
	}

	Runnable DecoderRunnable = new Runnable() {

		@Override
		public void run() {
			LOGGER.debug("Starting DecodeThread");
			mDecode = true;
			while (mDecode) {
				//todo better waiting?
				while (mDataQ.isEmpty()) {
					try {
						Thread.sleep(5);
					} catch (InterruptedException e) {
						LOGGER.error("Interrupted", e);
						return;
					}
				}
				try {
					byte[] rawAacFrame = mDataQ.poll();
					if (rawAacFrame == null || rawAacFrame.length == 0)
						break;

					// Wrap Java byte array into a GStreamer Buffer
					Buffer gstBuffer = new Buffer(rawAacFrame.length);
					ByteBuffer nativeBuffer = gstBuffer.map(true);
					nativeBuffer.put(rawAacFrame);
					gstBuffer.unmap();

					// Push the buffer downstream
					FlowReturn ret = appSrc.pushBuffer(gstBuffer);
					if (ret != FlowReturn.OK) {
						throw new IllegalStateException("Buffer push failed: " + ret);
					}
					if (pipeline.getState() != State.PLAYING) {
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
		if (!mCodecStateCallbacks.contains(stateCb)) {
			mCodecStateCallbacks.add(stateCb);
		}
	}

	void unregisterDabAudioDecoderStateCallBack(DabAudioDecoderStateCallBack stateCb) {
		mCodecStateCallbacks.remove(stateCb);
	}

	interface DabAudioDecoderStateCallBack {

		void codecStopped(DabAudioDecoder decoder);
	}
}
