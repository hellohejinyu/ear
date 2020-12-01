import { ipcRenderer } from 'electron';

async function getAppInfo() {
  return await ipcRenderer.invoke('app/get_basic_info') 
}

const JSBridge = {
  getAppInfo,
};

window.JSBridge = JSBridge;

export type JSBridgeType = typeof JSBridge;