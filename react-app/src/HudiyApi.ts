import {useCallback, useEffect, useMemo, useState} from "react";
import useWebSocket, {Options as WSOptions, ReadyState} from "react-use-websocket";
import {hudiy} from "./hudi_protobuf";

export interface HudiyNavCallbacks {
  /**
   * Callback invoked when user wants to highlight next control.
   * @return Boolean. `true` when next control was highlighted, `false` otherwise.
   */
  onMoveToNextControl?(): boolean;

  /**
   * Callback invoked when user wants to highlight previous control.
   * @return {boolean} `true` when previous control was highlighted, `false` otherwise.
   */
  onMoveToPreviousControl?(): boolean;

  /**
   * Callback invoked when the user attempts to press the currently highlighted control. Highlighting should be handled internally by the web view.
   */
  onTriggered?(): void;

  /**
   * Callback invoked when the user attempts to navigate left within the web view. Available only for custom applications.
   */
  onGoLeft?(): void;

  /**
   * Callback invoked when the user attempts to navigate right within the web view. Available only for custom applications.
   */
  onGoRight?(): void;

  /**
   * Callback invoked when the user attempts to navigate back within the web view. Available only for custom applications.
   * @return {boolean}. `true` when the application utilized the event (e.g., it navigated back internally), `false` when the application didn’t utilize the event (then Back in the native UI will be triggered).
   */
  onGoBack?(): boolean;
}

export interface HudiyCallbacks extends HudiyNavCallbacks {
  /**
   * Callback invoked when the web view has finished loading and the Hudiy application has been attached to it.
   */
  onAttached?(): void;

  /**
   * Callback invoked when the color scheme (e.g., dark/light mode or source color) changes.
   */
  onColorSchemeChanged?(): void;

  /**
   * Callback invoked when state of the input focus for web view changed. Current state is stored in `hudiy.inputFocus` property.
   */
  onInputFocusChanged?(): void;

  /**
   * Callback invoked when the user changes the control method to either touch or key input. Current state is stored in `hudiy.activated` property.
   */
  onActivatedChanged?(): void;

}

export interface HudiyGlobalProps {
  /**
   * Indicates the current state of input focus. `true` means the web view has focus; `false` means it does not.
   */
  inputFocus?: boolean;

  /**
   * Indicates whether key input is currently being used. `true` means the user is controlling the interface via key input; `false` means it has switched to touch input.
   */
  activated?: boolean;

  colorScheme?: HudiyColorScheme
}

type HudiyGlobal = HudiyCallbacks & HudiyGlobalProps;

interface HudiyColorScheme {
  primaryPaletteKeyColor: string
  secondaryPaletteKeyColor: string
  tertiaryPaletteKeyColor: string
  neutralPaletteKeyColor: string
  neutralVariantPaletteKeyColor: string
  background: string
  onBackground: string
  surface: string
  surfaceDim: string
  surfaceBright: string
  surfaceContainerLowest: string
  surfaceContainerLow: string
  surfaceContainer: string
  surfaceContainerHigh: string
  surfaceContainerHighest: string
  onSurface: string
  surfaceVariant: string
  onSurfaceVariant: string
  inverseSurface: string
  inverseOnSurface: string
  outline: string
  outlineVariant: string
  shadow: string
  scrim: string
  surfaceTint: string
  primary: string
  onPrimary: string
  primaryContainer: string
  onPrimaryContainer: string
  inversePrimary: string
  secondary: string
  onSecondary: string
  secondaryContainer: string
  onSecondaryContainer: string
  tertiary: string
  onTertiary: string
  tertiaryContainer: string
  onTertiaryContainer: string
  error: string
  onError: string
  errorContainer: string
  onErrorContainer: string
  primaryFixed: string
  primaryFixedDim: string
  onPrimaryFixed: string
  onPrimaryFixedVariant: string
  secondaryFixed: string
  secondaryFixedDim: string
  onSecondaryFixed: string
  onSecondaryFixedVariant: string
  tertiaryFixed: string
  tertiaryFixedDim: string
  onTertiaryFixed: string
  onTertiaryFixedVariant: string
  darkThemeEnabled: boolean
  lightContrastLevel: number
  darkContrastLevel: number
}

declare global {
  interface Window {
    hudiy?: HudiyGlobal
  }
}

const hudiyGlobal: HudiyGlobal = window.hudiy || {};
window.hudiy = hudiyGlobal;//either assign it back to itself or the new object

// Creates an object shape where every interface key must be present
const navCallbackKeysRecord: Record<keyof HudiyNavCallbacks, null> = {
  onMoveToNextControl: null,
  onMoveToPreviousControl: null,
  onTriggered: null,
  onGoLeft: null,
  onGoRight: null,
  onGoBack: null,
};
const navCallbackNames = Object.keys(navCallbackKeysRecord) as Array<keyof HudiyNavCallbacks>

