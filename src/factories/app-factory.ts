import * as express from 'express'

import { HealthController } from '../controllers/health-controller'

/**
 * App Factory creates and initializes and new instance of the application
 */
class AppFactory {
  /**
   * Get a configured application instance
   */
  public static getInstance(healthController: HealthController): express.Express {
    const app: express.Express = express()

    app.use('/health', healthController.getRoutes())

    return app
  }
}

export { AppFactory }
