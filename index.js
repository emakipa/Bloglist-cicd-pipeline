const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
//import 'core-js/stable/index.js'
//import 'regenerator-runtime/runtime.js'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

//app.listen(config.PORT, () => {
//  logger.info(`Server running on port ${config.PORT}`)
//})