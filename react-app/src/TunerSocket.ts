import {ServiceIdentity} from "./contexts";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Options as WebsocketOptions} from "react-use-websocket/src/lib/types";
import {ReceptionQuality, ServiceInfo, TunerStatus, WSMessage} from "./websocketTypes";
import useWebSocket from "react-use-websocket";

export function svcEqual(a: ServiceIdentity, b: ServiceIdentity): boolean {
  return a.ensembleId === b.ensembleId && a.serviceId === b.serviceId
}

export interface ScanStatus {
  percent: number
  frequency: number
  channel: string
}

export function useTuner(closePopup: ()=>void) {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [currentService, setCurrentService] = useState<ServiceInfo|undefined>(undefined);
  const [currentDls, setCurrentDls] = useState<string|undefined>(undefined)
  const [tunerStatus, setTunerStatus] = useState<TunerStatus>(TunerStatus.TUNER_STATUS_NOT_INITIALIZED)
  const tunerStatusRef = useRef(TunerStatus.TUNER_STATUS_NOT_INITIALIZED)
  const [slideshowImage, setSlideshowImage] = useState<string|undefined>(undefined)
  const [signalQuality, setSignalQuality] = useState<ReceptionQuality|undefined>(undefined)
  const [scanStatus, setScanStatus] = useState<ScanStatus|undefined>(undefined)
  const [scanCounts, setScanCounts] = useState<Omit<WSMessage.scanned_service, "type">|undefined>(undefined)

  const resetScanningVars = useCallback(()=>{
    setScanStatus(undefined)
    setScanCounts(undefined)
  }, [setScanStatus, setScanCounts])

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
        setSignalQuality(undefined)
      }
    } else if (message.type === WSMessage.Type.dab_text_update){
      setCurrentDls(message.text)
    } else if (message.type === WSMessage.Type.dab_image) {
      setSlideshowImage(`data:${message.mimeType};base64,${message.imageData}`)
    } else if (message.type === WSMessage.Type.reception_status) {
      setSignalQuality(message.rfLock ? message.quality : undefined)
      //setSignalPercent(Math.round(((2000 - message.rawValue)/2000)*100))
    } else if (message.type === "scan_status") {
      setScanStatus({
        frequency: message.frequencyMHz,
        percent: message.percentScanned,
        channel: message.channel
      })
    } else if (message.type === WSMessage.Type.scanned_service) {
      setScanCounts({
        countNew: message.countNew,
        countSame: message.countSame,
        countUpdated: message.countUpdated
      })
    }
  }, [
    tunerWSMessage, setServices, setCurrentService, setCurrentDls, setSlideshowImage,
    setSignalQuality, setTunerStatus, tunerStatusRef,
    setScanStatus, resetScanningVars
  ])

  const stopService = useCallback( ()=> {
    sendJsonMessage({type: WSMessage.Type.stop_service})
  }, [sendJsonMessage]);

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

  return {
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
  }
}