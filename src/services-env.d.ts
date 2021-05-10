import { IWindowControlsService } from './services/WindowControlsService'

export {}

declare global {
  interface Window {
    WindowControls: IWindowControlsService
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      SENTRY_DSN: string
    }
  }
}
