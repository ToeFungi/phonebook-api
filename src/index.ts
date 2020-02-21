import * as express from 'express'

import { configuration } from './configuration'
import { LoggerFactory } from './factories/logger-factory'
import { HealthController } from './controllers/health-controller'

const loggerFactory = new LoggerFactory(configuration.logger)

const server = express()
const controller = new HealthController(loggerFactory)
controller.setRoutes()

server.use('/health', controller.getRoutes())

server.listen(8080, () => {
  console.log('server running on port 8080')
})
