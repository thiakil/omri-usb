/// <reference types="mdui/jsx.en" />
import {HudiyNavCallbacks, useHudiy} from "./HudiyApi";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import './App.css';
import {ReadyState} from 'react-use-websocket';
import {ReceptionQuality, ServiceInfo, TunerStatus} from './websocketTypes'
import 'mdui'
import type {Dialog} from 'mdui/components/dialog.js';
import type {Checkbox} from 'mdui/components/checkbox.js';
import CurrentlyPlaying from "./CurrentlyPlaying"
import ServiceList from "./ServiceList";
import PageHeading from "./PageHeading";
import {hudiy} from "./hudi_protobuf";
import {useLocalStorage} from "./LocalStorage";
import {Favourites, FavouritesContext, ServiceIdentity} from "./contexts";
import {svcEqual, useTuner} from "./TunerSocket";
import {Button} from "mdui";

enum PopupType {
  NONE,
  SERVICE_LIST = 1,
  FAVOURITES_LIST
}

interface MainScreenProps {
  currentService: ServiceInfo | undefined,
  favourites: Favourites,
  currentDls: string | undefined,
  stopService: () => void,
  slideshowImage: string | undefined,
  tooltipTrigger: string,
  setPopupActive: Dispatch<SetStateAction<PopupType>>,
  currentSvcIdx: number,
  prevService: () => void,
  nextService: () => void
  hidden?:boolean
}

function MainScreen({
                      currentService,
                      favourites,
                      currentDls,
                      stopService,
                      slideshowImage,
                      tooltipTrigger,
                      setPopupActive,
                      currentSvcIdx,
                      prevService,
                      nextService,
                      hidden
                    }: MainScreenProps) {
  const isFav = currentService && favourites.contains(currentService);
  return (
      <>
        <div className="size-main flex justify-center pt-6 grow" hidden={hidden}>
          <CurrentlyPlaying
              service={currentService}
              currentText={currentDls}
              onStop={stopService}
              currentSlideshow={slideshowImage}
          ></CurrentlyPlaying>
        </div>
        <div className="buttons-bar flex justify-center py-3 gap-2" hidden={hidden}>
          <mdui-tooltip trigger={tooltipTrigger} content="Service List">
            <mdui-button-icon icon="queue_music"
                              onClick={() => setPopupActive(PopupType.SERVICE_LIST)}></mdui-button-icon>
          </mdui-tooltip>
          {currentSvcIdx > -1 ? <mdui-tooltip trigger={tooltipTrigger} content="Previous Service">
            <mdui-button-icon icon="navigate_before"
                              onClick={prevService}></mdui-button-icon>
          </mdui-tooltip> : undefined}
          {currentService ? (
              <mdui-tooltip trigger={tooltipTrigger} content="Stop">
                <mdui-button-icon icon="stop" onClick={stopService}
                                  variant="tonal"></mdui-button-icon>
              </mdui-tooltip>
          ) : undefined}
          {currentSvcIdx > -1 ? (
              <mdui-tooltip trigger={tooltipTrigger} content="Next Service">
                <mdui-button-icon icon="navigate_next"
                                  onClick={nextService}></mdui-button-icon>
              </mdui-tooltip>
          ) : undefined}
          {currentService ? (
              <mdui-tooltip trigger={tooltipTrigger} content="Toggle Favourite">
                <mdui-button-icon
                    onClick={() => favourites.toggleFavourite(currentService)}
                >
                    <span
                        className={isFav ? "material-symbols-round-filled" : "material-symbols-round"}>
                        star
                    </span>
                </mdui-button-icon>
              </mdui-tooltip>
          ) : undefined}
          <mdui-tooltip trigger={tooltipTrigger} content="Favourites List">
            <mdui-button-icon onClick={() => setPopupActive(PopupType.FAVOURITES_LIST)}
                              icon="folder_special">
            </mdui-button-icon>
          </mdui-tooltip>
        </div>
      </>
  )
}

