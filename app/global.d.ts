import { JSBridgeType } from "app/preload";

declare global{
  interface Window{
    JSBridge: JSBridgeType
  }
}