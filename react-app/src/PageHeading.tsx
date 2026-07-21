/// <reference types="mdui/jsx.en" />
import React from 'react';

interface PageHeadingProps {
  icon?: string;
  backAction?: "close"|"arrow_back"
  headerText: string
  onBack?: ()=>void
  signalIcon?: string
  signalColour?: "red"|"orange"|"yellow"|"green"
}

const colorMap = {
  red: 'text-red-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
};

function PageHeading({icon = "cell_tower", backAction = "close", headerText, onBack=()=>{}, signalIcon, signalColour}: PageHeadingProps) {
  return (
      <header className="pageHeader flex flex-row justify-between items-center pr-3">
        <mdui-button-icon icon={backAction} onClick={onBack}></mdui-button-icon>
        <div>
          {signalIcon ?
              <mdui-icon name={signalIcon} className={`align-middle ${signalColour ? colorMap[signalColour] : ''}`}></mdui-icon>
              : undefined
          }
          <mdui-icon name={icon} className="align-middle "></mdui-icon>
          <span className="inline-block align-middle">&nbsp;{headerText}</span>
        </div>
      </header>
  );
}

export default PageHeading;