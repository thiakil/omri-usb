/// <reference types="mdui/jsx.en" />
import React from 'react';
import {ReceptionQuality} from "./websocketTypes";

interface PageHeadingProps {
  backAction?: "close"|"arrow_back"
  headerText?: string
  onBack?: ()=>void
  signalQuality?: ReceptionQuality
}

const colorMap = {
  red: 'text-red-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
};

function PageHeading({backAction = "arrow_back", headerText, onBack, signalQuality}: PageHeadingProps) {
  let signalIcon: string|undefined = undefined
  let signalColour: "red"|"orange"|"yellow"|"green"|undefined = undefined
  if (typeof signalQuality === "string") {
    switch (signalQuality) {
      case ReceptionQuality.BAD:
        signalIcon = "signal_cellular_alt_1_bar"
        signalColour = "red"
        break;
      case ReceptionQuality.POOR:
        signalIcon = "signal_cellular_alt_1_bar"
        signalColour = "orange"
        break;
      case ReceptionQuality.OKAY:
        signalIcon = "signal_cellular_alt_2_bar"
        signalColour = "yellow"
        break
      case ReceptionQuality.GOOD:
        signalIcon = "signal_cellular_alt_2_bar"
        signalColour = "green"
        break
      case ReceptionQuality.BEST:
        signalIcon = "signal_cellular_alt"
        signalColour = "green"
        break;
    }
  }
  return (
      <header className="pageHeader grid grid-cols-3">
        <div>{onBack ? <mdui-button-icon icon={backAction} onClick={onBack} className="block"></mdui-button-icon> : undefined}</div>
        <div className="flex items-center justify-center">{headerText}</div>
        <div className="pr-3">
          <div className="col-span-4 flex items-center justify-end h-full gap-1">
            {signalIcon ?
              <mdui-icon name={signalIcon} className={`align-middle ${signalColour ? colorMap[signalColour] : ''}`}></mdui-icon>
              : undefined
          }
          <mdui-icon name="cell_tower" className="align-middle "></mdui-icon>
          <span className="inline-block align-middle">DAB Radio</span>
          </div>
        </div>
      </header>
  );
}

export default PageHeading;