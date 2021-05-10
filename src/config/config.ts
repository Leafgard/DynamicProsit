export interface IGlobalConfig {
  APP_CODE: string
  SENTRY_DSN: string
}

export const config: IGlobalConfig = {
  APP_CODE: 'DYNAMICPROSIT',
  SENTRY_DSN: process.env.SENTRY_DSN
}
