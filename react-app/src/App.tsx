import React, {useState} from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';
import {ServiceInfo, TunerStatus, WSMessage} from './websocketTypes'
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import {Button, Icon, IconButton, TopAppBar} from 'actify'
import PageHeading from "./PageHeading";

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
    content = (<ServiceList services={services} startService={startService}></ServiceList>);
  } else {
    content = (<div className="flex flex-col h-screen">
          <PageHeading headerText="Dab Radio"/>
          <div className="flex justify-center py-6">
            <CurrentlyPlaying
                service={currentService}
                currentText={currentDls}
                onStop={stopService}
            ></CurrentlyPlaying>
          </div>
          <div className="flex justify-center py-6">
            <Button onClick={()=>setServiceListActive(true)}><Icon>playlist_play</Icon></Button>
            {currentService ? (<IconButton onClick={stopService} color="primary"><Icon fill>stop</Icon></IconButton>) : undefined}
          </div>
        </div>
    )
  }

  return content;
}

export default App;
