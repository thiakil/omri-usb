/// <reference types="mdui/jsx.en" />
import React from 'react';

interface PageHeadingProps {
  icon?: string;
  backAction?: "close"|"arrow_back"
  headerText: string
  onBack?: ()=>void
}

function PageHeading({icon = "cell_tower", backAction = "close", headerText, onBack=()=>{}}: PageHeadingProps) {
  return (
      <header className="pageHeader flex flex-row justify-between items-center  pr-3">
        <mdui-button-icon icon={backAction} onClick={onBack}></mdui-button-icon>
        <div>
          <mdui-icon name={icon} className="align-middle "></mdui-icon>
          <span className="inline-block align-middle">&nbsp;{headerText}</span>
        </div>
      </header>
  );
}

export default PageHeading;