package org.omri.radio.impl;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.omri.radio.Radio;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceAudiodataListener;
import org.omri.radioservice.RadioServiceListener;
import org.omri.radioservice.RadioServiceMimeType;
import org.omri.radioservice.RadioServiceRawAudiodataListener;
import org.omri.radioservice.metadata.Group;
import org.omri.radioservice.metadata.Location;
import org.omri.radioservice.metadata.ProgrammeServiceMetadataListener;
import org.omri.radioservice.metadata.TermId;
import org.omri.radioservice.metadata.Textual;
import org.omri.radioservice.metadata.TextualMetadataListener;
import org.omri.radioservice.metadata.Visual;
import org.omri.radioservice.metadata.VisualDabSlideShow;
import org.omri.radioservice.metadata.VisualMetadataListener;

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

public abstract class RadioServiceImpl implements RadioService, Serializable {

	private static final long serialVersionUID = 1823267026268112744L;

	private static final Logger LOGGER = LogManager.getLogger("RadioServiceImpl");

	private String mShortDescription = "";
	private String mLongDescription = "";
	private List<Visual> mLogoVisuals = new ArrayList<Visual>();
	private List<TermId> mGenreList = new ArrayList<TermId>();
	private List<String> mLinksList = new ArrayList<String>();
	private List<Location> mLocationList = new ArrayList<Location>();
	private List<String> mKeywordsList = new ArrayList<String>();
	private List<Group> mGroupsList = new ArrayList<Group>();

	transient List<VisualMetadataListener> mSlideshowListeners = new ArrayList<>();
	transient List<TextualMetadataListener> mLabelListeners = new ArrayList<>();
	transient List<ProgrammeServiceMetadataListener> mSpiListeners = new ArrayList<>();
	transient List<RadioServiceAudiodataListener> mAudiodataListeners = Collections.synchronizedList(new ArrayList<RadioServiceAudiodataListener>());
	transient List<RadioServiceRawAudiodataListener> mRawAudiodataListeners = Collections.synchronizedList(new ArrayList<RadioServiceRawAudiodataListener>());

	boolean mDecodeAudio = false;

	private int mAscty = -1;
	private boolean mSbrUsed = false;
	private boolean mPsUsed = false;

	private int mChannelConfig = 0;
	private int mSamplingRate = 0;

	private int mConfigChans = 0;
	private int mConfigSampling = 0;

	private String mHradioSearchSource = "";

	void setHradioSearchSource(String source) {
		if (source != null) {
			mHradioSearchSource = source;
		}
	}

	public String getHradioSearchSource() {
		return mHradioSearchSource;
	}

	//Serialization
	private void writeObject(ObjectOutputStream stream) throws IOException {
		stream.writeObject(mShortDescription);
		stream.writeObject(mLongDescription);
		stream.writeObject(mGenreList);
		stream.writeObject(mLinksList);
		stream.writeObject(mLocationList);
		stream.writeObject(mKeywordsList);
		stream.writeObject(mGroupsList);
	}

	private void readObject(ObjectInputStream stream) throws IOException, ClassNotFoundException, NoSuchFieldException, IllegalAccessException {
		mShortDescription = (String) stream.readObject();
		mLongDescription = (String) stream.readObject();
		mLogoVisuals = new ArrayList<>();

		mGenreList = (ArrayList<TermId>) stream.readObject();
		mLinksList = (ArrayList<String>) stream.readObject();
		mLocationList = (ArrayList<Location>) stream.readObject();
		mKeywordsList = (ArrayList<String>) stream.readObject();
		mGroupsList = (ArrayList<Group>) stream.readObject();

		mSlideshowListeners = new ArrayList<>();
		mLabelListeners = new ArrayList<>();
		mSpiListeners = new ArrayList<>();
		mAudiodataListeners = Collections.synchronizedList(new ArrayList<RadioServiceAudiodataListener>());
		mRawAudiodataListeners = Collections.synchronizedList(new ArrayList<RadioServiceRawAudiodataListener>());

		mDecodeAudio = false;

		mAscty = -1;
		mSbrUsed = false;
		mPsUsed = false;

		mChannelConfig = 0;
		mSamplingRate = 0;

		mConfigChans = 0;
		mConfigSampling = 0;
	}

	@Override
	public String getShortDescription() {
		return mShortDescription;
	}

	void setShortDescription(String shortDesc) {
		this.mShortDescription = shortDesc;
	}

	@Override
	public String getLongDescription() {
		return mLongDescription;
	}

	void setLongDescription(String longDesc) {
		this.mLongDescription = longDesc;
	}

