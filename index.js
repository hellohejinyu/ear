const { app, BrowserWindow } = require('electron')
const path = require('path')

app.on('ready', function () {
  const window = new BrowserWindow()
  window.loadFile(path.resolve(__dirname, 'src', 'index.html'))
})