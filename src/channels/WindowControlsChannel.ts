import { WindowControlsService } from '../services/WindowControlsService'
import { DefaultChannel } from './DefaultChannel'

export class WindowControlsChannel extends DefaultChannel {
  constructor () {
    super()

    this.register<WindowControlsService>('WindowControls', WindowControlsService)
  }
}
