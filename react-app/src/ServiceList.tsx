import {useState} from "react";
import useWebSocket from "react-use-websocket";
import {ServiceInfo} from "./websocketTypes";
import {List, ListItem, ListGroup} from "actify";

interface ServiceListProps {
  services: Array<ServiceInfo>;
  startService: (svc: ServiceInfo)=>void
}
export default function ServiceList({services, startService}: ServiceListProps) {
  const serviceMap = services.reduce<Record<string, Array<ServiceInfo>>>((previousValue, currentValue)=>{
    const services = previousValue[currentValue.ensembleLabel] = previousValue[currentValue.ensembleLabel] || []
    services.push(currentValue)
    return previousValue;
  }, {});

  console.log("keys", Object.keys(serviceMap))

  return (<div className="overflow-auto h-screen"><List>
    {Object.keys(serviceMap).map(ensemble => (
        <ListGroup key={ensemble} label={ensemble}>
          {(serviceMap[ensemble]||[]).map(svc=>{
            console.log(svc)
            return (
                <ListItem onClick={()=>startService(svc)}
                    key={svc.ensembleId+'-'+svc.serviceId}
                >
                  {svc.serviceLabel}
                </ListItem>
            )})}
        </ListGroup>
    ))}
  </List></div>)
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