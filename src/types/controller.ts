import * as Logger from 'bunyan'

import { Router } from 'express'

abstract class Controller {
  protected router: Router

  protected constructor(protected logger: Logger) {
    this.router = Router()
  }

  /**
   * Set the routes for the specific controller
   */
  abstract setRoutes(): void

  /**
   * Get the router for the controller
   */
  public getRoutes(): Router {
    return this.router
  }
}

export { Controller }
