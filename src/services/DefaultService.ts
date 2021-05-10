import { BrowserWindow } from 'electron'

export class DefaultService {
  /**
   * Returns focused window if exists
   * @returns BrowserWindow if exists, null otherwise
   */
  protected getCurrentWindow (): BrowserWindow | null {
    return BrowserWindow.getFocusedWindow()
  }
}
