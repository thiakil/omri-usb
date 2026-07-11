package org.omri.radio.impl;

import java.util.Vector;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.util.Vector;

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
class DabAudioDecoderFactory implements DabAudioDecoder.DabAudioDecoderStateCallBack {

	private static final Logger LOGGER = LogManager.getLogger("DabAudioDecoderFactory");

	private static final DabAudioDecoderFactory mFactoryInstance = new DabAudioDecoderFactory();

	private Vector<DabAudioDecoder> mDecoderInstances = new Vector<>();

	private DabAudioDecoderFactory() {
		//nada
	}

	static DabAudioDecoderFactory getInstance() {
		return mFactoryInstance;
	}

	DabAudioDecoder getDecoder(int dabCodec, int samplingRate, int channelCnt, boolean sbr, boolean ps) {
		DabAudioDecoder retDec = new DabAudioDecoder();
		if (retDec.configure(dabCodec, samplingRate, channelCnt, sbr, ps)) {
			retDec.registerDabAudioDecoderStateCallBack(this);
			mDecoderInstances.add(retDec);
            LOGGER.debug("Current DabAudioDecoder instances: {}", mDecoderInstances.size());
			return retDec;
		}

		LOGGER.error("Codec creation failed");
		return null;
	}

	void stopAll() {
		LOGGER.debug("Stopping all running DabAudioDecoder instances...");
		for (DabAudioDecoder dec : mDecoderInstances) {
			dec.stopCodec();
		}
	}

	/**/
	@Override
	public void codecStopped(DabAudioDecoder decoder) {
		LOGGER.debug("Removing stopped DabAudioDecoder");
		decoder.unregisterDabAudioDecoderStateCallBack(this);
		mDecoderInstances.remove(decoder);
	}
}
