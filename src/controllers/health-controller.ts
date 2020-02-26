import { MongoClient } from 'mongodb'
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
  constructor(protected database: MongoClient, loggerFactory: LoggerFactory) {
    super(loggerFactory.getNamedLogger('health-controller'))
  }

  /**
   * @inheritDoc
   */
  public setRoutes(): void {
    this.logger.info('Setting up routes for controller')
    this.router.get('/health', this.getHealth.bind(this))
  }

  /**
   * Determines the current health status of the application and returns an appropriate indicative response
   */
  public getHealth(request: Request, response: Response): Promise<Response> {
    /**
     * Determine if the database is connected
     */
    const determineConnection = (): boolean => this.database.isConnected()

    /**
     * Format the response appropriately
     */
    const formatResponse = (isConnected: boolean): object => ({
      healthController: 'healthy',
      databaseConnection: isConnected ? 'healthy' : 'error'
    })

    /**
     * Send the response back to the client
     */
    const sendResponse = (message: object) => response.json(message)
      .status(200)

    this.logger.info('Received health endpoint request')
    return Promise.resolve()
      .then(determineConnection)
      .then(formatResponse)
      .then(sendResponse)
  }
}

export { HealthController }
