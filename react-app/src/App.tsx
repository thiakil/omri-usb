import React, {useState} from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';
import {ServiceInfo, TunerStatus, WSMessage} from './websocketTypes'
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import {Button, Icon, IconButton, TopAppBar} from 'actify'

function App() {

  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [currentService, setCurrentService] = useState<ServiceInfo|null>(null);
  const [currentDls, setCurrentDls] = useState<string|null>(null)
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
        setCurrentService(message.currentService)
        //setTunerStatus(message.status)
        if (!message.currentService && currentDls) {
          setCurrentDls(null);
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
  }

  let content;
  if (serviceListActive) {
    content = (<ServiceList services={services} startService={startService}></ServiceList>);
  } else {
    content = (<>
          <header>
            <IconButton>
              <Icon>close</Icon>
            </IconButton>
            <div>
              <Icon fill>cell_tower</Icon>
              <span>&nbsp;DAB Radio</span>
            </div>
          </header>
          <main><Button>Hello Actify</Button>
          <CurrentlyPlaying
              service={currentService}
              currentText={currentDls}
              onStop={stopService}
          ></CurrentlyPlaying>
          </main>
          <footer>buttons go here</footer>
        </>
    )
  }

  return (
      <div id="container">
        {content}
      </div>
  );
}

export default App;
