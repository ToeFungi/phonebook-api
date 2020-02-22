import * as Logger from 'bunyan'

import { LoggerConfiguration } from '../models/configuration/logger-configuration'

/**
 * Logger factory produces named logger instance based of an initial application level logger
 */
class LoggerFactory {
  /**
   * Application level logger
   */
  protected logger: Logger

  /**
   * @constructor
   */
  constructor(configuration: LoggerConfiguration) {
    const options: Logger.LoggerOptions = {
      level: configuration.level as Logger.LogLevel,
      name: configuration.service
    }

    this.logger = Logger.createLogger(options)
  }

  /**
   * Get a new named logger based off of the application level logger
   */
  public getNamedLogger(loggerName: string): Logger {
    return this.logger.child({ loggerName })
  }
}

export { LoggerFactory }
