const remote = require('electron').remote
const dialog = require('electron').remote.dialog
const ipcRenderer = require('electron').ipcRenderer

/**
 * Fenêtre
 */
function maximizeWindow() {
  var window = remote.getCurrentWindow()
  if (window.isMaximized()) {
    window.unmaximize()
  } else {
    window.maximize()
  }
}

function minimizeWindow() {
  var window = remote.getCurrentWindow()
  window.minimize()
}

function closeWindow() {
  var window = remote.getCurrentWindow()
  window.close()
}

ipcRenderer.on('error', (event, err) => {
  console.error(err)
})

ipcRenderer.on('info', (event, err) => {
  console.log(err)
})

/**
 * Formulaires
 */
$(function() {
  $('.motcles').chips({
    placeholder: 'Mot-clés',
    secondaryPlaceholder: '+Mot-clé',
  })

  $('.contraintes').chips({
    placeholder: 'Contraintes',
    secondaryPlaceholder: '+Contrainte',
  })

  $('.problematiques').chips({
    placeholder: 'Problématiques',
    secondaryPlaceholder: '+Problématique',
  })

  $('.solutions').chips({
    placeholder: 'Pistes de solutions',
    secondaryPlaceholder: '+Piste',
  })

  $('.livrables').chips({
    placeholder: 'Livrables',
    secondaryPlaceholder: '+Livrable',
  })

  $('.actions').chips({
    placeholder: 'Plan d\'action',
    secondaryPlaceholder: '+Action',
  })

  $('.tabs').tabs()

  $('.modal').modal({
    dismissible: true
  })
  
  $('#settings').click(() => {
    $('#modal2').modal('open')
  })

})

$( "form" ).submit(function(e) {

  e.preventDefault()

  $('#modal1').modal('open')

  $('#docx').click(() => {
    $('#modal1').modal('close')
    keepGoing('docx')
  })

  $('#pdf').click(() => {
    $('#modal1').modal('close')
    keepGoing('pdf')
  })

})

function keepGoing(type) {
  dialog.showSaveDialog({
    defaultPath: './prositAller.' + type,
    message: 'Où souhaitez-vous enregistrer le Prosit Aller ?'
  }, (path) => {

    var data = {
      title: $('#prositTitle').val(),
      link: $('#prositLink').val(),
      animateur: $('#animateur').val(),
      secretaire: $('#secretaire').val(),
      scribe: $('#scribe').val(),
      gestionnaire: $('#gestionnaire').val(),
      contexte: $('#contexte').val(),
      generalisation: $('#generalisation').val(),
      motCles: [],
      contraintes: [],
      problematiques: [],
      solutions: [],
      livrables: [],
      actions: [],
      path: path,
      type: type
    }
  
    var motCles = M.Chips.getInstance($('.motcles')).chipsData
    var contraintes = M.Chips.getInstance($('.contraintes')).chipsData
    var problematiques = M.Chips.getInstance($('.problematiques')).chipsData
    var solutions = M.Chips.getInstance($('.solutions')).chipsData
    var livrables = M.Chips.getInstance($('.livrables')).chipsData
    var actions = M.Chips.getInstance($('.actions')).chipsData
    
    motCles.forEach((mot) => {
      data.motCles.push(mot.tag)
    })
    contraintes.forEach((mot) => {
      data.contraintes.push(mot.tag)
    })
    problematiques.forEach((mot) => {
      data.problematiques.push(mot.tag)
    })
    solutions.forEach((mot) => {
      data.solutions.push(mot.tag)
    })
    livrables.forEach((mot) => {
      data.livrables.push(mot.tag)
    })
    actions.forEach((mot) => {
      data.actions.push(mot.tag)
    })


    ipcRenderer.send('submitForm', JSON.stringify(data))

  })
}