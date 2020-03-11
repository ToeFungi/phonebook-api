import { SinonSandbox } from 'sinon'

const expressMock = (sandbox: SinonSandbox) => ({
  close: sandbox.stub(),
  listen: sandbox.stub()
})

export { expressMock }
