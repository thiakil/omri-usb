import React from 'react';
import {ServiceInfo} from './websocketTypes'

interface CurPlayProps {
  service: ServiceInfo|null;
  currentText: string|null;
  onStop: ()=>void
}
function CurrentlyPlaying(props: CurPlayProps){
  if (props.service) {
    return (<div>
      <h1>{props.service.serviceLabel}</h1>
      <h3>{props.currentText}</h3>
      <button onClick={props.onStop}><span className="material-symbols-outlined">stop</span></button>
    </div>);
  } else {
    return (<div>no service</div>);
  }
};

export default CurrentlyPlaying;