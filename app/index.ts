import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

app.on('ready', function () {
  const window = new BrowserWindow({
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js')
    }
  })
  window.loadFile(path.resolve(__dirname, '..', '..', 'output', 'renderer', 'index.html'))
  if (process.env.NODE_ENV === 'development') {
    window.webContents.openDevTools()
  }
})

app.on('will-finish-launching', function () {
  ipcMain.handle('app/get_basic_info', function handleAppGetBasicInfo() {
    return {
      version: app.getVersion(),
      name: app.name,
    }
  })
})