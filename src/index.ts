import { configuration } from './configuration'
import { AppFactory } from './factories/app-factory'
import { ExpressServer } from './services/express-server'
import { LoggerFactory } from './factories/logger-factory'
import { ContactsService } from './services/contacts-service'
import { HealthController } from './controllers/health-controller'
import { ContactsController } from './controllers/contacts-controller'
import { ContactsRepository } from './repositories/contacts-repository'
import { DatabaseConnectionFactory } from './factories/database-connection-factory'

/**
 * Start the HTTP service
 */
const startService = async () => {
  // Logging
  const loggerFactory = new LoggerFactory(configuration.logger)
  const processLogger = loggerFactory.getNamedLogger('phonebook-api')

  // Database
  const database = await DatabaseConnectionFactory.getInstance(configuration.db)
    .connect()

  // Repositories
  const contactsRepository = new ContactsRepository(database, configuration.db, loggerFactory)

  // Services
  const contactsService = new ContactsService(contactsRepository, loggerFactory)

  // Controllers
  const healthController = new HealthController(database, loggerFactory)
  const contactsController = new ContactsController(contactsService, loggerFactory)

  // Application
  const app = AppFactory.getInstance(contactsController, healthController)
  const expressServer = new ExpressServer(app, loggerFactory, configuration.server)

  expressServer.run()
    .catch((error: Error) => processLogger.error('Process error', { message: error.message }))
}

Promise.resolve()
  .then(startService)
  .catch(console.error)
