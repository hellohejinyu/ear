import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'

const agreement = 'ear' // 自定义协议名

// 验证是否为自定义协议的链接
const AGREEMENT_REGEXP = new RegExp(`^${agreement}://`)

// 监听自定义协议唤起
function watchProtocol() {
  // mac唤醒应用 会激活open-url事件 在open-url中判断是否为自定义协议打开事件
  app.on('open-url', (event, url) => {
    const isProtocol = AGREEMENT_REGEXP.test(url)
    if (isProtocol) {
      console.log('获取协议链接, 根据参数做各种事情')
      dialog.showMessageBox({
        type: 'info',
        message: 'Mac protocol 自定义协议打开',
        detail: `自定义协议链接：${url}`,
      })
    }
  })
  // windows系统下唤醒应用会激活second-instance事件 它在ready执行之后才能被监听
  app.on('second-instance', (event, commandLine) => {
    // commandLine 是一个数组， 唤醒的链接作为数组的一个元素放在这里面
    commandLine.forEach(str => {
      if (AGREEMENT_REGEXP.test(str)) {
        console.log('获取协议链接, 根据参数做各种事情')
        dialog.showMessageBox({
          type: 'info',
          message: 'Windows protocol 自定义协议打开',
          detail: `自定义协议链接:${str}`,
        })
      }
    })
  })
}

// 在ready事件回调中监听自定义协议唤起
console.log('监听成功')

// 注册自定义协议
function setCustomProtocol() {
  let isSet = false // 是否注册成功

  app.removeAsDefaultProtocolClient(agreement) // 每次运行都删除自定义协议 然后再重新注册
  // 开发模式下在window运行需要做兼容
  if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
    // 设置electron.exe 和 app的路径
    isSet = app.setAsDefaultProtocolClient(agreement, process.execPath, [
      path.resolve(process.argv[1]),
    ])
  } else {
    isSet = app.setAsDefaultProtocolClient(agreement)
  }
  console.log('是否注册成功', isSet)
}


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
  setCustomProtocol()
  watchProtocol()
})

app.on('will-finish-launching', function () {
  ipcMain.handle('app/get_basic_info', function handleAppGetBasicInfo() {
    return {
      version: app.getVersion(),
      name: app.name,
    }
  })
})