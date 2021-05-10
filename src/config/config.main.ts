import { config, IGlobalConfig } from './config'

export interface IMainConfig extends IGlobalConfig {

}

export const mainConfig: IMainConfig = {
  ...config
}
