import { Request, Response } from 'express'

import { Controller } from '../types/controller'

class HealthController extends Controller {
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
