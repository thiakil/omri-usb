/// <reference types="mdui/jsx.en" />
import {useHudiy} from "./HudiyApi";
import React, {ReactElement, ReactNode, useCallback, useMemo, useState} from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';
import {ReceptionQuality, ServiceInfo, TunerStatus, WSMessage} from './websocketTypes'
import 'mdui/mdui.css';
import 'mdui/components/button-icon.js';
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import PageHeading from "./PageHeading";
import {Options as WebsocketOptions} from "react-use-websocket/src/lib/types";

interface MainWrapProps {
  headerText: string
  headerIcon?: string
  backAction?: "close"|"arrow_back"
  onBack?: ()=>void
  signalIcon?: string
  signalColour?: "red"|"orange"|"yellow"|"green"
  children?: ReactNode
}
function MainWrapper({headerText= "cell_tower", backAction = "close", headerIcon, onBack, children, signalIcon, signalColour}: MainWrapProps) {
  return (<div className="flex flex-col h-screen max-h-screen">
    <PageHeading headerText={headerText} icon={headerIcon} onBack={onBack} backAction={backAction} signalIcon={signalIcon} signalColour={signalColour}/>
    {children}
  </div>)
}

function App() {
  const hudiyCallbacks = useMemo(()=>({}), [])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hudiy = useHudiy(hudiyCallbacks)
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [currentService, setCurrentService] = useState<ServiceInfo|undefined>(undefined);
  const [currentDls, setCurrentDls] = useState<string|undefined>(undefined)
  const [tunerStatus, setTunerStatus] = useState<TunerStatus>(TunerStatus.TUNER_STATUS_NOT_INITIALIZED)
  const [serviceListActive, setServiceListActive] = useState(false)
  const [slideshowImage, setSlideshowImage] = useState<string|undefined>(undefined)
  const [signalIcon, setSignalIcon] = useState<string|undefined>(undefined)
  const [signalColour, setSignalColour] = useState<"red"|"orange"|"yellow"|"green"|undefined>(undefined)

  let socketConfig = useMemo<WebsocketOptions>(()=>{
    return {
      shouldReconnect: (closeEvent) => true, // Auto-reconnect on server drops
      onOpen: () => console.log('Connection established!'),
      onClose: e=> console.log("Web socket connection closed", e),
      onMessage: event => {
        let message: WSMessage = JSON.parse(event.data);
        //console.log('received message', message)
        if (message.type === 'service_list') {
          setServices(message.services || [])
        } else if (message.type === 'tuner_state') {
          setCurrentService(message.currentService || undefined)
          setTunerStatus(message.status)
          //setTunerStatus(message.status)
          if (!message.currentService) {
            setCurrentDls(undefined);
            setSlideshowImage(undefined)
            setSignalIcon(undefined)
            setSignalColour(undefined)
          }
        } else if (message.type === 'dab_text_update'){
          setCurrentDls(message.text)
        } else if (message.type === 'dab_image') {
          setSlideshowImage(`data:${message.mimeType};base64,${message.imageData}`)
        } else if (message.type === "reception_status") {
          let icon: string|undefined
          let colour: "red"|"orange"|"yellow"|"green"|undefined;
          if (message.rfLock) {
            switch (message.quality) {
              case ReceptionQuality.BAD:
                icon = "signal_cellular_alt_1_bar"
                colour = "red"
                break;
              case ReceptionQuality.POOR:
                icon = "signal_cellular_alt_1_bar"
                colour = "orange"
                break;
              case ReceptionQuality.OKAY:
                icon = "signal_cellular_alt_2_bar"
                colour = "yellow"
                break
              case ReceptionQuality.GOOD:
                icon = "signal_cellular_alt_2_bar"
                colour = "green"
                break
              case ReceptionQuality.BEST:
                icon = "signal_cellular_alt"
                colour = "green"
                break;
            }
          }
          setSignalIcon(icon)
          setSignalColour(colour)
        }
      }
    }
  }, [setServices, setCurrentService, setCurrentDls, setSlideshowImage, setSignalIcon, setSignalColour, setTunerStatus])
  const { sendJsonMessage/*, lastJsonMessage, readyState */} = useWebSocket(`ws://${window.location.host}/socket`, socketConfig);

  const stopService = useCallback( ()=> {
    sendJsonMessage({type: 'stop_service'})
  }, [sendJsonMessage]);

  const startService = useCallback((service: ServiceInfo) => {
    sendJsonMessage({
      type: 'start_service',
      ensembleId: service.ensembleId,
      serviceId: service.serviceId,
    })
    setServiceListActive(false)
  }, [sendJsonMessage, setServiceListActive]);

  let content;
  if (serviceListActive) {
    content = (<MainWrapper headerText="Services" onBack={()=>setServiceListActive(false)} signalIcon={signalIcon} signalColour={signalColour}>
      <div className="w-11/12 m-auto min-h-0 py-2 grow">
        <ServiceList services={services} startService={startService} currentService={currentService}></ServiceList>
      </div>
    </MainWrapper>);
  } else {
    content = (<MainWrapper headerText="DAB Radio" signalIcon={signalIcon} signalColour={signalColour}>
          <div className="size-main flex justify-center pt-6">
            <CurrentlyPlaying
                service={currentService}
                currentText={currentDls}
                onStop={stopService}
                currentSlideshow={slideshowImage}
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
