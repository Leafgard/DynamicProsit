import { app, BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 1200,
    height: 900,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(isDev
    ? 'http://localhost:9000'
    : `file://${app.getAppPath()}/index.html`)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
