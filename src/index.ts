import { configuration } from './configuration'
import { AppFactory } from './factories/app-factory'
import { LoggerFactory } from './factories/logger-factory'
import { HealthController } from './controllers/health-controller'
import { ExpressServer } from './services/express-server'
import { DatabaseConnectionFactory } from './factories/database-connection-factory'

const startService = async () => {
  const loggerFactory = new LoggerFactory(configuration.logger)
  const processLogger = loggerFactory.getNamedLogger('phonebook')

  const database = await DatabaseConnectionFactory.getInstance(configuration.db)

  const healthController = new HealthController(database, loggerFactory)

  const app = AppFactory.getInstance(healthController)
  const expressServer = new ExpressServer(app, loggerFactory, configuration.server)

  expressServer.run()
    .catch((error: Error) => processLogger.error('Process error', { message: error.message }))
}

Promise.resolve()
  .then(startService)
  .catch(console.error)
