import { ipcMain } from 'electron'
import { DefaultService } from '../services/DefaultService'

export class DefaultChannel {
  /**
   * Retrieve all service's methods
   * @param Service Service
   * @returns Service methods names
   */
  private static getAllMethodNames<T extends DefaultService> (Service: new() => T): Array<keyof T> {
    return Object.getOwnPropertyNames(Service.prototype).filter(
      (prop) => prop !== 'constructor'
    ) as Array<keyof T>
  }

  /**
   * Register all services methods by "prefix-method" event listener
   * @example ipcMain.on('prefix-method', () => myService.method())
   *
   * @param prefix Service prefix
   * @param Service
   */
  protected register<T extends DefaultService> (prefix: string, Service: new() => T): void {
    const serviceInstance: Record<keyof T, Function> = new Service() as any
    DefaultChannel.getAllMethodNames(Service)
      .forEach((method) => {
        ipcMain.handle(`${prefix}-${method as string}`, (event, ...args) => serviceInstance[method](...args, event))
      })
  }
}
