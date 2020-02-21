import { MongoClient } from 'mongodb'

import { DatabaseConfiguration } from '../models/configuration/database-configuration'

class DatabaseConnectionFactory {
  public static getInstance(config: DatabaseConfiguration): Promise<MongoClient> {
    const uri = `mongodb+srv://${config.username}:${config.password}@${config.url}/test?retryWrites=true&w=majority`

    const mongoDB = new MongoClient(uri)

    // const mongoDB = new MongoClient(config.url, {
    //   auth: {
    //     user: config.username,
    //     password: config.password
    //   }
    // })

    return mongoDB.connect()
  }
}

export { DatabaseConnectionFactory }
