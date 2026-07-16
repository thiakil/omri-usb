package org.omri.radio.impl;

import io.github.landerlyoung.jenny.NativeMethodProxy;
import io.github.landerlyoung.jenny.NativeProxy;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.omri.radioservice.RadioService;
import org.omri.radioservice.RadioServiceDab;
import org.omri.radioservice.RadioServiceDabComponent;
import org.omri.radioservice.RadioServiceDabNative;
import org.omri.radioservice.RadioServiceType;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
public class RadioServiceDabImpl extends RadioServiceImpl implements RadioServiceDab, RadioServiceDabNative, Serializable {

	private static final long serialVersionUID = 4382868398713243924L;

	private static final Logger LOGGER = LogManager.getLogger("DabService");
	
	private int mEnsembleEcc = 0;
	private int mEnsembleId= 0;
	private String mEnsembleLabel = "";
	private String mEnsembleShortLabel = "";
	private int mEnsembleFrequency = 0;
	private boolean mIsCaApplied = false;
	private int mCaId = -1;
	private String mServiceLabel = "";
	private String mShortServiceLabel = "";
	private int mServiceId = 0;
	private boolean mIsProgrammeService = false;
	final private List<RadioServiceDabComponent> mServiceComponents = new ArrayList<RadioServiceDabComponent>();

	@NativeMethodProxy
	RadioServiceDabImpl() {	}

	@Override
	public RadioServiceType getRadioServiceType() {
		return RadioServiceType.RADIOSERVICE_TYPE_DAB;
	}

	@Override
	public int getEnsembleEcc() {
		return mEnsembleEcc;
	}
	
	public void setEnsembleEcc(int ensembleEcc) {
		mEnsembleEcc = ensembleEcc;
	}

	@Override
	public int getEnsembleId() {
		return mEnsembleId;
	}

	public void setEnsembleId(int ensembleId) {
		mEnsembleId = ensembleId;
	}

	@Override
	public String getEnsembleLabel() {
		return mEnsembleLabel;
	}

	public void setEnsembleLabel(String ensembleLabel) {
		this.mEnsembleLabel = ensembleLabel.trim();
	}

	@Override
	public String getEnsembleShortLabel() {
		return mEnsembleShortLabel;
	}

	public void setEnsembleShortLabel(String ensembleShortLabel) {
		this.mEnsembleShortLabel = ensembleShortLabel.trim();
	}

	@Override
	public int getEnsembleFrequency() {
		return mEnsembleFrequency;
	}

	public void setEnsembleFrequency(int ensembleFreq) {
		this.mEnsembleFrequency = ensembleFreq;
	}

	@Override
	public boolean isCaProtected() {
		return mIsCaApplied;
	}

	public void setIsCaProtected(boolean ca) {
		mIsCaApplied = ca;
	}

	@Override
	public int getCaId() {
		return mCaId;
	}

	public void setCaId(int caId) {
		mCaId = caId;
	}

	@Override
	public String getServiceLabel() {
		return mServiceLabel;
	}

	public void setServiceLabel(String srvLabel) {
		this.mServiceLabel = srvLabel.trim();
	}

	@Override
	public String getShortLabel() {
		return mShortServiceLabel;
	}

	public void setShortLabel(String shortLabel) {
		mShortServiceLabel = shortLabel.trim();
	}

	@Override
	public int getServiceId() {
		return mServiceId;
	}

	public void setServiceId(int srvId) {
		this.mServiceId = srvId;
	}

	@Override
	public boolean isProgrammeService() {
		return mIsProgrammeService;
	}

	public void setIsProgrammeService(boolean isProg) {
		mIsProgrammeService = isProg;
	}

	@Override
	public List<RadioServiceDabComponent> getServiceComponents() {
		return mServiceComponents;
	}

	public void addServiceComponent(RadioServiceDabComponent dabComp) {
		this.mServiceComponents.add(dabComp);
	}

	public void addServiceComponent(List<RadioServiceDabComponent> dabComp) {
		this.mServiceComponents.addAll(dabComp);
	}

	@Override
	public boolean equals(Object obj) {
		if(obj != null) {
			if(obj instanceof RadioServiceDab) {
				//A DAB service is uniquely identified by its Service Identifier (SId) and in conjunction with the Extended Country Code unique world-wide
				//but EId and EnsembleFrequency are needed, too
				RadioServiceDab compSrv = (RadioServiceDab) obj;
				return ((compSrv.getEnsembleId() == mEnsembleId) && (compSrv.getEnsembleFrequency() == mEnsembleFrequency) && (compSrv.getServiceId() == mServiceId) && (compSrv.getEnsembleEcc() == mEnsembleEcc));
			}
		}

		return false;
	}

	@Override
	public int hashCode() {
		return Objects.hash(mEnsembleId, mEnsembleFrequency, mServiceId, mEnsembleEcc);
	}

	@Override
	public boolean equalsRadioService(RadioService otherSrv) {
		if(otherSrv != null) {
			if(otherSrv instanceof RadioServiceDab) {
				return equals((RadioServiceDab) otherSrv);
			}
		}
		return false;
	}

	@NotNull
	@Override
	public String toString() {
		return "RadioServiceDab {" +
				" label='" + mServiceLabel + "'" +
				" SId=0x" + Integer.toHexString(mServiceId) +
				" EId=0x" + Integer.toHexString(mEnsembleId) +
				" ECC=0x" + Integer.toHexString(mEnsembleEcc) +
				" freqKHz=" + mEnsembleFrequency / 1000 +
				" }";
	}
}
