import {useState} from "react";
import useWebSocket from "react-use-websocket";
import {ServiceInfo} from "./websocketTypes";

interface ServiceListProps {
  services: Array<ServiceInfo>;
  startService: (svc: ServiceInfo)=>void
}
export default function ServiceList(props: ServiceListProps) {
  return (<div className="servicesList">
    {props.services.map(svc=>(
        <div className="serviceEntry"
             key={svc.ensembleId+'-'+svc.serviceId}
        >
          {svc.serviceLabel}
          <small>{svc.ensembleLabel}</small>
          <button onClick={()=>props.startService(svc)}><span className="material-symbols-outlined">play_arrow</span> </button>
        </div>
    ))}
  </div> )
}