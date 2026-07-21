import React from 'react';
import {ServiceInfo} from './websocketTypes'

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
        </>
    )
  }
  return (<div className="w-11/12 flex gap-4">
      <div className={"size-46vh shrink-0 grow-0 rounded-xl relative "+ (hasService ? ' bg-primary-container text-on-primary-container' : ' bg-surface-container-low text-surface-container-highest')}>
        <div className="absolute inset-0 flex items-center justify-center"><mdui-icon name="cell_tower"></mdui-icon></div>
      </div>
      <div className="grow">
        <h1 className={"font-bold" + (hasService ? '' : ' text-gray-300')}>{service?.serviceLabel || "Inactive"}</h1>
        {nowPlaying}
      </div>
    </div>);
};

export default CurrentlyPlaying;