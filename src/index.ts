import * as express from 'express'

import { configuration } from './configuration'
import { LoggerFactory } from './factories/logger-factory'
import { HealthController } from './controllers/health-controller'

const server = express()

const loggerFactory = new LoggerFactory(configuration.logger)
const logger = loggerFactory.getNamedLogger('phonebook')

const controller = new HealthController(loggerFactory)
controller.setRoutes()

server.use('/health', controller.getRoutes())

server.listen(configuration.server.port, () => {
  logger.info(`Server available on port ${configuration.server.port}`)
})
