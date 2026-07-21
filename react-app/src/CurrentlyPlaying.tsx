import React from 'react';
import {ServiceInfo} from './websocketTypes'
import {Icon} from "actify";

interface CurPlayProps {
  service?: ServiceInfo
  currentText?: string;
  onStop: ()=>void
}
function CurrentlyPlaying({service, currentText = "", onStop}: CurPlayProps){
  const hasService = !!service;
  let nowPlaying = (<></>);
  if (service) {
    nowPlaying = (<>
          <h3>{currentText}</h3>
          <button onClick={onStop}><span className="material-symbols-outlined">stop</span></button>
        </>
    )
  }
  return (<div className="w-10/12 flex gap-4">
      <div className={"size-60 rounded-xl relative "+ (hasService ? ' bg-primary-container' : ' bg-surface-container-low text-surface-container-highest')}>
        <div className="absolute inset-0 flex items-center justify-center"><Icon style={{'--md-icon-size': "6rem"}}>cell_tower</Icon></div>
      </div>
      <div>
        <h1 className={"text-4xl " + (hasService ? '' : 'text-gray-300')}>{service?.serviceLabel || "Inactive"}</h1>
        {nowPlaying}
      </div>
    </div>);
};

export default CurrentlyPlaying;