	@Override
	public List<Visual> getLogos() {
		return mLogoVisuals;
	}

	public void addLogo(Visual logoVisual) {
		this.mLogoVisuals.add(logoVisual);
	}

	void addLogo(List<Visual> logoVisual) {
		this.mLogoVisuals.addAll(logoVisual);
	}

	@Override
	public List<TermId> getGenres() {
		return mGenreList;
	}

	void addGenre(TermId genreId) {
		this.mGenreList.add(genreId);
	}

	void addGenre(List<TermId> genreId) {
		this.mGenreList.addAll(genreId);
	}

	@Override
	public List<String> getLinks() {
		return mLinksList;
	}

	void addLink(String linkString) {
		this.mLinksList.add(linkString);
	}

	void addLink(List<String> linkString) {
		this.mLinksList.addAll(linkString);
	}

	@Override
	public List<Location> getLocations() {
		return mLocationList;
	}

	public void addLocation(Location location) {
		this.mLocationList.add(location);
	}

	void addLocation(List<Location> location) {
		this.mLocationList.addAll(location);
	}

	@Override
	public List<String> getKeywords() {
		return mKeywordsList;
	}

	void addKeyword(String keyWord) {
		this.mKeywordsList.add(keyWord);
	}

	void addKeyword(List<String> keyWord) {
		this.mKeywordsList.addAll(keyWord);
	}

	@Override
	public List<Group> getMemberships() {
		return mGroupsList;
	}

	public void addMembership(Group group) {
		this.mGroupsList.add(group);
	}

	public void addMembership(List<Group> group) {
		this.mGroupsList.addAll(group);
	}

	@Override
	public void subscribe(RadioServiceListener radioServiceListener) {
		if (radioServiceListener != null) {
			if (radioServiceListener instanceof TextualMetadataListener) {
				if (!mLabelListeners.contains(radioServiceListener)) {
					LOGGER.debug("Subscribing TextualMetadataListener: " + radioServiceListener);
					this.mLabelListeners.add((TextualMetadataListener) radioServiceListener);
				}
			}
			if (radioServiceListener instanceof VisualMetadataListener) {
				if (!mSlideshowListeners.contains(radioServiceListener)) {
					LOGGER.debug("Subscribing VisualMetadataListener: " + radioServiceListener);
					this.mSlideshowListeners.add((VisualMetadataListener) radioServiceListener);
				}
			}
			if (radioServiceListener instanceof RadioServiceAudiodataListener) {
				if (!mAudiodataListeners.contains(radioServiceListener)) {
					LOGGER.debug("Subscribing RadioServiceAudiodataListener: " + radioServiceListener);
					mDecodeAudio = true;
					this.mAudiodataListeners.add((RadioServiceAudiodataListener) radioServiceListener);
				}
			}
			if (radioServiceListener instanceof RadioServiceRawAudiodataListener) {
				if (!mRawAudiodataListeners.contains(radioServiceListener)) {
					LOGGER.debug("Subscribing RadioServiceRawAudiodataListener: " + radioServiceListener);
					this.mRawAudiodataListeners.add((RadioServiceRawAudiodataListener) radioServiceListener);
				}
			}
			if (radioServiceListener instanceof ProgrammeServiceMetadataListener) {
				if (!mSpiListeners.contains(radioServiceListener)) {
					LOGGER.debug("Subscribing ProgrammeServiceMetadataListener: " + radioServiceListener);
					this.mSpiListeners.add((ProgrammeServiceMetadataListener) radioServiceListener);
				}
			}
		} else {
			LOGGER.debug("Subscribing RadioServiceListener is null");
		}
	}

	@Override
	public void unsubscribe(RadioServiceListener radioServiceListener) {
		if (radioServiceListener != null) {
			if (radioServiceListener instanceof TextualMetadataListener) {
				LOGGER.debug("UnSubscribing TextualMetadataListener: " + radioServiceListener);
				this.mLabelListeners.remove(radioServiceListener);
			}
			if (radioServiceListener instanceof VisualMetadataListener) {
				LOGGER.debug("UnSubscribing VisualMetadataListener: " + radioServiceListener);
				this.mSlideshowListeners.remove(radioServiceListener);
			}
			if (radioServiceListener instanceof RadioServiceAudiodataListener) {
				LOGGER.debug("UnSubscribing RadioServiceAudiodataListener: " + radioServiceListener);
				this.mAudiodataListeners.remove(radioServiceListener);

				if (mAudiodataListeners.isEmpty()) {
					mDecodeAudio = false;
				}
			}
			if (radioServiceListener instanceof RadioServiceRawAudiodataListener) {
				LOGGER.debug("UnSubscribing RadioServiceRawAudiodataListener: " + radioServiceListener);
				this.mRawAudiodataListeners.remove(radioServiceListener);
			}
			if (radioServiceListener instanceof ProgrammeServiceMetadataListener) {
				LOGGER.debug("UnSubscribing ProgrammeServiceMetadataListener: " + radioServiceListener);
				this.mSpiListeners.remove(radioServiceListener);
			}
		} else {
			LOGGER.debug("UnSubscribing RadioServiceListener is null");
		}
	}

