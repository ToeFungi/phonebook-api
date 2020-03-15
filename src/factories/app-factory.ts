import * as express from 'express'
import * as helmet from 'helmet'
import * as HTTPContext from 'express-http-context'

import { HealthController } from '../controllers/health-controller'
import { ContactsController } from '../controllers/contacts-controller'
import { CorrelationIdMiddleware } from '../middleware/correlation-id-middleware'

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

    app.use(helmet())
    app.use(HTTPContext.middleware)
    app.use(CorrelationIdMiddleware.getMiddleware())

    app.use('/health', healthController.getRoutes())
    app.use('/contacts', contactsController.getRoutes())

    return app
  }
}

export { AppFactory }
