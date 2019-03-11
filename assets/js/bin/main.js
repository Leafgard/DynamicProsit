// Met à jour l'UI avec les règlages
const settings = require('electron-settings')
const version = "2.2.1"

if (settings.get('theme') == 'dark') {
  $('head').append('<link id="theme" rel="stylesheet" href="../assets/css/dark-theme.css">')
}

const remote = require('electron').remote
const elWindow = remote.getCurrentWindow()
const ipcRenderer = require('electron').ipcRenderer

const prositData = {
  informations: {},
  keywords: [],
  contraints: [],
  problematics: [],
  solutions: [],
  deliverables: [],
  actionsPlan: []
}

$(document).ready(() => {

  // Add triggers for window controls
  $('#minimize').click(() => elWindow.minimize())
  $('#maximize').click(() => {
    if (process.platform != "darwin") {
      elWindow.isMaximized() ? elWindow.unmaximize() : elWindow.maximize()
    } else {
      elWindow.isFullScreen() ? elWindow.setFullScreen(false) : elWindow.setFullScreen(true)
    }
  })
  $('#close').click(() => elWindow.close())

  // Auto-Init MaterializeCSS JS Components
  M.AutoInit()

  // Charge l'index par défaut
  $('.container').load('index.html', () => {
    M.updateTextFields()
  })

  // Navigation entre les pages
  $('#navLinks li a').click(function (e) {
    e.preventDefault()
    let next = $(this).attr('href')
    if (next != $('.activeLink a').attr('href')) {
      // Met à jour les données
      if ($('form').length == 1) {
        // Enregistres les données du formulaire dans le tableau
        let data = $('form').serializeArray()
        let type = data.shift().value
        data.forEach((item) => {
          prositData[type][item.name] = item.value
        })
      }

      // Charge la nouvelle page
      $('.container').load(next, () => {
        // Met à jour les champs de la page
        M.updateTextFields()
        // Met à jour le javascript pour la détection des inputs
        $('#p_keyw, #p_contraint, #p_problematic, #p_solution, #p_deliverable, #p_action').keyup(function (e) {
          if (e.which == 188 || e.which == 13) {
            if ($(this).val() == ',' || $(this).val() == '') {
              $(this).val('')
            } else {
              let el = $(this).val()
              el = el[el.length - 1] == ',' ? el.substr(0, el.length - 1) : el
              prositData[viewModel].push(el)
              addElem(el)
              $(this).val('')
            }
          }
        })
        // Remove item on click
        $('tbody').on('click', '#del', function () {
          let td = $(this).parent()
          let tr = td.parent()
          removeElem(tr.find("td:first").html())
          tr.remove()
        })
        // Modify item on click
        $('tbody').on('click', '#mod', function () {
          let td = $(this).parent()
          let tr = td.parent()
          let text = tr.find("td:first").html()
          $('#p_keyw, #p_contraint, #p_problematic, #p_solution, #p_deliverable, #p_action').val(text).focus()
          removeElem(text)
          tr.remove()
        })
      }).hide().fadeIn()

      // Met à jour le menu visuellement
      $('.activeLink').removeClass('activeLink')
      $(this.parentElement).addClass('activeLink')
    }
  })

  // Ouvre le modal
  $('#generate').click(() => $('#generateModal').modal('open'))

  // Ferme le modal et envoie les données au Main
  $('#pdf').click(() => generate('pdf'))
  $('#docx').click(() => generate('docx'))

  function generate(type) {
    $('#generateModal').modal('close')
    ipcRenderer.send('submit', JSON.stringify({
      type: type,
      data: prositData
    }))
  }

})

function loadModelData() {
  prositData[viewModel].forEach((elem) => addElem(elem))
}

function addElem(e) {
  $('tbody').append(`<tr><td>${e}</td><td><a id="mod" class="btn-small dp-rose lighten-1" href="#!"><i class="material-icons">edit</i></a> <a id="del" class="btn-small dp-rose darken-1" href="#!"><i class="material-icons">clear</i></a></td></tr>`)
}

function removeElem(e) {
  prositData[viewModel].splice(prositData[viewModel].indexOf(e), 1)
}