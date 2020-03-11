import * as Logger from 'bunyan'
import * as BunyanLoggly from 'bunyan-loggly'

import { LoggerConfiguration } from '../models/configuration/logger-configuration'
import { StreamCorrelationIdDecorator } from '../lib/stream-correlation-id-decorator'

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
      name: configuration.service,
      streams: [
        {
          type: 'raw',
          stream: this.getRawStream(configuration)
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

  /**
   * Gets a stream used for logging raw output
   */
  private getRawStream(configuration: LoggerConfiguration): NodeJS.WritableStream {
    const loggly = new BunyanLoggly({
      token: configuration.logglyToken,
      subdomain: configuration.logglySubdomain
    }) as NodeJS.WritableStream

    return new StreamCorrelationIdDecorator(loggly, () => {
      return 'some-correlation-id'
    })
  }
}

export { LoggerFactory }
