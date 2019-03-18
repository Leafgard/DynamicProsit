/**
 * Packages
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { dialog } = require('electron')
const moment = require('moment')
const JSZip = require('jszip')
const Docxtemplater = require('docxtemplater')
const request = require('request')
const Store = new(require('electron-store'))
/**
 * Class Prosit
 */
module.exports = new ( class Prosit {

  /**
   * Prepares prosit generation
   * @param {object} event Data about the event
   * @param {object} data Data received
   */
  make(event, data) {
    data = JSON.parse(data)
    let type = data.type
    let pData = data.data
    /**
     * Wikipedia autocomplete
     */
    if (Store.get('wiki')) {
      let requests = []
      pData.keywords.forEach(key => {
        requests.push(
          new Promise((res, rej) =>
            request(encodeURI(`https://fr.wikipedia.org/api/rest_v1/page/summary/${key}`), (err, resp, body) =>
              res({
                keyword: key,
                definition: resp.statusCode == 200 ? JSON.parse(body).extract : undefined
              })
            )
          )
        )
      })
      Promise.all(requests).then(keywords => {
        this.generate(type, pData, keywords, event)
      }).catch(err => console.error(err))
    } else {
      this.generate(type, pData, event)
    }
  }

  /**
   * Generates prosit according to provided file type
   * @param {string} type Output file type
   * @param {object} data Prosit's data
   * @param {bool} keywords Wikipedia autocomplete switch
   */
  generate(type, data, keywords = false, event) {
    // Document initialisation
    let zip = new JSZip(fs.readFileSync(Store.get('templates')[Store.get('templateId')].path, 'binary'))
    let doc = new Docxtemplater()
    let pInfos = data.informations
    doc.loadZip(zip)

    // Remplaces 'undefined's by empty strings
    doc.setOptions({
      nullGetter: function () {
        return ""
      }
    })

    // Formats table ICO wikipedia autocomplete isn't used
    if (!keywords) {
      keywords = []
      data.keywords.forEach(key => {
        keywords.push({
          keyword: key
        })
      })
    }

    // Adds data to template
    let docDatas = {
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
      contraints: data.contraints,
      problematics: data.problematics,
      solutions: data.solutions,
      deliverables: data.deliverables,
      actions: data.actionsPlan
    }
    doc.setData(docDatas)

    try {
      // Generates document
      doc.render()
    } catch (err) {
      console.error(JSON.stringify({
        message: err.message,
        name: err.name,
        stack: err.stack,
        properties: err.properties,
      }))
    }

    // Saves generated file
    dialog.showSaveDialog({
      title: 'Où souhaitez-vous enregistrer le Prosit ?',
      defaultPath: `${os.homedir}/Prosit.docx`,
      buttonLabel: 'Enregistrer',
      filters: [{
        name: 'Microsoft Word',
        extensions: ['docx']
      }]
    }, (link) => {
      if (link) {
        let buf = doc.getZip().generate({
          type: 'nodebuffer'
        })
        if (Store.get('json')) {
          fs.writeFileSync(link, buf)
          fs.writeFileSync(`${path.dirname(link) + path.sep}Prosit.json`, JSON.stringify(docDatas))
          event.sender.send('success', 'Les fichiers .docx et .json ont été générés !')
        } else {
          fs.writeFileSync(link, buf)
          event.sender.send('success', 'Le fichier .docx à été généré !')
        }
      }
    })
  }

  /**
   * Adds a template
   * @param {object} event Data about the event
   * @param {object} data Template's data
   */
  addTemplate(event, data) {
    dialog.showOpenDialog({
      title: 'Veuillez choisir un template',
      buttonLabel: 'Ajouter',
      filters: [{
        name: 'Microsoft Word',
        extensions: ['docx']
      }]
    }, (link) => {
      if (link) {
        // Ajouter le path avec le nom
        let newTemplatesList = Store.get('templates')
        newTemplatesList.push({
          name: data,
          path: link[0],
          date: moment().format('LLLL')
        })
        Store.set('templates', newTemplatesList)
        console.log(Store.get('templates'))
        console.log(Store.get('templateId'))
        Store.set('templateId', Store.get('templates').length - 1)
        console.log(Store.get('templateId', Store.get('templates').length - 1));
        event.sender.send('addedTemplate', Store.get('templates')[Store.get('templateId')])
        event.sender.send('success', 'Le modèle à été ajouté !')
      }
    })
  }

})