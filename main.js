/**
 * Electron
 */
const {
  app,
  BrowserWindow
} = require('electron')

let win
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    minWidth: 900,
    height: 800,
    minHeight: 800,
    frame: false,
    icon: 'assets/img/DynamicProsit.png'
  })

  win.loadFile('views/index.html')
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()
  }
})

/**
 * Extras
 */
const ipcMain = require('electron').ipcMain
const generateDocx = require('generate-docx')

ipcMain.on('submitForm', function(event, data) {

  let d = JSON.parse(data)

  let motClesW = ""
  let contraintesW = ""
  let problematiquesW = ""
  let solutionsW = ""
  let livrablesW = ""
  let actionsW = ""

  d.motCles.forEach((mot) => {
    motClesW = motClesW.concat(`- ${mot}: \n`)
  })
  d.contraintes.forEach((mot) => {
    contraintesW = contraintesW.concat(`- ${mot} \n`)
  })
  d.problematiques.forEach((mot) => {
    problematiquesW = problematiquesW.concat(`- ${mot} \n`)
  })
  d.solutions.forEach((mot) => {
    solutionsW = solutionsW.concat(`- ${mot} \n`)
  })
  for (let i = 1; i < d.livrables.length + 1; i++) {
    livrablesW = livrablesW.concat(i + `. ${d.livrables[i]} \n`) 
  }
  d.actions.forEach((mot) => {
    actionsW = actionsW.concat(`- ${mot} \n`)
  })
  
  const options = {
    template: {
      filePath: app.getAppPath() + '/templates/template.docx',
      data: {
        title: d.title,
        link: d.link,
        animateur: d.animateur,
        secretaire: d.secretaire,
        scribe: d.scribe,
        date: new Date().toLocaleDateString(),
        gestionnaire: d.gestionnaire,
        contexte: d.contexte,
        generalisation: d.generalisation,
        motCles: motClesW,
        contraintes: contraintesW,
        problematiques: problematiquesW,
        solutions: solutionsW,
        livrables: livrablesW,
        actions: actionsW
      }
    },
    templateOptions: {
      linebreaks: true
    },
    save: {
      filePath: d.path
    }
  }

  generateDocx(options)
  .then()
  .catch((err) => win.webContents.send('error', err))

})