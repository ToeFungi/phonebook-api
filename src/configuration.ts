require('dotenv')
  .config()

import { AppConfiguration } from './models/configuration/app-configuration'

const configuration: AppConfiguration = {
  db: {
    url: process.env.DATABASE_URL,
    engine: process.env.DATABASE_ENGINE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
    service: process.env.LOGGER_SERVICE
  }
}

export { configuration }
