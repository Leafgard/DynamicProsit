// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron')
const settings = require('electron-settings')
const request = require('request')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const os = require('os')

moment.locale('fr', require('./config/moment.locale.fr'))

if (!settings.has('init')) {
  settings.set('init', true)
  settings.set('theme', 'light')
  settings.set('templateFile', path.resolve(`${__dirname}/templates/default.docx`))
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 1201,
    width: 1201,
    minHeight: 900,
    height: 900,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('views/app.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const ipcMain = require('electron').ipcMain
var JSZip = require('jszip')
var Docxtemplater = require('docxtemplater')

ipcMain.on('submit', function(event, data) {
  let type = JSON.parse(data).type
  let prositData = JSON.parse(data).data

  if (settings.get('wiki') == true) {
    let requests = []
    let definitions = {}
    prositData.keywords.forEach(key => {
      requests.push(
        new Promise((res, rej) => {
          request(encodeURI(`https://fr.wikipedia.org/api/rest_v1/page/summary/${key}`), (err, resp, body) => {
            if (resp.statusCode == 200) {
              res({
                keyword: key,
                definition: JSON.parse(body).extract
              })
            } else {
              res({
                keyword: key,
                definition: undefined
              })
            }
          })
        })
      )
    })
    Promise.all(requests).then((data) => {
      generateDOCX(prositData, data)
    }).catch(err => {
      console.error(err)
    })
  } else {
    generateDOCX(prositData)
  }

})

function generateDOCX(prositData, keywords = false) {
  
  var content = fs
    .readFileSync(settings.get('templateFile'), 'binary')
  var zip = new JSZip(content)
  var doc = new Docxtemplater()
  doc.loadZip(zip)
  doc.setOptions({
    nullGetter: function() {
      return ""
    }
  })

  pInfos = prositData.informations

  if (!keywords) {
    keywords = []
    prositData.keywords.forEach(key => {
      keywords.push({keyword: key})
    })
  }

  doc.setData({
    title: pInfos.p_title,
    link: pInfos.p_link,
    date: moment().format('LLLL'),
    generalization: pInfos.p_general,
    context: pInfos.p_context,
    animator: pInfos.p_anim,
    scribe: pInfos.p_scribe,
    administrator: pInfos.p_gestion,
    secretary: pInfos.p_secretary,
    keywords: keywords,
    contraints: prositData.contraints,
    problematics: prositData.problematics,
    solutions: prositData.solutions,
    deliverables: prositData.deliverables,
    actions: prositData.actionsPlan
  })

  try {
    doc.render()
  }
  catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
  }

  var buf = doc.getZip()
    .generate({type: 'nodebuffer'});

  dialog.showSaveDialog({
    title: 'Où souhaitez-vous enregistrer le Prosit ?',
    defaultPath: `${os.homedir}/Prosit.docx`,
    buttonLabel: 'Enregistrer'
  }, (path) => {
    fs.writeFileSync(path, buf);
  })
}