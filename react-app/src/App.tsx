import React from 'react';
import './App.css';
import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface ServiceInfo {
  ensembleId: number,
  ensembleLabel: string,
  serviceLabel: string,
  serviceId: number,
}

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
      <button onClick={props.onStop}>Stop</button>
    </div>);
  } else {
    return (<div>no service</div>);
  }
}

interface ServiceListProps {
  services: Array<ServiceInfo>;
  startService: (svc: ServiceInfo)=>void
}
function ServiceList(props: ServiceListProps) {
  return (<div className="servicesList">
    {props.services.map(svc=>(
        <div className="serviceEntry"
             key={svc.ensembleId+'-'+svc.serviceId}
        >
          {svc.serviceLabel}
          <small>{svc.ensembleLabel}</small>
          <button onClick={()=>props.startService(svc)}><span className="material-symbols-outlined">play</span> </button>
        </div>
    ))}
  </div> )
}

function App() {

  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [currentDls, setCurrentDls] = useState(null)

  const { sendJsonMessage/*, lastJsonMessage, readyState */} = useWebSocket(`ws://${window.location.host}/socket`, {
    shouldReconnect: (closeEvent) => true, // Auto-reconnect on server drops
    onOpen: () => console.log('Connection established!'),
    onClose: e=> console.log("Web socket connection closed", e),
    onMessage: event => {
      let message = JSON.parse(event.data);
      console.log('received message', message)
      if (message.type === 'service_list') {
        setServices(message.services || [])
      } else if (message.type === 'tuner_state') {
        setCurrentService(message.currentService)
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


  return (
      <div id="container">
        <div className="columns">
          <div><CurrentlyPlaying
              service={currentService}
              currentText={currentDls}
              onStop={stopService}
          ></CurrentlyPlaying></div>
          <div><ServiceList services={services} startService={startService}></ServiceList></div>
        </div>
      </div>
  );
}

export default App;