function updateColors() {
  for (let color in hudiyGlobal.colorScheme) {
    document.body.style.setProperty(`--hudiy-${color}`, String(hudiyGlobal.colorScheme[color as keyof HudiyColorScheme]));
  }
  if (hudiyGlobal.colorScheme?.darkThemeEnabled) {
    document.body.className = 'mdui-theme-dark'
  } else {
    document.body.className = 'mdui-theme-light'
  }
}

hudiyGlobal.onColorSchemeChanged = ()=>{
  updateColors()
}

let globalAttached = false;
if (window.hudiy.colorScheme) {
  //already attached before we ran
  globalAttached = true;
  updateColors();
} else {
  hudiyGlobal.onAttached = ()=> {
    globalAttached = true;
    updateColors()
  }
}

export function useHudiy(callbacks: HudiyCallbacks) {

  const [isAttached, setIsAttached] = useState(globalAttached)
  hudiyGlobal.onAttached = useCallback(()=>{
    updateColors()
    setIsAttached(true)
  }, []);

  const [colorScheme, setColorScheme] = useState(hudiyGlobal.colorScheme)
  hudiyGlobal.onColorSchemeChanged = useCallback(()=>{
    updateColors()
    setColorScheme(hudiyGlobal.colorScheme)
  }, [])

  const [inputFocus, setInputFocus] = useState(hudiyGlobal.inputFocus);
  hudiyGlobal.onInputFocusChanged = useCallback(()=>{
    setInputFocus(hudiyGlobal.inputFocus)
  }, [])
  const [activated, setActivated] = useState(hudiyGlobal.activated);
  hudiyGlobal.onActivatedChanged = useCallback(()=>{
    setActivated(hudiyGlobal.activated)
  }, [])

  for (const cbName of navCallbackNames) {
    // @ts-ignore
    hudiyGlobal[cbName] = callbacks[cbName]
  }

  const wsOptions = useMemo<WSOptions>(()=>({
    disableJson: true,
    onOpen: event => console.log('app socket connected')
  }), [])
  const url = `ws://${/*window.location.host === 'trinity.lan:3000' ? */'localhost' /*: 'car-pi.lan'*/}:44406`;
  const appSocket = useWebSocket<ArrayBuffer>(url, wsOptions, isAttached/* || window.location.host === 'localhost:3000'*/);

  const {sendMessage, lastMessage, readyState} = appSocket

  const sendProtobufMessage = useCallback((id: hudiy.app.api.MessageType, flags:number, payload: Uint8Array) =>{
    if (readyState !== ReadyState.OPEN){
      return
    }
    const header = new ArrayBuffer(12);
    const view = new DataView(header);
    view.setUint32(0, payload.length, true);
    view.setUint32(4, id, true);
    view.setUint32(8, flags, true);

    const full = new Uint8Array(12 + payload.length);
    full.set(new Uint8Array(header), 0);
    full.set(payload, 12);
    sendMessage(full);
    console.debug("send message: ", id)
  }, [sendMessage, readyState])

  useEffect(()=> {
    const buffer: ArrayBuffer|undefined = lastMessage?.data
    if (buffer) {
      const view = new DataView(buffer);
      const len = view.getUint32(0, true);
      const id = view.getUint32(4, true);
      const flags = view.getUint32(8, true);
      const payload = new Uint8Array(buffer.slice(12));
      console.log("decoded", { id, flags, payload })
      if (id === hudiy.app.api.MessageType.MESSAGE_HELLO_RESPONSE) {
        const decoded = hudiy.app.api.HelloResponse.decode(payload);
        console.log("HelloResponse:", decoded);
      } else if (id === hudiy.app.api.MessageType.MESSAGE_PING) {
       sendProtobufMessage(hudiy.app.api.MessageType.MESSAGE_PONG, 0, new Uint8Array(0));
      }
      //return { id, flags, payload }
    }
  }, [lastMessage, sendProtobufMessage])

  useEffect(()=>{
    if (readyState === ReadyState.OPEN) {
      const rawSocket = appSocket.getWebSocket() as WebSocket
      if (rawSocket) {
        rawSocket.binaryType= 'arraybuffer'
      } else {
        console.error('Failed to get raw socket')
      }
      console.log("sending hello")
      const versionObj = hudiy.app.api.Version.create({ major: 1, minor: 0 });
      const hello = hudiy.app.api.HelloRequest.create({
        name: "DAB Radio",
        apiVersion: versionObj
      });

      const payload = hudiy.app.api.HelloRequest.encode(hello).finish();
      sendProtobufMessage(hudiy.app.api.MessageType.MESSAGE_HELLO_REQUEST, 0, payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState, sendProtobufMessage])

  return {
    isAttached,
    colorScheme,
    inputFocus,
    activated,
    sendProtobufMessage
  }
}