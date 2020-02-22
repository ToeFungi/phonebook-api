import * as Logger from 'bunyan'

import { Router } from 'express'

/**
 * Base controller that handles abstracted logic common to all controllers in the application
 */
abstract class Controller {
  /**
   * Express Router object
   */
  protected router: Router

  /**
   * @constructor
   */
  protected constructor(protected logger: Logger) {
    this.router = Router()
    this.setRoutes()
  }

  /**
   * Set the routes on the router object for the specific controller
   */
  abstract setRoutes(): void

  /**
   * Get the router object for the controller
   */
  public getRoutes(): Router {
    this.logger.debug('Retrieving routes for controller')
    return this.router
  }
}

export { Controller }
