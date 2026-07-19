package org.omri.radioservice;

import org.jspecify.annotations.NullMarked;
import org.omri.radioservice.metadata.Visual;

import java.util.ArrayList;
import java.util.List;

/**
 * Copyright (C) 2016 Open Mobile Radio Interface (OMRI) Group
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
 * Abstract base class for a radio service
 * @author Fabian Sattler, IRT GmbH
 * @author Erk, IRT GmbH
 */
@NullMarked
public interface RadioService {

	/**
	 * Indicates the type of this RadioService
	 * @return the {@link RadioServiceType} of this RadioService
	 */
	public RadioServiceType getRadioServiceType();

	/**
	 * Returns the label of this {@link RadioService}
	 * @return the label of this {@link RadioService}
	 */
	public String getServiceLabel();

	/**
	 * Returns the available {@link Visual}s for this {@link RadioService} or an empty list
	 * @return the available {@link Visual}s for this {@link RadioService} or an empty list
	 */
	public List<Visual> getLogos();

	/**
	 * Returns if the {@link RadioService} is ready for querying logos.
	 * This does not tell if there are any logos!
	 * @return true if RadioService is ready for being queried using getLogos(), else false
	 */
	public boolean isReadyForGetLogos();

	/**
	 * Returns the available genres for this {@link RadioService} or an empty list
	 * @return the available genres for this {@link RadioService} or an empty list
	 */
	public List<String> getGenres();

	/**
	 * Subscribe a {@link RadioServiceListener} to receive updates from this {@link RadioService}
	 * @param radioServiceListener the {@link RadioServiceListener} to subscribe
	 */
	public void subscribe(RadioServiceListener radioServiceListener);

	/**
	 * Unsubscribe a {@link RadioServiceListener} from this {@link RadioService}
	 * @param radioServiceListener the {@link RadioServiceListener} to unsubscribe
	 */
	public void unsubscribe(RadioServiceListener radioServiceListener);

	/**
	 * Tests if this {@link RadioService} is the same as otherSrv. This means that this service carries the same content on the same or an other bearer.
	 * @param otherSrv the other {@link RadioService} to check
	 * @return {@code true} if otherSrv is the same {@link RadioService} as this {@link RadioService}.
	 */
	public boolean equalsRadioService(RadioService otherSrv);

	/**
	 * Returns a list of Following services associated with this {@link RadioService}
	 * @return a list of Following services associated with this {@link RadioService}
	 */
	public ArrayList<RadioService> getFollowingServices();

}
