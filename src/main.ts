import { init } from '@sentry/electron'
import { app, BrowserWindow } from 'electron'
import { join } from 'path'

// Channels
import { DefaultChannel } from './channels/DefaultChannel'
import { WindowControlsChannel } from './channels/WindowControlsChannel'
import { mainConfig } from './config/config.main'

init({ dsn: mainConfig.SENTRY_DSN })

const isDev = process.env.NODE_ENV === 'development'

// Preload file path
const appPath = isDev ? app.getAppPath() : app.getAppPath() + '/dist'

const preload = join(appPath, 'preload.js')

class DynamicProsit {
  private mainWindow: BrowserWindow | undefined
  private channels: DefaultChannel[] | undefined

  static onWindowAllClosed (): void {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  public init (channels: DefaultChannel[]): void {
    this.channels = channels

    app.on('ready', this.createWindow)
    app.on('activate', this.onActivate)
    app.on('window-all-closed', DynamicProsit.onWindowAllClosed)
  }

  private createWindow (): void {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      minWidth: 1200,
      height: 992,
      minHeight: 992,
      frame: false,
      webPreferences: {
        preload
      }
    })

    const loadURL = isDev
      ? 'http://localhost:9000'
      : `file://${appPath}/index.html`

    this.mainWindow.loadURL(loadURL)
      .catch(() => console.error('Could not load URL:', loadURL))

    this.mainWindow.webContents.openDevTools()
  }

  private onActivate (): void {
    if (this.mainWindow == null) {
      this.createWindow()
    }
  }
}

// Returns true if no other application instance is running
const instanceGotLock = app.requestSingleInstanceLock()

if (instanceGotLock) {
  // Start application
  (new DynamicProsit()).init([
    new WindowControlsChannel()
  ])
} else {
  // Quit to prevent multiple instances being created
  app.quit()
}