	//callbacks from the tuner
	void slideshowReceived(VisualDabSlideShow slideShow) {
		for (VisualMetadataListener slsListener : mSlideshowListeners) {
			slsListener.newVisualMetadata(slideShow);
		}
	}

	void labeReceived(Textual label) {
		for (TextualMetadataListener dlsListener : mLabelListeners) {
			dlsListener.newTextualMetadata(label);
		}
	}

	void audioData(final byte[] pcmData, final int channelCount, final int samplingRate) {
		if (mDecodeAudio && mAudioDec != null) {
			mAudioDec.feedData(pcmData);
		}

		for (RadioServiceRawAudiodataListener rawListener : mRawAudiodataListeners) {
			rawListener.rawAudioData(pcmData, mSbrUsed, mPsUsed, mMimeType, channelCount, samplingRate);
		}
	}

	private transient DabAudioDecoder mAudioDec = null;
	private RadioServiceMimeType mMimeType = RadioServiceMimeType.UNKNOWN;

	void audioFormatChanged(final int ascty, final int channelCount, final int samplingRate, final boolean sbrUsed, final boolean psUsed) {
		LOGGER.debug("audioFormatChanged: ASCTY:" + ascty + ", SBR: " + sbrUsed + ", PS: " + psUsed);
		mMimeType = RadioServiceMimeType.UNKNOWN;
		mAscty = ascty;
		mSbrUsed = sbrUsed;
		mPsUsed = psUsed;
		mConfigChans = channelCount;
		mConfigSampling = samplingRate;

		if (mAscty == 0) {
			mMimeType = RadioServiceMimeType.AUDIO_MPEG;
		}
		if (mAscty == 63) {
			mMimeType = RadioServiceMimeType.AUDIO_AAC_DAB_AU;
		}

		if (mAudioDec == null) {
			mAudioDec = DabAudioDecoderFactory.getInstance().getDecoder(ascty, samplingRate, channelCount, sbrUsed, psUsed);
		} else {
			if (mAudioDec.getConfCodec() != ascty ||
				mAudioDec.getConfSampling() != samplingRate ||
				mAudioDec.getConfChans() != channelCount ||
				mAudioDec.getConfSbr() != sbrUsed ||
				mAudioDec.getConfPs() != psUsed) {
				LOGGER.debug("Reconfiguring codec");

				mAudioDec.stopCodec();

				mAudioDec = DabAudioDecoderFactory.getInstance().getDecoder(ascty, samplingRate, channelCount, sbrUsed, psUsed);
			}
		}

		if (mAudioDec != null) {
			mAudioDec.setCodecCallback(new DabAudioDecoder.DabDecoderCallback() {
				@Override
				public void decodedAudioData(byte[] pcmData, final int samplerate, final int channels) {
					for (final RadioServiceAudiodataListener audiolistener : mAudiodataListeners) {
						audiolistener.pcmAudioData(pcmData, channels, samplingRate);
					}
				}

				@Override
				public void outputFormatChanged(int sampleRate, int chanCnt) {
					LOGGER.debug("outputFormatChanged: " + sampleRate + " : " + chanCnt);
					mSamplingRate = sampleRate;
					mChannelConfig = chanCnt;
				}
			});
		} else {
			Radio.getInstance().stopRadioService(this);
		}
	}

	void serviceStopped() {
		LOGGER.debug("Service '" + getServiceLabel() + "' stopped");

		if (mAudioDec != null) {
			LOGGER.debug("Stopping DabAudioDecoder...");
			mAudioDec.stopCodec();
		}

		mAudioDec = null;
	}

	/* PCM data from a Shoutcast IP service */
	void decodedAudioData(final byte[] pcmAudioData, final int channelCount, final int samplingRate) {
		for (final RadioServiceAudiodataListener audiolistener : mAudiodataListeners) {
			audiolistener.pcmAudioData(pcmAudioData, channelCount, samplingRate);
		}
	}

}
