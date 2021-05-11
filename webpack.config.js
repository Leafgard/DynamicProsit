const electronConfig = require('./webpack.electron.js')
const reactConfig = require('./webpack.react')

module.exports = [
  electronConfig,
  reactConfig
]
