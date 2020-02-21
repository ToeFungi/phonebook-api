import { Request, Response } from 'express'

import { Controller } from '../types/controller'
import { LoggerFactory } from '../factories/logger-factory'

class HealthController extends Controller {
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.getNamedLogger('health-controller'))
  }

  public setRoutes(): void {
    this.router.get('/health', this.getHealth.bind(this))
  }

  public getHealth(request: Request, response: Response): Promise<Response> {
    const formatResponse = () => response.json({
      status: 'healthy'
    }).status(200)

    return Promise.resolve()
      .then(formatResponse)
  }
}

export { HealthController }
