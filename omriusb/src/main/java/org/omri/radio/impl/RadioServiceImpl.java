package org.omri.radio.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.omri.radio.Radio;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceAudiodataListener;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceFollowingListener;
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

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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

@SuppressWarnings({"ClassWithTooManyMethods", "OverlyComplexClass", "OverlyCoupledClass"})
public abstract class RadioServiceImpl implements RadioService, Serializable {

	private static final long serialVersionUID = 952156510217072036L;

	private static final Logger LOGGER = LogManager.getLogger("RadioServiceImpl");

	private String mShortDescription = "";
	private String mLongDescription = "";
	@SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
	private List<Visual> mLogoVisuals = new ArrayList<>();
	private List<String> mGenreList = new ArrayList<>();
	private List<String> mLinksList = new ArrayList<>();
	private List<Location> mLocationList = new ArrayList<>();
	private List<String> mKeywordsList = new ArrayList<>();
	private List<Group> mGroupsList = new ArrayList<>();
	private final List<RadioService> mSfServices = Collections.synchronizedList(new ArrayList<>());

	final transient List<VisualMetadataListener> mSlideshowListeners = Collections.synchronizedList(new ArrayList<>());
	final transient List<TextualMetadataListener> mLabelListeners = Collections.synchronizedList(new ArrayList<>());
	final transient List<ProgrammeServiceMetadataListener> mSpiListeners = Collections.synchronizedList(new ArrayList<>());
	final transient List<RadioServiceAudiodataListener> mAudiodataListeners = Collections.synchronizedList(new ArrayList<>());
	final transient List<RadioServiceRawAudiodataListener> mRawAudiodataListeners = Collections.synchronizedList(new ArrayList<>());
	final transient List<RadioServiceFollowingListener> mSfListeners = Collections.synchronizedList(new ArrayList<>());

	boolean mDecodeAudio = false;

	private int mAscty = -1;
	private boolean mSbrUsed = false;
	private boolean mPsUsed = false;

	private String mHradioSearchSource = "";

	void setHradioSearchSource(String source) {
		if(source != null) {
			mHradioSearchSource = source;
		}
	}

	@SuppressWarnings("unused")
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

