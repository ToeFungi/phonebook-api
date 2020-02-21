import { LoggerConfiguration } from './logger-configuration'
import { DatabaseConfiguration } from './database-configuration'

interface AppConfiguration {
  db: DatabaseConfiguration
  logger: LoggerConfiguration
}

export { AppConfiguration }
