/// <reference types="mdui/jsx.en" />
import {RefObject, useEffect, useMemo, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import {ServiceInfo} from "./websocketTypes";
import {PROGRAMME_TYPE_TABLES, PROGRAMME_TYPE_UNSET} from "./ProgrammeTypes";

interface ServiceListProps {
  services: Array<ServiceInfo>;
  startService: (svc: ServiceInfo)=>void
  currentService?: ServiceInfo
  isFavourites?: boolean
}
interface ServiceItemProps {
  svc: ServiceInfo;
  startService: (svc: ServiceInfo)=>void
  currentService?: ServiceInfo
  targetRef: RefObject<HTMLElement | null>
}
//TODO use a setting for this, or the country codes? "National Music" is translated differently in other languages
const PROGRAMME_TYPE_TABLE = PROGRAMME_TYPE_TABLES.ENGLISH_GENERAL;

function ServiceEntry({svc, startService, currentService, targetRef}: ServiceItemProps) {
  const isCurrentSvc = currentService && currentService.ensembleId === svc.ensembleId && currentService.serviceId === svc.serviceId;
  let mappedProgrammeType = (svc.programmeType && svc.programmeType !== 0 && svc.programmeType < PROGRAMME_TYPE_TABLE.length) ?
      PROGRAMME_TYPE_TABLE[svc.programmeType] : undefined
  if (mappedProgrammeType && svc.programmeTypeDynamic) {
    mappedProgrammeType+= " (current programme)"
  }
  return (
      <mdui-list-item onClick={()=>startService(svc)}
                      active={isCurrentSvc}
                      ref={isCurrentSvc ? targetRef : null}
      >
        {svc.serviceLabel}
        <small slot="description">{mappedProgrammeType ? mappedProgrammeType : undefined}</small>
      </mdui-list-item>
  )
}

export default function ServiceList({services, startService, currentService, isFavourites = false}: ServiceListProps) {
  const serviceMap = useMemo(()=> services.reduce<Record<string, Array<ServiceInfo>>>((previousValue, currentValue)=>{
    const services = previousValue[currentValue.ensembleLabel] = previousValue[currentValue.ensembleLabel] || []
    services.push(currentValue)
    return previousValue;
  }, {}), [services]);

  const targetRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const current = targetRef.current;
    if (current) {
      setTimeout(()=>current.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }/* else {
      console.log('ref was not active')
    }*/
  }, []);

  let widgetContents;
  if (services.length) {
    widgetContents = (<mdui-list>
      {Object.keys(serviceMap).map(ensemble => (
          <div key={ensemble}>
            <mdui-list-subheader >{ensemble}</mdui-list-subheader>
            {serviceMap[ensemble].map(svc=><ServiceEntry
                key={svc.ensembleId+'-'+svc.serviceId}
                svc={svc}
                currentService={currentService}
                startService={startService}
                targetRef={targetRef}
            ></ServiceEntry>) }
          </div>
      ))}
    </mdui-list>)
  } else {
    widgetContents = (<p className="text-center h-full flex items-center justify-center">No services. {isFavourites ? 'Star a service to see it here' : 'Run a scan?'}</p>)
  }

  return (<div className="overflow-auto h-full">{widgetContents}</div>)
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