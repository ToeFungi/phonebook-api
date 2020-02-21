import * as Logger from 'bunyan'

import { LoggerConfiguration } from '../models/configuration/logger-configuration'

class LoggerFactory {
  protected logger: Logger

  constructor(configuration: LoggerConfiguration) {
    const options: Logger.LoggerOptions = {
      level: configuration.level as Logger.LogLevel,
      name: configuration.service
    }

    this.logger = Logger.createLogger(options)
  }

  public getNamedLogger(loggerName: string): Logger {
    return this.logger.child({ loggerName })
  }
}

export { LoggerFactory }
