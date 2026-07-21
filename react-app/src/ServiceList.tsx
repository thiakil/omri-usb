/// <reference types="mdui/jsx.en" />
import {useState} from "react";
import useWebSocket from "react-use-websocket";
import {ServiceInfo} from "./websocketTypes";
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/list-subheader.js';

interface ServiceListProps {
  services: Array<ServiceInfo>;
  startService: (svc: ServiceInfo)=>void
  currentService?: ServiceInfo
}
export default function ServiceList({services, startService, currentService}: ServiceListProps) {
  const serviceMap = services.reduce<Record<string, Array<ServiceInfo>>>((previousValue, currentValue)=>{
    const services = previousValue[currentValue.ensembleLabel] = previousValue[currentValue.ensembleLabel] || []
    services.push(currentValue)
    return previousValue;
  }, {});

  return (<div className="overflow-auto h-full"><mdui-list>
    {Object.keys(serviceMap).map(ensemble => (
        <div key={ensemble}>
          <mdui-list-subheader >{ensemble}</mdui-list-subheader>
          {(serviceMap[ensemble]||[]).map(svc=>{
            return (
                <mdui-list-item onClick={()=>startService(svc)}
                    key={svc.ensembleId+'-'+svc.serviceId}
                    active={currentService && currentService.ensembleId === svc.ensembleId && currentService.serviceId === svc.serviceId}
                >
                  {svc.serviceLabel}
                </mdui-list-item>
            )})}
        </div>
    ))}
  </mdui-list></div>)
}

/*<ListGroup key={ensemble} label={ensemble}>
          {(serviceMap[ensemble]||[]).map(svc=>{
          console.log(svc)
          return (
              <ListItem
                  key={svc.ensembleId+'-'+svc.serviceId}
              >
                {svc.serviceLabel}
              </ListItem>
          )})}

        </ListGroup>

 */