import {createContext} from "react";
import {ServiceInfo} from "./websocketTypes";

export type ServiceIdentity = Pick<ServiceInfo, "serviceId"|"ensembleId">

export interface Favourites {
  toggleFavourite: (svc: ServiceIdentity)=>void
  contains: (svc: ServiceIdentity)=>boolean
}
const emptyFavourites: Favourites = {
  toggleFavourite: () => console.error("Favourites not initialised"),
  contains: ()=>false
}
export const FavouritesContext = createContext<Favourites>(emptyFavourites)