function App() {
  const [popupActive, setPopupActive] = useState<PopupType>(PopupType.NONE)
  const closePopup = useCallback(() => {
    setPopupActive(PopupType.NONE)
  }, [setPopupActive]);

  const {
    services,
    currentService,
    currentDls,
    tunerStatus,
    slideshowImage,
    signalQuality,
    scanStatus,
    scanCounts,
    readyState,
    stopService,
    startService,
    currentSvcIdx,
    prevService,
    nextService,
    startScan,
    cancelScan,
    resetScanningVars
  } = useTuner(closePopup)

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
  const {sendProtobufMessage, apiReadyState, colorScheme, activated, inputFocus} = useHudiy(hudiyCallbacks)
  const tooltipTrigger = useMemo(() => {
    if (activated && inputFocus) {
      return "focus"
    }
    return "manual"
  }, [activated,inputFocus]);

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
  const scanButtonRef = useRef<Button>(null)
  useEffect(()=>{
    if (tunerStatus === TunerStatus.TUNER_STATUS_SCANNING) {
      scanButtonRef.current && (scanButtonRef.current.loading = false)
      if (scanDialogRef.current) {//close dialog when scanning starts
        scanDialogRef.current.open = false
      }
    }
  }, [tunerStatus,scanDialogRef])

  const scanPercent = scanStatus?.percent || -1;
  const hasPercent = scanPercent >= 0;
  const scanFrequency = scanStatus?.frequency || 0;
  const hasFrequency = scanFrequency > 0;
  const scanChannel = scanStatus?.channel;
  const hasChannel = Boolean(scanChannel && scanChannel !== "Unknown")

  const mainTitle = useMemo(() => {
    if (readyState === ReadyState.OPEN) {
      if (tunerStatus === TunerStatus.TUNER_STATUS_SCANNING) {
        return "Scanning";
      }
      switch (popupActive) {
        case PopupType.FAVOURITES_LIST:
          return "Favourites"
        case PopupType.SERVICE_LIST:
          return "Services"
        default:
          return undefined
      }
    }
  }, [popupActive, tunerStatus, readyState]);

  const hasPopup = readyState === ReadyState.OPEN && !!popupActive;
  return (<FavouritesContext value={favourites}>
    <div className="flex flex-col h-screen max-h-screen">
      <PageHeading headerText={mainTitle} onBack={hasPopup ? closePopup : mainExitFn} backAction={hasPopup ? "arrow_back" : "close"} signalQuality={signalQuality}/>
      <div className="py-2 px-4 grow flex flex-col items-center justify-center" hidden={!(readyState === ReadyState.OPEN && tunerStatus === TunerStatus.TUNER_STATUS_SCANNING)}>
        <div className="py-2">
          {hasChannel ? (<>Scanning channel <strong>{scanChannel}</strong></>) : "Starting scan"}
          {hasFrequency ? (<small>{" (" +scanFrequency+"MHz)"}</small>) : undefined}
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
      <div className="min-h-0 py-2 px-4 grow" hidden={!(readyState === ReadyState.OPEN && popupActive === PopupType.SERVICE_LIST)}>
        <ServiceList services={services} startService={startService}
                     currentService={currentService}></ServiceList>
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
      </div>
      <div className="min-h-0 py-2 px-4 grow" hidden={!(readyState === ReadyState.OPEN && popupActive === PopupType.FAVOURITES_LIST)}>
        <ServiceList services={favouriteServices} isFavourites startService={startService}
                     currentService={currentService}></ServiceList>
      </div>
      <MainScreen hidden={readyState !== ReadyState.OPEN || !!popupActive}
                  currentService={currentService}
                  favourites={favourites}
                  currentDls={currentDls}
                  stopService={stopService}
                  slideshowImage={slideshowImage}
                  tooltipTrigger={tooltipTrigger}
                  setPopupActive={setPopupActive}
                  currentSvcIdx={currentSvcIdx}
                  prevService={prevService}
                  nextService={nextService}
      ></MainScreen>
      <div className="text-center grow flex items-center justify-center" hidden={readyState === ReadyState.OPEN}>
        <mdui-icon name="error_outline" className="align-middle"></mdui-icon>&nbsp;
        {readyState === ReadyState.CONNECTING ? "Connecting" : "Not connected"}
      </div>
    </div>
    <mdui-dialog
        close-on-overlay-click
        headline="Scan Services"
        description="Scanning will stop any current radio service and scan all frequencies for new services."
        ref={scanDialogRef}
    >
      <mdui-checkbox ref={clearServicesRef}>Clear existing services first</mdui-checkbox>
      <mdui-button slot="action" variant="text" onClick={()=>{
        scanButtonRef.current && (scanButtonRef.current.loading = false)
        if (scanDialogRef.current) {
          scanDialogRef.current.open = false
        }
      }}>Cancel</mdui-button>
      <mdui-button slot="action" variant="filled" ref={scanButtonRef} onClick={()=> {
        scanButtonRef.current && (scanButtonRef.current.loading = true)
        resetScanningVars()
        startScan(clearServicesRef.current?.checked || false)
      }}>Scan</mdui-button>
    </mdui-dialog>
  </FavouritesContext>);
}

export default App;
