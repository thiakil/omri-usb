/// <reference types="mdui/jsx.en" />
import {HudiyNavCallbacks, useHudiy} from "./HudiyApi";
import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import './App.css';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {ReceptionQuality, ServiceInfo, TunerStatus, WSMessage} from './websocketTypes'
import 'mdui'
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import PageHeading from "./PageHeading";
import {Options as WebsocketOptions} from "react-use-websocket/src/lib/types";
import {hudiy} from "./hudi_protobuf";
import {useLocalStorage} from "./LocalStorage";
import {Favourites, ServiceIdentity, FavouritesContext} from "./contexts";

enum PopupType {
  NONE,
  SERVICE_LIST = 1,
  FAVOURITES_LIST
}

interface MainWrapProps {
  headerText: string
  headerIcon?: string
  backAction?: "close"|"arrow_back"
  onBack?: ()=>void
  signalIcon?: string
  signalColour?: "red"|"orange"|"yellow"|"green"
  children?: ReactNode
}
function MainWrapper({headerText= "cell_tower", backAction = "arrow_back", headerIcon, onBack, children, signalIcon, signalColour}: MainWrapProps) {
  return (<div className="flex flex-col h-screen max-h-screen">
    <PageHeading headerText={headerText} icon={headerIcon} onBack={onBack} backAction={backAction} signalIcon={signalIcon} signalColour={signalColour}/>
    {children}
  </div>)
}

function svcEqual(a: ServiceIdentity, b: ServiceIdentity): boolean {
  return a.ensembleId === b.ensembleId && a.serviceId === b.serviceId
}

