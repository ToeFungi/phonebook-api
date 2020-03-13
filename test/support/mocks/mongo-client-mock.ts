import { SinonSandbox } from 'sinon'

const mongoClientMock = (sandbox: SinonSandbox) => ({
  db: sandbox.stub(),
  find: sandbox.stub(),
  toArray: sandbox.stub(),
  findOne: sandbox.stub(),
  insertOne: sandbox.stub(),
  collection: sandbox.stub(),
  isConnected: sandbox.stub()
})

export { mongoClientMock }
