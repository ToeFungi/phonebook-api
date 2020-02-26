import { MongoClient } from 'mongodb'

import { DatabaseConfiguration } from '../models/configuration/database-configuration'

/**
 * Database Connection Factory handles the generation of connections to a specified database
 */
class DatabaseConnectionFactory {
  /**
   * Get a database instance
   */
  public static getInstance(config: DatabaseConfiguration): Promise<MongoClient> {
    const mongoDB = new MongoClient(`mongodb+srv://${config.url}`, {
      auth: {
        user: config.username,
        password: config.password
      }
    })

    return mongoDB.connect()
  }
}

export { DatabaseConnectionFactory }