function App() {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [currentService, setCurrentService] = useState<ServiceInfo|undefined>(undefined);
  const [currentDls, setCurrentDls] = useState<string|undefined>(undefined)
  const [tunerStatus, setTunerStatus] = useState<TunerStatus>(TunerStatus.TUNER_STATUS_NOT_INITIALIZED)
  const [popupActive, setPopupActive] = useState<PopupType>(PopupType.NONE)
  const [slideshowImage, setSlideshowImage] = useState<string|undefined>(undefined)
  const [signalIcon, setSignalIcon] = useState<string|undefined>(undefined)
  const [signalColour, setSignalColour] = useState<"red"|"orange"|"yellow"|"green"|undefined>(undefined)
  const [favouritesStorage, setFavouritesStorage] = useLocalStorage<Array<ServiceIdentity>>([], 'favourites')
  const favourites = useMemo<Favourites>(()=>{
    return {
      contains: svc => favouritesStorage.findIndex(value => svcEqual(svc, value)) !== -1,
      toggleFavourite: svc => {
        const without = favouritesStorage.filter(v=>!svcEqual(svc, v))
        if (without.length < favouritesStorage.length) {
          setFavouritesStorage(without)
        } else {
          setFavouritesStorage([...favouritesStorage, {
            ensembleId: svc.ensembleId,
            serviceId: svc.serviceId
          }])
        }
      }
    }
  }, [favouritesStorage, setFavouritesStorage])

  let socketConfig = useMemo<WebsocketOptions>(()=>{
    return {
      shouldReconnect: (closeEvent) => true, // Auto-reconnect on server drops
      onOpen: () => console.log('Connection established!'),
      onClose: e=> console.log("Web socket connection closed", e)
    }
  }, [])
  const { sendJsonMessage, readyState, lastJsonMessage: tunerWSMessage} = useWebSocket(`ws://${window.location.host}/socket`, socketConfig);
  useEffect(()=> {
    if (!tunerWSMessage) {
      return;
    }
    const message = tunerWSMessage as WSMessage

    if (message.type === 'service_list') {
      setServices(message.services.sort((a,b)=>{
        return a.frequency - b.frequency || a.serviceLabel.localeCompare(b.serviceLabel);
      }) || [])
    } else if (message.type === 'tuner_state') {
      if (message.status === TunerStatus.TUNER_STATUS_SCANNING && tunerStatus !== TunerStatus.TUNER_STATUS_SCANNING) {
        //just started scanning

      }
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
  }, [tunerWSMessage, setServices, setCurrentService, setCurrentDls, setSlideshowImage, setSignalIcon, setSignalColour, setTunerStatus, tunerStatus])

  const stopService = useCallback( ()=> {
    sendJsonMessage({type: 'stop_service'})
  }, [sendJsonMessage]);

  const closePopup = useCallback(() => {
    setPopupActive(PopupType.NONE)
  }, [setPopupActive]);

  const startService = useCallback((service: ServiceInfo) => {
    sendJsonMessage({
      type: 'start_service',
      ensembleId: service.ensembleId,
      serviceId: service.serviceId,
    })
    closePopup()
  }, [sendJsonMessage, closePopup]);

  const currentSvcIdx = useMemo(() => {
    if (!currentService) {
      return -1
    }
    return services.findIndex(v=>svcEqual(currentService, v))
  }, [currentService, services]);

  const prevService = useCallback(() => {
    if (currentSvcIdx === -1) {
      return
    }
    let prevIdx = currentSvcIdx -1;
    if (prevIdx === -1) {
      prevIdx = services.length - 1;
    }
    startService(services[prevIdx])
  }, [currentSvcIdx, startService, services]);

  const nextService = useCallback(() => {
    if (currentSvcIdx === -1) {
      return
    }
    startService(services[(currentSvcIdx+1) % services.length])
  }, [currentSvcIdx, startService, services]);

  const hudiyCallbacks = useMemo<HudiyNavCallbacks>(()=>({
    onGoBack(): boolean {
      if (popupActive) {
        closePopup()
        return true;
      }
      return false
    }
  }), [popupActive, closePopup])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {sendProtobufMessage, apiReadyState, colorScheme} = useHudiy(hudiyCallbacks)

  const mainExitFn = useMemo(() => {
    if (apiReadyState === ReadyState.OPEN) {
      return ()=>{
        const msg = hudiy.app.api.DispatchAction.create({
          action: "go_back"
        });
        const payload = hudiy.app.api.DispatchAction.encode(msg).finish();
        sendProtobufMessage(hudiy.app.api.MessageType.MESSAGE_DISPATCH_ACTION, 0, payload);
      }
    }
    return undefined
  }, [apiReadyState,sendProtobufMessage]);

  const favouriteServices = useMemo(() => {
    return services.filter(svc=>favourites.contains(svc))
  }, [favourites, services]);

  let content;
  if (readyState === ReadyState.OPEN) {
    if (popupActive === PopupType.SERVICE_LIST) {
      content = (
          <MainWrapper headerText="Services" onBack={closePopup} signalIcon={signalIcon}
                       signalColour={signalColour}>
            <div className="min-h-0 py-2 px-4 grow">
              <ServiceList services={services} startService={startService}
                           currentService={currentService}></ServiceList>
            </div>
          </MainWrapper>);
    } else if (popupActive === PopupType.FAVOURITES_LIST) {
      content = (
          <MainWrapper headerText="Favourites" onBack={closePopup} signalIcon={signalIcon}
                       signalColour={signalColour}>
            <div className="min-h-0 py-2 px-4 grow">
              <ServiceList services={favouriteServices} isFavourites startService={startService}
                           currentService={currentService}></ServiceList>
            </div>
          </MainWrapper>);
    } else {
      const isFav = currentService && favourites.contains(currentService);
      content = (
          <MainWrapper headerText="DAB Radio" signalIcon={signalIcon} signalColour={signalColour}
                       onBack={mainExitFn} backAction="close">
            <div className="size-main flex justify-center pt-6 grow">
              <CurrentlyPlaying
                  service={currentService}
                  currentText={currentDls}
                  onStop={stopService}
                  currentSlideshow={slideshowImage}
              ></CurrentlyPlaying>
            </div>
            <div className="buttons-bar flex justify-center py-3 gap-2">
              <mdui-button-icon icon="queue_music"
                                onClick={() => setPopupActive(PopupType.SERVICE_LIST)}></mdui-button-icon>
              {currentSvcIdx > -1 ? <mdui-button-icon icon="navigate_before"
                                                      onClick={prevService}></mdui-button-icon> : undefined}
              {currentService ? (<>
                <mdui-button-icon icon="stop" onClick={stopService}
                                  variant="tonal"></mdui-button-icon>
                <mdui-button-icon
                                  onClick={()=>favourites.toggleFavourite(currentService)}
                ><span className={isFav ? "material-symbols-round-filled" : "material-symbols-round"}>
                        star</span></mdui-button-icon>
              </>) : undefined}
              {currentSvcIdx > -1 ? <mdui-button-icon icon="navigate_next"
                                                      onClick={nextService}></mdui-button-icon> : undefined}
              <mdui-button-icon onClick={() => setPopupActive(PopupType.FAVOURITES_LIST)} icon="folder_special">
              </mdui-button-icon>
            </div>
          </MainWrapper>
      )
    }
  } else {
    content = (
        <MainWrapper headerText="DAB Radio"
                     onBack={mainExitFn} backAction="close">
          <div className="text-center grow flex items-center justify-center">
            <mdui-icon name="error_outline" className="align-middle"></mdui-icon>&nbsp;
            { readyState === ReadyState.CONNECTING ? "Connecting" : "Not connected"}
          </div>
        </MainWrapper>
    )
  }

  return (<FavouritesContext value={favourites}>
    {content}
  </FavouritesContext>);
}

export default App;
