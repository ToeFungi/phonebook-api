import { MongoClient } from 'mongodb'

import { DatabaseConfiguration } from '../models/configuration/database-configuration'

/**
 * Database Connection Factory handles the generation of connections to a specified database
 */
class DatabaseConnectionFactory {
  /**
   * Get a database instance
   */
  public static getInstance(configuration: DatabaseConfiguration): MongoClient {
    const uri = `mongodb+srv://${ configuration.url }`
    const options = {
      auth: {
        user: configuration.username,
        password: configuration.password
      }
    }

    return new MongoClient(uri, options)
  }
}

export { DatabaseConnectionFactory }
