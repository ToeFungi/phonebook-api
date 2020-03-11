import { SinonSandbox } from 'sinon'

const loggerMock = (sandbox: SinonSandbox) => ({
  info: sandbox.stub(),
  warn: sandbox.stub(),
  debug: sandbox.stub(),
  error: sandbox.stub()
})

export { loggerMock }
