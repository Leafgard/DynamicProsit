import { app } from 'electron'
import { DefaultService } from './DefaultService'

export interface IWindowControlsService {
  minimize: () => void
  toggleMaximization: () => void
  restart: () => void
  close: () => void
}

export class WindowControlsService extends DefaultService implements IWindowControlsService {
  /**
   * Minimizes window
   */
  public minimize (): void {
    const window = this.getCurrentWindow()
    if (window != null) window.minimize()
  }

  /**
   * Either maximize or un-maximize window depending on current state
   */
  public toggleMaximization (): void {
    const window = this.getCurrentWindow()
    if (window != null) window.isMaximized() ? window.unmaximize() : window.maximize()
  }

  /**
   * Restarts application next time app quits
   */
  public restart (): void {
    app.relaunch()
  }

  /**
   * Closes application
   */
  public close (): void {
    app.exit()
  }
}
