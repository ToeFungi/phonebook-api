import * as express from 'express'

import { HealthController } from '../controllers/health-controller'
import { ContactsController } from '../controllers/contacts-controller'

/**
 * App Factory creates and initializes and new instance of the application
 */
class AppFactory {
  /**
   * Get a configured application instance
   */
  public static getInstance(contactsController: ContactsController,
                            healthController: HealthController): express.Express {
    const app: express.Express = express()

    app.use('/health', healthController.getRoutes())
    app.use('/contacts', contactsController.getRoutes())

    return app
  }
}

export { AppFactory }
