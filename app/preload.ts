import { ipcRenderer } from 'electron';

async function getAppInfo() {
  return await ipcRenderer.invoke('app/get_basic_info') 
}

async function downloadFile(formData: any) {
  return await ipcRenderer.invoke('downloadFile', formData)
}

function itemDone(cb: (state: any) => any) {
  ipcRenderer.on('itemDone', (e, state) => {
    cb(state)
  })
}

function itemUpdated(cb: (state: any) => any) {
  ipcRenderer.on('itemUpdated', (e, state) => {
    cb(state)
  })
}

function openFileFolder (path: string) {
  ipcRenderer.invoke('openFileFolder', path)
}

const JSBridge = {
  getAppInfo,
  openFileFolder,
  downloadFile,
  itemUpdated,
  itemDone,
};

window.JSBridge = JSBridge;

export type JSBridgeType = typeof JSBridge;