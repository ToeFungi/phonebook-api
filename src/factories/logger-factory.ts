import * as Logger from 'bunyan'
import * as BunyanLoggly from 'bunyan-loggly'

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
    const loggly = new BunyanLoggly({
      token: configuration.logglyToken,
      subdomain: configuration.logglySubdomain
    })

    const options: Logger.LoggerOptions = {
      level: configuration.level as Logger.LogLevel,
      name: configuration.service,
      streams: [
        {
          type: 'raw',
          stream: loggly
        }
      ]
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
