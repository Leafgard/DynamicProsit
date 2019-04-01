/**
 * Electron
 */
const {
  app,
  BrowserWindow
} = require('electron')

/**
 * Packages
 */
const Store = new ( require('electron-store') )()
const ipcMain = require('electron').ipcMain
const moment = require('moment')
const path = require('path')

/**
 * Modules
 */
const Prosit = require('./src/Prosit')

/**
 * Settings
 */

const version = '3.0.1'

// Initial configuration
if (!Store.has('version') || Store.get('version') != version) {
  Store.set('version', version)
  Store.set('theme', 'light')
  Store.set('wiki', true)
  Store.set('json', false)
  Store.set('locale', 'fr')
  // Moment configuration
  moment.locale(
    Store.get('locale'),
    require('./config/moment.locale.' + Store.get('locale'))
  )
  Store.set('templates', [{
      name: 'Leafgard',
      path: path.resolve(`${__dirname}/templates/default.docx`),
      date: moment().format('LLLL')
    }])
  Store.set('templateId', '0')
} else {
  // Moment configuration
  moment.locale(
    Store.get('locale'),
    require('./config/moment.locale.' + Store.get('locale'))
  )
}

/**
 * Window
 */
let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1201,
    width: 1201,
    minHeight: 768,
    height: 850,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('views/app.html')
  // DevTools
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

/**
 * Application events
 */
app
  .on('ready', createWindow)
  .on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
  .on('activate', function () {
  if (mainWindow === null) createWindow()
})

/**
 * Binding functions to renderer events
 */
ipcMain
  .on('makeProsit', (e, d) => Prosit.make(e, d))
  .on('addTemplate', (e, d) => Prosit.addTemplate(e, d))