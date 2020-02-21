import { Request, Response } from 'express'

import { Controller } from '../types/controller'
import { LoggerFactory } from '../factories/logger-factory'

/**
 * Health Controller handles requests that determine the health of the overall service
 */
class HealthController extends Controller {
  /**
   * @inheritDoc
   */
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.getNamedLogger('health-controller'))
  }

  /**
   * @inheritDoc
   */
  public setRoutes(): void {
    this.logger.debug('Setting up routes for controller')
    this.router.get('/health', this.getHealth.bind(this))
  }

  public getHealth(request: Request, response: Response): Promise<Response> {
    this.logger.debug('Received health endpoint request')

    const formatResponse = () => response.json({
      status: 'healthy'
    }).status(200)

    return Promise.resolve()
      .then(formatResponse)
  }
}

export { HealthController }
