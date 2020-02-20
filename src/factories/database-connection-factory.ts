import { MongoClient } from 'mongodb'

import { DatabaseConfiguration } from '../models/configuration/DatabaseConfiguration'

class DatabaseConnectionFactory {
  public static getInstance(config: DatabaseConfiguration): Promise<MongoClient> {
    const mongoDB = new MongoClient(config.url)
    return mongoDB.connect()
  }
}

export { DatabaseConnectionFactory }
