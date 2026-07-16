package org.omri.radio.impl;

import io.github.landerlyoung.jenny.NativeMethodProxy;
import io.github.landerlyoung.jenny.NativeProxy;
import java.io.Serializable;

import org.omri.radioservice.RadioServiceDabDataServiceComponentType;
import org.omri.radioservice.RadioServiceDabUserApplication;
import org.omri.radioservice.RadioServiceDabUserApplicationType;

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
public class RadioServiceDabUserApplicationImpl implements RadioServiceDabUserApplication, Serializable {

	private static final long serialVersionUID = -2789012667334731485L;
	
	private RadioServiceDabUserApplicationType mApptype = RadioServiceDabUserApplicationType.RFU;
	private boolean mIsCaProtected = false;
	private int mCaOrg = -1;
	private boolean mIsXpadApptype = false;
	private int mXpadApptype = -1;
	private boolean mDgUsed = false;
	private RadioServiceDabDataServiceComponentType mDSCTy = RadioServiceDabDataServiceComponentType.UNSPECIFIED_DATA;
	private byte[] mUappSpecificData = null;

	@NativeMethodProxy
	public RadioServiceDabUserApplicationImpl() {}

	@Override
	public RadioServiceDabUserApplicationType getType() {
		return mApptype;
	}

	@NativeMethodProxy
	void setUserApplicationType(int type) {
		mApptype = RadioServiceDabUserApplicationType.getUserApplicationTypeByType(type);
	}

	@Override
	public boolean isCaProtected() {
		return mIsCaProtected;
	}

	@NativeMethodProxy
	void setIsCaProtected(boolean caApplied) {
		mIsCaProtected = caApplied;
	}

	@Override
	public int getCaOrganization() {
		return mCaOrg;
	}

	@NativeMethodProxy
	void setCaOrganization(int caOrg) {
		mCaOrg = caOrg;
	}

	@Override
	public boolean isXpadApptype() {
		return mIsXpadApptype;
	}

	@NativeMethodProxy
	void setIsXpadApptype(boolean isXpad) {
		mIsXpadApptype = isXpad;
	}

	@Override
	public int getXpadAppType() {
		return mXpadApptype;
	}

	@NativeMethodProxy
	void setXpadApptype(int xpadType) {
		mXpadApptype = xpadType;
	}

	@Override
	public boolean isDatagroupTransportUsed() {
		return mDgUsed;
	}

	@NativeMethodProxy
	void setIsDatagroupsUsed(boolean dgUsed) {
		mDgUsed = dgUsed;
	}

	@Override
	public RadioServiceDabDataServiceComponentType getDataServiceComponentType() {
		return mDSCTy;
	}

	@NativeMethodProxy
	void setDSCTy(int dscty) {
		mDSCTy = RadioServiceDabDataServiceComponentType.getDSCTyByType(dscty);
	}

	@Override
	public byte[] getUserApplicationData() {
		return mUappSpecificData;
	}

	@NativeMethodProxy
	void setUappdata(byte[] uAppdata) {
		mUappSpecificData = uAppdata;
	}
}
