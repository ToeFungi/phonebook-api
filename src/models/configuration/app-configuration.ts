import { LoggerConfiguration } from './logger-configuration'
import { DatabaseConfiguration } from './database-configuration'
import { ServerConfiguration } from './server-configuration'

interface AppConfiguration {
  db: DatabaseConfiguration
  logger: LoggerConfiguration
  server: ServerConfiguration
}

export { AppConfiguration }
