import { config, IGlobalConfig } from './config'

export interface IRendererConfig extends IGlobalConfig {

}

export const rendererConfig: IRendererConfig = {
  ...config
}
