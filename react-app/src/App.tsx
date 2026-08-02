/// <reference types="mdui/jsx.en" />
import {HudiyNavCallbacks, useHudiy} from "./HudiyApi";
import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {ReceptionQuality, ServiceInfo, TunerStatus, WSMessage} from './websocketTypes'
import 'mdui'
import type {Dialog} from 'mdui/components/dialog.js';
import type {Checkbox} from 'mdui/components/checkbox.js';
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import PageHeading from "./PageHeading";
import {Options as WebsocketOptions} from "react-use-websocket/src/lib/types";
import {hudiy} from "./hudi_protobuf";
import {useLocalStorage} from "./LocalStorage";
import {Favourites, FavouritesContext, ServiceIdentity} from "./contexts";

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
  signalPercent?: number
  children?: ReactNode
}
function MainWrapper({headerText= "cell_tower", backAction = "arrow_back", headerIcon, onBack, children, signalIcon, signalColour, signalPercent}: MainWrapProps) {
  return (<div className="flex flex-col h-screen max-h-screen">
    <PageHeading headerText={headerText} icon={headerIcon} onBack={onBack} backAction={backAction} signalIcon={signalIcon} signalColour={signalColour} signalPercent={signalPercent || 0}/>
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
  const tunerStatusRef = useRef(TunerStatus.TUNER_STATUS_NOT_INITIALIZED)
  const [popupActive, setPopupActive] = useState<PopupType>(PopupType.NONE)
  const [slideshowImage, setSlideshowImage] = useState<string|undefined>(undefined)
  const [signalIcon, setSignalIcon] = useState<string|undefined>(undefined)
  const [signalColour, setSignalColour] = useState<"red"|"orange"|"yellow"|"green"|undefined>(undefined)
  const [signalPercent, setSignalPercent] = useState(0)
  const [scanPercent, setScanPercent] = useState<number|undefined>(undefined)
  const [scanFrequency, setScanFrequency] = useState<number|undefined>(undefined)
  const [scanChannel, setScanChannel] = useState<string|undefined>(undefined)
  const [scanCounts, setScanCounts] = useState<Omit<WSMessage.scanned_service, "type">|undefined>(undefined)
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

  const resetScanningVars = useCallback(()=>{
    setScanPercent(undefined)
    setScanFrequency(undefined)
    setScanChannel(undefined)
    setScanCounts(undefined)
  }, [setScanPercent, setScanFrequency, setScanChannel, setScanCounts])

  const { sendJsonMessage, readyState, lastJsonMessage: tunerWSMessage} = useWebSocket(`ws://${window.location.host}/socket`, socketConfig);
  useEffect(()=> {
    if (!tunerWSMessage) {
      return;
    }
    const message = tunerWSMessage as WSMessage

    if (message.type === WSMessage.Type.service_list) {
      setServices(message.services.sort((a,b)=>{
        return a.frequency - b.frequency || a.serviceLabel.localeCompare(b.serviceLabel);
      }) || [])
    } else if (message.type === WSMessage.Type.tuner_state) {
      if ((tunerStatusRef.current === TunerStatus.TUNER_STATUS_SCANNING) !== (message.status === TunerStatus.TUNER_STATUS_SCANNING)){
        //started or stopped scanning, ensure status is undefined
        resetScanningVars()
      }
      setCurrentService(message.currentService || undefined)
      setTunerStatus(message.status)
      tunerStatusRef.current = message.status
      if (!message.currentService) {
        setCurrentDls(undefined);
        setSlideshowImage(undefined)
        setSignalIcon(undefined)
        setSignalColour(undefined)
      }
    } else if (message.type === WSMessage.Type.dab_text_update){
      setCurrentDls(message.text)
    } else if (message.type === WSMessage.Type.dab_image) {
      setSlideshowImage(`data:${message.mimeType};base64,${message.imageData}`)
    } else if (message.type === WSMessage.Type.reception_status) {
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
      setSignalPercent(Math.round(((2000 - message.rawValue)/2000)*100))
    } else if (message.type === "scan_status") {
        setScanFrequency(message.frequencyMHz)
        setScanPercent(message.percentScanned)
        setScanChannel(message.channel)
    } else if (message.type === WSMessage.Type.scanned_service) {
      setScanCounts({
        countNew: message.countNew,
        countSame: message.countSame,
        countUpdated: message.countUpdated
      })
    }
  }, [
      tunerWSMessage, setServices, setCurrentService, setCurrentDls, setSlideshowImage,
      setSignalIcon, setSignalColour, setTunerStatus, tunerStatusRef,
      setScanPercent, setScanFrequency,
      setScanChannel, resetScanningVars
  ])

  const stopService = useCallback( ()=> {
    sendJsonMessage({type: WSMessage.Type.stop_service})
  }, [sendJsonMessage]);

  const closePopup = useCallback(() => {
    setPopupActive(PopupType.NONE)
  }, [setPopupActive]);

  const startService = useCallback((service: ServiceInfo) => {
    sendJsonMessage({
      type: WSMessage.Type.start_service,
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

  const scanDialogRef = useRef<Dialog>(null)
  const clearServicesRef = useRef<Checkbox>(null)

  const startScan = useCallback((clearExisting: boolean)=>{
    sendJsonMessage<WSMessage.start_scan>({
      type: WSMessage.Type.start_scan,
      clearExisting: clearExisting
    })
  }, [sendJsonMessage])

  const cancelScan = useCallback(()=>{
    sendJsonMessage<WSMessage.stop_scan>({
      type: WSMessage.Type.stop_scan
    })
  }, [sendJsonMessage])

  let content;
  if (readyState === ReadyState.OPEN) {
    if (tunerStatus === TunerStatus.TUNER_STATUS_SCANNING) {
      const hasPercent = scanPercent && scanPercent >= 0;
      content = (
          <MainWrapper headerText="Scanning" signalIcon={signalIcon}
                       signalColour={signalColour} signalPercent={signalPercent}>
            <div className="py-2 px-4 grow flex flex-col items-center justify-center">
              <div className="py-2">
                {scanFrequency && scanFrequency > 0 ? (<>Scanning channel <strong>{scanChannel}</strong></>) : "Starting scan"}
                {scanFrequency && scanFrequency > 0 ? (<small>{" (" +scanFrequency+"MHz)"}</small>) : undefined}
              </div>
              <div className="py-2">
                <strong>{scanCounts?.countNew || 0}</strong> new services,<br/>
                <strong>{scanCounts?.countUpdated || 0}</strong> updated services,<br/>
                <strong>{scanCounts?.countSame || 0}</strong> known services
              </div>
              <div className="py-2">
                <mdui-circular-progress max={hasPercent ? 100 : undefined} value={hasPercent ? scanPercent : undefined}></mdui-circular-progress>
              </div>
              <div className="py-2">
                <mdui-button className="text-error" variant="outlined" onClick={() => cancelScan()}>Cancel</mdui-button>
              </div>
            </div>
          </MainWrapper>
      )
    } else if (popupActive === PopupType.SERVICE_LIST) {
      content = (
          <MainWrapper headerText="Services" onBack={closePopup} signalIcon={signalIcon}
                       signalColour={signalColour}>
            <div className="min-h-0 py-2 px-4 grow">
              <ServiceList services={services} startService={startService}
                           currentService={currentService}></ServiceList>
            </div>
            <mdui-fab className="absolute right-5 bottom-5"  extended onClick={()=> {
              if (scanDialogRef.current) {
                scanDialogRef.current.open = true
              }
            }}>
              Scan
              <svg width="28" slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M16 12C16 10.89 15.55 9.89 14.83 9.17L16.24 7.76C17.33 8.85 18 10.35 18 12C17.28 12 16.6 12.13 15.96 12.36C15.97 12.24 16
                    12.12 16 12M20 12.34C20.68 12.59 21.33 12.96 21.88 13.43C21.95 12.96 22 12.5 22 12C22 9.24 20.88 6.74 19.07 4.93L17.66 6.34C19.11
                    7.78 20 9.79 20 12C20 12.12 20 12.23 20 12.34M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M6.34 6.34L4.93
                    4.93C3.12 6.74 2 9.24 2 12S3.12 17.26 4.93 19.07L6.34 17.66C4.89 16.22 4 14.22 4 12C4 9.79 4.89 7.78 6.34 6.34M7.76 7.76C6.67 8.85 6
                    10.35 6 12S6.67 15.15 7.76 16.24L9.17 14.83C8.45 14.11 8 13.11 8 12S8.45 9.89 9.17 9.17L7.76 7.76M19 14H17V17H14V19H17V22H19V19H22V17H19V14Z"/>
              </svg>
            </mdui-fab>
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
          <MainWrapper headerText="DAB Radio" signalIcon={signalIcon} signalColour={signalColour} signalPercent={signalPercent}
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
              {currentService ? (
                <mdui-button-icon icon="stop" onClick={stopService}
                                  variant="tonal"></mdui-button-icon>
              ) : undefined}
              {currentSvcIdx > -1 ? <mdui-button-icon icon="navigate_next"
                                                      onClick={nextService}></mdui-button-icon> : undefined}
              {currentService ? (
                  <mdui-button-icon
                      onClick={() => favourites.toggleFavourite(currentService)}
                  ><span
                      className={isFav ? "material-symbols-round-filled" : "material-symbols-round"}>
                        star</span></mdui-button-icon>
              ): undefined}
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
    <mdui-dialog
        close-on-overlay-click
        headline="Scan Services"
        description="Scanning will stop any current radio service and scan all frequencies for new services."
        ref={scanDialogRef}
    >
      <mdui-checkbox ref={clearServicesRef}>Clear existing services first</mdui-checkbox>
      <mdui-button slot="action" variant="text" onClick={()=>{
        if (scanDialogRef.current) {
          scanDialogRef.current.open = false
        }
      }}>Cancel</mdui-button>
      <mdui-button slot="action" variant="filled" onClick={()=> {
        startScan(clearServicesRef.current?.checked || false)
        if (scanDialogRef.current) {
          scanDialogRef.current.open = false
        }
        //force it into the state early
        resetScanningVars()
        setTunerStatus(TunerStatus.TUNER_STATUS_SCANNING)
      }}>Scan</mdui-button>
    </mdui-dialog>
  </FavouritesContext>);
}

export default App;
