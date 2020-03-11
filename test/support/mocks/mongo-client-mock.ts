import { SinonSandbox } from 'sinon'

const mongoClientMock = (sandbox: SinonSandbox) => ({
  db: sandbox.stub(),
  find: sandbox.stub(),
  toArray: sandbox.stub(),
  findOne: sandbox.stub(),
  collection: sandbox.stub()
})

export { mongoClientMock }
