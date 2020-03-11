import { DatabaseConnectionFactory } from '../../../src/factories/database-connection-factory'
import { DatabaseConfiguration } from '../../../src/models/configuration/database-configuration'
import { MongoClient } from 'mongodb'

describe('DatabaseConnectionFactory', () => {
  const configuration = {
    url: 'some-url',
    username: 'some-username',
    password: 'some-password'
  } as DatabaseConfiguration

  it('returns an instance of a Mongo client', () => {
    return DatabaseConnectionFactory.getInstance(configuration)
      .should.be.instanceof(MongoClient)
  })
})
