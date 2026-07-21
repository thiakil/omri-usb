import React from 'react';
import {Icon, IconButton} from "actify";

interface PageHeadingProps {
  icon?: string;
  backAction?: "close"|"arrow_back"
  headerText: string
}

function PageHeading({icon = "cell_tower", backAction = "close", headerText}: PageHeadingProps) {
  return (
      <header className="flex flex-row justify-between items-center bg-surface-dim pr-3">
        <IconButton>
          <Icon>{backAction}</Icon>
        </IconButton>
        <div>
          <Icon className="align-middle">{icon}</Icon>
          <span className="inline-block align-middle">&nbsp;{headerText}</span>
        </div>
      </header>
  );
}

export default PageHeading;