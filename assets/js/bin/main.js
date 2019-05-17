/**
 * Packages
 */
const Store = new(require('electron-store'))()
const remote = require('electron').remote
const {
  shell
} = require('electron')
const elWindow = remote.getCurrentWindow()
const ipcRenderer = require('electron').ipcRenderer

if (Store.get('theme') == 'dark') $('head').append('<link id="theme" rel="stylesheet" href="../assets/css/dark-theme.css">')

const prositData = Store.get('autoSave')

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
  // Load index into container
  $('.container').load('index.html', () => {
    M.updateTextFields()
    if (typeof prositData['informations'] != 'undefined') {
      Object.keys(prositData['informations']).forEach((info) => {
        $(`#${info}`).val(prositData['informations'][info])
      })
    }
  })

  // Error displaying
  ipcRenderer.on('error', (e, err) => M.toast({html: err, classes: 'errorToast'}))

  // Successes displaying
  ipcRenderer.on('success', (e, succ) => M.toast({html: succ, classes: 'succToast'}))

  // Navigation
  $('#navLinks li a').click(function (e) {
    e.preventDefault()
    let next = $(this).attr('href')
    let viewTag = $(this).attr('data-view-tag')
    if (next != $('.activeLink a').attr('href')) {
      // Update data
      if ($('form').length == 1) {
        // Saves data into object
        let data = $('form').serializeArray()
        let type = data.shift().value
        data.forEach((item) => {
          prositData[type][item.name] = item.value
          Store.set('autoSave', prositData)
        })
      }

      // Load new page
      $('.container').load(next, () => {

        // Remove events listeners
        ipcRenderer.removeAllListeners('addedTemplate')
        $('#models, #addTemplate, #addT').off()

        // Update fields
        M.updateTextFields()

        // Update Javascript
        switch (viewTag) {
          case 'informations':
            Object.keys(prositData[viewTag]).forEach((info) => {
              $(`#${info}`).val(prositData[viewTag][info])
            })
            break;

          case 'keywords':
            break;

          case 'contraints':
            break;

          case 'problematics':
            break;

          case 'solutions':
            break;

          case 'deliverables':
            break;

          case 'contraints':
            break;

          case 'actionsPlan':
            $('#actionsPlan tbody').sortable({
                cancel: "a,button"
              })
              .on('sortupdate', (e, ui) => {
                let newOrder = []
                $('tbody tr').toArray().forEach((tr) => {
                  newOrder.push($(tr).find('td').first().html())
                })
                prositData[viewTag] = newOrder
                Store.set('autoSave', prositData)
              })
            break;

          case 'settings':
            M.AutoInit()
            Store.get('theme') == 'dark' ? $(".switch").find("input[type=checkbox]").prop('checked', true) : null
            $(".switch").find("input[type=checkbox]").on("change", function () {
              var status = $(this).prop('checked');
              Store.set('theme', status ? 'dark' : 'light')
              status ? $('head').append('<link id="theme" rel="stylesheet" href="../assets/css/dark-theme.css">') : $('#theme').remove()
            })
            $('#addTemplate').click(() => {
              $('#addTemplateModal').modal('open')
              $('#tId').focus()
            })
            $('#addT').click(() => {
              let val = $('#tId').val()
              val != '' ? ipcRenderer.send('addTemplate', val) : null
            })
            for (let i = 0; i < Store.get('templates').length; i++) {
              console.log('i ' + i)
              console.log('tId ' + Store.get('templateId'))
              let active = Store.get('templateId') == i ? true : false
              console.log(active)
              let noDelete = i == 0 ? true : false
              let title = Store.get('templates')[i].name
              let date = Store.get('templates')[i].date
              addItem(active, title, date, noDelete)
            }
            /** ICPRenderer listenings */
            ipcRenderer.on('addedTemplate', (e, d) => {
              $('#addTemplateModal').modal('close')
              $('#tId').val('')
              $('#models .active').removeClass('active')
              addItem(false, d.name, d.date, false)
              $('#models li').last().addClass('active')
            })
            function addItem(active, title, date, noDelete) {
              $('#models').append(`
              <li id="tItem" class="collection-item avatar ${active ? 'active' : ''}" style="border: none">
                <i class="material-icons circle">dashboard</i>
                <span class="title">Modèle <b>${title}</b></span>
                <p>Date d'ajout: <br>${date}</p>
                ${noDelete == false ? '<a id="delItem" class="secondary-content"><i class="material-icons">delete_forever</i></a>' : ''}
              </li>`)
            }
            $('#models').on('click', '#tItem', function(e) {
              if (e.target == $(this).find('i.material-icons')[1]) {
                  let t = Store.get('templates')
                  t.splice($("models li").index(this), 1)
                  Store.set('templates', t)
                  if ($(this).hasClass('active')) {
                    Store.set('templateId', '0')
                    $('#models li').first().addClass('active')
                  }
                  $(this).remove()
              } else {
                $('#models .active').removeClass('active')
                $(this).addClass('active')
                Store.set('templateId', $("#models li").index(this))
              }
            })
            break;

          case 'about':
            $('#dpVer').text(`v${Store.get('version')}`)
            $('#nodeVer').text(process.versions.node)
            $('#chromeVer').text(process.versions.chrome)
            $('#elecVer').text(process.versions.electron)
            break;

          default:
            break;
        }
        // Detect key input
        $('#p_keyw, #p_contraint, #p_problematic, #p_solution, #p_deliverable, #p_action').keyup(function (e) {
          if (e.which == 13) {
            let el = $(this).val()
            el = el[el.length - 1] == ',' ? el.substr(0, el.length - 1) : el
            prositData[viewTag].push(el)
            Store.set('autoSave', prositData)
            addElem(el)
            $(this).val('')
          }
        })
        // Remove item on click
        $('tbody').on('click', '#del', function () {
          modifyOrDelete(this)
        })
        // Modify item on click
        $('tbody').on('click', '#mod', function () {
          modifyOrDelete(this, true)
        })
        /**
         * Functions
         */
        if (viewTag != 'informations' && viewTag != 'settings' && viewTag != 'about') {
          typeof prositData[viewTag] != 'undefined' ? prositData[viewTag].forEach((elem) => addElem(elem)) : null
        }
        
        function addElem(e) {
          $('tbody').append(`<tr><td>${e}</td><td><a id="mod" class="btn-small dp-rose lighten-1" href="#!"><i class="material-icons">edit</i></a> <a id="del" class="btn-small dp-rose darken-1" href="#!"><i class="material-icons">clear</i></a></td></tr>`)
        }

        function removeElem(e) {
          prositData[viewTag].splice(prositData[viewTag].indexOf(e), 1)
        }

        function modifyOrDelete(item, mode = false) {
          let td = $(item).parent()
          let tr = td.parent()
          let text = tr.find("td:first").html()
          mode ? $('#p_keyw, #p_contraint, #p_problematic, #p_solution, #p_deliverable, #p_action').val(text).focus() : null
          removeElem(text)
          tr.remove()
        }
      }).hide().fadeIn()
      // Update UI
      $('.activeLink').removeClass('activeLink')
      $(this.parentElement).addClass('activeLink')
    }
  })

  // Open modal
  $('#generate').click(() => $('#generateModal').modal('open'))
  $('#pdf').click(() => generate('pdf'))
  $('#docx').click(() => generate('docx'))

  function generate(type) {
    $('#generateModal').modal('close')
    ipcRenderer.send('makeProsit', JSON.stringify({
      type: type,
      data: prositData
    }))
  }

})