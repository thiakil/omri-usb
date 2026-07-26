package org.omri.radio.impl;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.jetbrains.annotations.Nullable;
import org.omri.radio.Radio;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;

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

	private static final Logger LOGGER = LogManager.getLogger("DabAudioDecoder");

	private final int BUFFER_TIMEOUT = 1000;

	//DAB ASCTy
	private final int DAB_CODEC_MP2 = 0;
	private final int DAB_CODEC_AAC = 63;

	private final String[] DAB_MIME = {"audio/unknown", "audio/mpeg-l2" /*"audio/mpeg"*/, "audio/mp4a-latm"};

	private SourceDataLine line = null;

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
		if ((mConfCodec == DAB_CODEC_AAC || mConfCodec == 99) && audioData != null && audioData.length > 0) {
			mDataQ.offer(audioData);
		}//todo non-aac
	}

	void stopCodec() {
		stopDecodeThread();

		if (line != null) {
			line.close();
			line = null;
		}

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

		stopDecodeThread();

		mDataQ.clear();

		mConfCodec = dabCodec;
		mConfSampling = samplingRate;
		mConfChans = channelCnt;
		mConfSbr = sbr;
		mConfPs = ps;

		if (mConfCodec == 99) {
            try {
                line = AudioSystem.getSourceDataLine(new AudioFormat(samplingRate, 16, channelCnt, true, false));
				line.open();
				line.start();
            } catch (LineUnavailableException e) {
                LOGGER.error("Line unavailable", e);
				return false;
            }
			mDecodeThread = new Thread(DecoderRunnable, "raw decoder thread");
			mDecodeThread.start();
        } else {
			return false;
		}

		return true;
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
						//LOGGER.error("Interrupted", e);
						break THREADLOOP;
					}
				}
				if (!mDecode) {
					break THREADLOOP;
				}
				byte[] audioData = mDataQ.poll();
				if (line != null) {
					line.write(audioData, 0, audioData.length);
				}
			}
			LOGGER.info("exiting decoder thread");
		}
	};

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