	@SuppressWarnings("unchecked")
	private void readObject(java.io.ObjectInputStream stream) throws IOException, ClassNotFoundException, NoSuchFieldException, IllegalAccessException {
		mShortDescription = (String)stream.readObject();
		mLongDescription  = (String)stream.readObject();
		mLogoVisuals = new ArrayList<>();

		mGenreList = (ArrayList<String>) stream.readObject();
		mLinksList = (ArrayList<String>) stream.readObject();
		mLocationList = (ArrayList<Location>) stream.readObject();
		mKeywordsList = (ArrayList<String>) stream.readObject();
		mGroupsList = (ArrayList<Group>) stream.readObject();

		mSlideshowListeners.clear();
		mLabelListeners.clear();
		mSpiListeners.clear();
		mAudiodataListeners.clear();
		mRawAudiodataListeners.clear();

		mDecodeAudio = false;

		mAscty = -1;
		mSbrUsed = false;
		mPsUsed = false;
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
	public boolean isReadyForGetLogos() {
		return true;
	}

	@Override
	public List<Visual> getLogos() {
		return mLogoVisuals;
	}

	@SuppressWarnings("unused")
	public void addLogo(Visual logoVisual) {
		this.mLogoVisuals.add(logoVisual);
	}

	void addLogo(List<Visual> logoVisual) {
		this.mLogoVisuals.addAll(logoVisual);
	}

	@Override
	public List<String> getGenres() {
		return mGenreList;
	}

	void addGenre(String genre) {
		this.mGenreList.add(genre);
	}

	void addGenre(List<String> genres) {
		this.mGenreList.addAll(genres);
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

	@SuppressWarnings("unused")
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

	@SuppressWarnings("unused")
	public void addMembership(Group group) {
		this.mGroupsList.add(group);
	}

	@SuppressWarnings("unused")
	public void addMembership(List<Group> group) {
		this.mGroupsList.addAll(group);
	}

	@Override
	public void subscribe(RadioServiceListener radioServiceListener) {
		if(radioServiceListener != null) {
			if(radioServiceListener instanceof TextualMetadataListener) {
				synchronized (mLabelListeners) {
					if (!mLabelListeners.contains(radioServiceListener)) {
						LOGGER.debug("Subscribing TextualMetadataListener: " + radioServiceListener);
						this.mLabelListeners.add((TextualMetadataListener) radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof VisualMetadataListener) {
				synchronized (mSlideshowListeners) {
					if (!mSlideshowListeners.contains(radioServiceListener)) {
						LOGGER.debug("Subscribing VisualMetadataListener: " + radioServiceListener);
						this.mSlideshowListeners.add((VisualMetadataListener) radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof RadioServiceAudiodataListener) {
				synchronized (mAudiodataListeners) {
					if (!mAudiodataListeners.contains(radioServiceListener)) {
						LOGGER.debug("Subscribing RadioServiceAudiodataListener: " + radioServiceListener);
						mDecodeAudio = true;
						this.mAudiodataListeners.add((RadioServiceAudiodataListener) radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof RadioServiceRawAudiodataListener) {
				synchronized (mRawAudiodataListeners) {
					if (!mRawAudiodataListeners.contains(radioServiceListener)) {
						LOGGER.debug("Subscribing RadioServiceRawAudiodataListener: " + radioServiceListener);
						this.mRawAudiodataListeners.add((RadioServiceRawAudiodataListener) radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof ProgrammeServiceMetadataListener) {
				synchronized (mSpiListeners) {
					if (!mSpiListeners.contains(radioServiceListener)) {
						LOGGER.debug("Subscribing ProgrammeServiceMetadataListener: " + radioServiceListener);
						this.mSpiListeners.add((ProgrammeServiceMetadataListener) radioServiceListener);
					}
				}
			}
			if (radioServiceListener instanceof RadioServiceFollowingListener) {
				synchronized (mSfListeners) {
					if (!mSfListeners.contains(radioServiceListener)) {
						LOGGER.debug("Subscribing RadioServiceFollowingListener: " + radioServiceListener);
						this.mSfListeners.add((RadioServiceFollowingListener) radioServiceListener);
					}
				}
			}
		} else {
			LOGGER.debug("Subscribing RadioServiceListener is null");
		}
	}

	@Override
	public void unsubscribe(RadioServiceListener radioServiceListener) {
		if(radioServiceListener != null) {
			if(radioServiceListener instanceof TextualMetadataListener) {
				synchronized (this.mLabelListeners) {
					if (this.mLabelListeners.contains(radioServiceListener)) {
						LOGGER.debug("UnSubscribing TextualMetadataListener: " + radioServiceListener);
						this.mLabelListeners.remove(radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof VisualMetadataListener) {
				synchronized (this.mSlideshowListeners) {
					if (this.mSlideshowListeners.contains(radioServiceListener)) {
						LOGGER.debug("UnSubscribing VisualMetadataListener: " + radioServiceListener);
						this.mSlideshowListeners.remove(radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof RadioServiceAudiodataListener) {
				synchronized (this.mAudiodataListeners) {
					if (this.mAudiodataListeners.contains(radioServiceListener)) {
						LOGGER.debug("UnSubscribing RadioServiceAudiodataListener: " + radioServiceListener);
						this.mAudiodataListeners.remove(radioServiceListener);
					}
					if (mAudiodataListeners.isEmpty()) {
						mDecodeAudio = false;
					}
				}
			}
			if(radioServiceListener instanceof RadioServiceRawAudiodataListener) {
				synchronized (this.mRawAudiodataListeners) {
					if (this.mRawAudiodataListeners.contains(radioServiceListener)) {
						LOGGER.debug("UnSubscribing RadioServiceRawAudiodataListener: " + radioServiceListener);
						this.mRawAudiodataListeners.remove(radioServiceListener);
					}
				}
			}
			if(radioServiceListener instanceof ProgrammeServiceMetadataListener) {
				synchronized (this.mSpiListeners) {
					if (this.mSpiListeners.contains(radioServiceListener)) {
						LOGGER.debug("UnSubscribing ProgrammeServiceMetadataListener: " + radioServiceListener);
						this.mSpiListeners.remove(radioServiceListener);
					}
				}
			}
			if (radioServiceListener instanceof RadioServiceFollowingListener) {
				synchronized (this.mSfListeners) {
					if (this.mSfListeners.contains(radioServiceListener)) {
						LOGGER.debug("UnSubscribing RadioServiceFollowingListener: " + radioServiceListener);
						this.mSfListeners.remove(radioServiceListener);
					}
				}
			}
		} else {
			LOGGER.debug("UnSubscribing RadioServiceListener is null");
		}
	}

	@Override
	public ArrayList<RadioService> getFollowingServices() {
		ArrayList<RadioService> ret = new ArrayList<>(mSfServices.size());
		synchronized (mSfServices) {
			ret.addAll(mSfServices);
		}
		return ret;
	}

	//callbacks from the tuner
	@SuppressWarnings("unused")
	void slideshowReceived(VisualDabSlideShow slideShow) {
		synchronized (mSlideshowListeners) {
			for (VisualMetadataListener slsListener : mSlideshowListeners) {
				slsListener.newVisualMetadata(slideShow);
			}
		}
	}

	void labelReceived(Textual label) {
		synchronized (mLabelListeners) {
			for (TextualMetadataListener dlsListener : mLabelListeners) {
				dlsListener.newTextualMetadata(label);
			}
		}
	}

	@SuppressWarnings("unused")
	void audioData(final byte[] pcmData, final int channelCount, final int samplingRate) {
		if (/*mDecodeAudio && */mAudioDec != null) {
			mAudioDec.feedData(pcmData);
		}

		synchronized (mRawAudiodataListeners) {
			for (RadioServiceRawAudiodataListener rawListener : mRawAudiodataListeners) {
				rawListener.rawAudioData(pcmData, mSbrUsed, mPsUsed, mMimeType, channelCount, samplingRate);
			}
		}
	}

	@NotNull ArrayList<RadioService> replaceLinkedRadioServicesWithKnown(@NotNull ArrayList<RadioService> linkedServices) {
		ArrayList<RadioService> retLinkedServices = new ArrayList<>();
		// retrieve list of known services
		final List<RadioService> radioServices = RadioServiceManager.getInstance().getRadioServices(this.getRadioServiceType());
		for (final RadioService linkedService : linkedServices) {
			boolean foundRadioServiceInCurrentList = false;
			for (final RadioService radioService : radioServices) {
				if (radioService instanceof RadioServiceDab && linkedService instanceof RadioServiceDab) {
					// if linked service is equal in ECC, EId, SId compared to a known service,
					// then take the known service, otherwise the new linked DAB service
					final RadioServiceDab radioServiceDab = (RadioServiceDab) radioService;
					final RadioServiceDab linkedServiceDab = (RadioServiceDab) linkedService;
					// strict check of ECC, SId, EId, Frequency
					if (radioServiceDab.equals(linkedServiceDab)) {
						// add the already known RadioServiceDab at the front
						retLinkedServices.add(0, radioServiceDab);
						foundRadioServiceInCurrentList = true;
						break;
					}
				}
			}
			if (!foundRadioServiceInCurrentList) {
				// not found in current service list, add the new service
				retLinkedServices.add(linkedService);
			}
		}
		return retLinkedServices;
	}

	void setFollowingServices(@NotNull ArrayList<RadioService> sfServices) {
		LOGGER.debug("setFollowingServices sz=" + sfServices.size() + " for " +
				this.toString());
		synchronized (mSfServices) {
			mSfServices.clear();
			mSfServices.addAll(sfServices);
		}
		synchronized (mSfListeners) {
			for (RadioServiceFollowingListener sfListener : mSfListeners) {
				sfListener.newServiceFollowingRadioServices(sfServices);
			}
		}
	}

	// called from JNI
	@SuppressWarnings("unused")
	void serviceFollowingReceived(ArrayList<RadioService> sfServices) {
		if (sfServices != null) {
			LOGGER.debug("serviceFollowingReceived sz=" + sfServices.size() + " for " +
					this.toString());
			// execute following on a thread because this may be a lengthy job
			final RadioService radioService = this;
			new Thread(() ->
					RadioServiceManager.getInstance().updateAllServiceFollowingServices(radioService),
					"sfUpdAll")
					.start();
		}
	}

	// returns true if the given sfServices are different to what was available before
	boolean setServiceFollowingServices(ArrayList<RadioService> sfServices) {
		boolean hasChanged = false;
		if (sfServices != null && sfServices.size() > 0) {
			// enhance ServiceFollowing services with already known information
			ArrayList<RadioService> sfRadioServices = new ArrayList<>(sfServices.size());
			sfRadioServices.addAll(replaceLinkedRadioServicesWithKnown(sfServices));

			ArrayList<RadioService> prevList = getFollowingServices();
			if (!prevList.equals(sfRadioServices) && sfRadioServices.size() > 0) {
				// only real changes, no repetition of the same information
				hasChanged = true;
				setFollowingServices(sfRadioServices);
			}
		}
		return hasChanged;
	}

	private transient @Nullable DabAudioDecoder mAudioDec = null;
	private RadioServiceMimeType mMimeType = RadioServiceMimeType.UNKNOWN;

	@SuppressWarnings("unused")//native callback
	void audioFormatChanged(final int ascty, final int channelCount, final int samplingRate, final boolean sbrUsed, final boolean psUsed) {
        LOGGER.debug("audioFormatChanged: ASCTY:{}, SBR: {}, PS: {}", ascty, sbrUsed, psUsed);
		mMimeType = RadioServiceMimeType.UNKNOWN;
		mAscty = ascty;
		mSbrUsed = sbrUsed;
		mPsUsed = psUsed;

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

        if (mAudioDec == null) {
			LOGGER.error("Decoder is null, force stopping service '{}'", getServiceLabel());
            Radio.getInstance().stopRadioService(this);
        }
    }

	void serviceStarted() {
		LOGGER.debug("Service '" + getServiceLabel() + "' started");
	}

	void serviceStopped() {
        LOGGER.debug("Service '{}' stopped", getServiceLabel());

		if (mAudioDec != null) {
			LOGGER.debug("Stopping DabAudioDecoder...");
			mAudioDec.stopCodec();
		}

		mAudioDec = null;
	}

}
