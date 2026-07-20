export type WSMessage =
  | WSMessage.dab_text_update
  | WSMessage.error
  | WSMessage.service_list
  | WSMessage.start_service
  | WSMessage.stop_service
  | WSMessage.tuner_state;

export namespace WSMessage {
  export enum Type {
    dab_text_update = "dab_text_update",
    error = "error",
    service_list = "service_list",
    start_service = "start_service",
    stop_service = "stop_service",
    tuner_state = "tuner_state",
  }
  
  export interface dab_text_update {
    type: WSMessage.Type.dab_text_update;
    text: string;
    tags: { [key: string]: string };
  }
  
  export interface error {
    type: WSMessage.Type.error;
    message: string;
    fatal?: boolean;
  }
  
  export interface service_list {
    type: WSMessage.Type.service_list;
    services: ServiceInfo[];
  }
  
  export interface start_service {
    type: WSMessage.Type.start_service;
    ensembleId: number;
    serviceId: number;
  }
  
  export interface stop_service {
    type: WSMessage.Type.stop_service;
  }
  
  export interface tuner_state {
    type: WSMessage.Type.tuner_state;
    status: TunerStatus;
    currentService: ServiceInfo | null;
  }
}

export enum TunerStatus {
  TUNER_STATUS_NOT_INITIALIZED = "TUNER_STATUS_NOT_INITIALIZED",
  TUNER_STATUS_INITIALIZED = "TUNER_STATUS_INITIALIZED",
  TUNER_STATUS_ERROR = "TUNER_STATUS_ERROR",
  TUNER_STATUS_SUSPENDED = "TUNER_STATUS_SUSPENDED",
  TUNER_STATUS_SCANNING = "TUNER_STATUS_SCANNING",
  SERVICES_LIST_READY = "SERVICES_LIST_READY",
  VISUALS_LIST_READY = "VISUALS_LIST_READY",
}

export interface ServiceInfo {
  ensembleId: number;
  ensembleLabel: string;
  serviceLabel: string;
  serviceId: number;
}