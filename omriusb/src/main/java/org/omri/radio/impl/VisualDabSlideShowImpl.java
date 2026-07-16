package org.omri.radio.impl;

import io.github.landerlyoung.jenny.NativeMethodProxy;
import io.github.landerlyoung.jenny.NativeProxy;
import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Calendar;

import org.omri.radioservice.metadata.VisualDabSlideShow;
import org.omri.radioservice.metadata.VisualType;

/**
 * Copyright (C) 2018 IRT GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author Fabian Sattler, IRT GmbH
 */

//used from C
@NativeProxy
public class VisualDabSlideShowImpl extends VisualImpl implements VisualDabSlideShow, Serializable {

	private int mCatId = -1;
	private String mContentName = "";
	private int mContentType = -1;
	private int mContentSubType = -1;
	private URI mAltLocUri = null;
	private Calendar mExpiryCal = null;
	private int mSlsId = -1;
	private Calendar mTriggerCal = null;
	private String mCatText = "";
	private URI mCatLink;
	private URI mCatClickLink;

	@NativeMethodProxy
	public VisualDabSlideShowImpl() {
	}

	@Override
	public VisualType getVisualType() {
		return VisualType.METADATA_VISUAL_TYPE_DAB_SLS;
	}

	@Override
	public boolean isCategorized() {
		return mCatId >= 0 ? true : false;
	}

	@Override
	public String getContentName() {
		return mContentName;
	}

	@NativeMethodProxy
	void setContentName(String contName) {
		this.mContentName = contName;
	}

	@Override
	public int getContentType() {
		return mContentType;
	}

	@NativeMethodProxy
	void setContentType(int contentType) {
		mContentType = contentType;
	}

	@Override
	public int getContentSubType() {
		return mContentSubType;
	}

	@NativeMethodProxy
	void setContentSubType(int contentSubType) {
		mContentSubType = contentSubType;
	}

	@Override
	public URI getAlternativeLocationURL() {
		return mAltLocUri;
	}

	@NativeMethodProxy
	void setAlternativeLocationURL(String altUrl) {
		try {
			mAltLocUri = URI.create(altUrl);
		} catch(IllegalArgumentException illArg) {
			illArg.printStackTrace();
		}
	}

	@Override
	public Calendar getExpiryTime() {
		return mExpiryCal;
	}

	@NativeMethodProxy
	void setExpiryTime(Calendar cal) {
		mExpiryCal = cal;
	}

	@Override
	public int getSlideId() {
		return mSlsId;
	}

	@NativeMethodProxy
	void setSlideId(int slideId) {
		this.mSlsId = slideId;
	}

	@Override
	public Calendar getTriggerTime() {
		return mTriggerCal;
	}

	@NativeMethodProxy
	void setTriggerTime(String triggerTime) {
		if(triggerTime == "NOW") {
			mTriggerCal = null;
		} else {
			//TODO parse triggertime to calendar
		}
	}

	@Override
	public String getCategoryText() {
		return mCatText;
	}

	@NativeMethodProxy
	void setCategoryText(String catText) {
		this.mCatText = catText;
	}

	@Override
	public int getCategoryId() {
		return mCatId;
	}

	@NativeMethodProxy
	void setCategoryId(int catId) {
		this.mCatId = catId;
	}

	@Override
	public URI getLink() {
		return mCatLink;
	}
	
	void setCategoryLink(String link) {
		try {
			this.mCatLink = new URI(link);
		} catch (URISyntaxException e) {
			this.mCatLink = null;
		}
	}

	@Override
	public URI getClickThroughUrl() {
		return mCatClickLink;
	}

	@NativeMethodProxy
	void setCategoryClickThroughLink(String link) {
		try {
			this.mCatClickLink = new URI(link);
		} catch (URISyntaxException e) {
			this.mCatClickLink = null;
		}
	}

	@NativeMethodProxy
	@Override
	public void setVisualMimeType(int mimeTypeId) {
		super.setVisualMimeType(mimeTypeId);
	}

	@NativeMethodProxy
	@Override
	void setVisualData(byte[] visData) {
		super.setVisualData(visData);
	}
}
