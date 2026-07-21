/// <reference types="mdui/jsx.en" />
import React, {ReactElement, ReactNode, useState} from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';
import {ServiceInfo, TunerStatus, WSMessage} from './websocketTypes'
import 'mdui/mdui.css';
import 'mdui/components/button-icon.js';
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import PageHeading from "./PageHeading";

interface MainWrapProps {
  headerText: string
  headerIcon?: string
  backAction?: string
  onBack?: ()=>void
  children?: ReactNode
}
function MainWrapper({headerText= "cell_tower", backAction = "close", headerIcon, onBack, children}: MainWrapProps) {
  return (<div className="flex flex-col h-screen">
    <PageHeading headerText={headerText} icon={headerIcon} onBack={onBack}/>
    {children}
  </div>)
}

function App() {

  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [currentService, setCurrentService] = useState<ServiceInfo|undefined>(undefined);
  const [currentDls, setCurrentDls] = useState<string|undefined>(undefined)
  const [tunerStatus, setTunerStatus] = useState<TunerStatus>(TunerStatus.TUNER_STATUS_NOT_INITIALIZED)
  const [serviceListActive, setServiceListActive] = useState(false)

  const { sendJsonMessage/*, lastJsonMessage, readyState */} = useWebSocket(`ws://${window.location.host}/socket`, {
    shouldReconnect: (closeEvent) => true, // Auto-reconnect on server drops
    onOpen: () => console.log('Connection established!'),
    onClose: e=> console.log("Web socket connection closed", e),
    onMessage: event => {
      let message: WSMessage = JSON.parse(event.data);
      console.log('received message', message)
      if (message.type === 'service_list') {
        setServices(message.services || [])
      } else if (message.type === 'tuner_state') {
        setCurrentService(message.currentService || undefined)
        //setTunerStatus(message.status)
        if (!message.currentService && currentDls) {
          setCurrentDls(undefined);
        }
      } else if (message.type === 'dab_text_update'){
        setCurrentDls(message.text)
      }
    }
  });

  function stopService() {
    sendJsonMessage({type: 'stop_service'})
  }

  function startService(service: ServiceInfo) {
    sendJsonMessage({
      type: 'start_service',
      ensembleId: service.ensembleId,
      serviceId: service.serviceId,
    })
    setServiceListActive(false)
  }

  let content;
  if (serviceListActive) {
    content = (<MainWrapper headerText="Services" onBack={()=>setServiceListActive(false)}>
      <ServiceList services={services} startService={startService}></ServiceList>
    </MainWrapper>);
  } else {
    content = (<MainWrapper headerText="DAB Radio">
          <div className="size-main flex justify-center pt-6">
            <CurrentlyPlaying
                service={currentService}
                currentText={currentDls}
                onStop={stopService}
            ></CurrentlyPlaying>
          </div>
          <div className="size-main flex justify-center py-3 gap-2">
            <mdui-button-icon icon="playlist_play" onClick={()=>setServiceListActive(true)}></mdui-button-icon>
            {currentService ? (<mdui-button-icon icon="stop" onClick={stopService} variant="tonal"></mdui-button-icon>) : undefined}
          </div>
        </MainWrapper>
    )
  }

  return content;
}

export default App;
