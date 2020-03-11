import * as http from 'http'
import * as Logger from 'bunyan'
import * as express from 'express'

import { Server } from '../types/server'
import { LoggerFactory } from '../factories/logger-factory'
import { ServerConfiguration } from '../models/configuration/server-configuration'

/**
 * Express specific implementation of an HTTP server
 */
class ExpressServer implements Server {
  /**
   * Logger for debugging and info
   */
  private readonly logger: Logger
  /**
   * The port that the server should run on
   */
  private readonly port: string

  /**
   * The HTTP server after initialization
   */
  protected server: http.Server

  /**
   * @constructor
   */
  constructor(protected app: express.Express, loggerFactory: LoggerFactory, configuration: ServerConfiguration) {
    this.logger = loggerFactory.getNamedLogger('express-server')
    this.port = configuration.port
  }

  /**
   * @inheritDoc
   */
  public run(): Promise<void> {
    /**
     * Determine if the instance is already running
     */
    const isRunning = (): void => {
      if (this.server) {
        this.logger.error('Server instance is already running')
        throw new Error('Server instance already running')
      }
    }

    /**
     * Start the server
     */
    const startServer = (): void => {
      this.server = this.app.listen(this.port, () => {
        this.logger.info(`Server available on port ${ this.port }`)
      })
    }

    this.logger.info('Attempting to start server')
    return Promise.resolve()
      .then(isRunning)
      .then(startServer)
  }

  /**
   * @inheritDoc
   */
  public shutdown(): Promise<void> {
    /**
     * Stop the server
     */
    const stopServer = () => {
      if (!this.server) {
        return this.logger.info('Server stopped successfully')
      }

      this.server.close((error: Error) => {
        if (error) {
          this.logger.error('Error occurred while stopping the server', { message: error.message })
          throw error
        }

        return this.logger.info('Server stopped successfully')
      })
    }

    this.logger.info('Attempting to stop server')
    return Promise.resolve()
      .then(stopServer)
  }
}

export { ExpressServer }
