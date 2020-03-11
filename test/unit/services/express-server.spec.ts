import { createSandbox } from 'sinon'

import { loggerMock } from '../../support/mocks/logger-mock'
import { expressMock } from '../../support/mocks/express-mock'
import { ExpressServer } from '../../../src/services/express-server'
import { LoggerFactory } from '../../../src/factories/logger-factory'
import { ServerConfiguration } from '../../../src/models/configuration/server-configuration'

describe('ExpressServer', () => {
  const sandbox = createSandbox()
  const logger = loggerMock(sandbox)

  const configuration = {
    port: '0000'
  } as ServerConfiguration

  let app: any
  let loggerFactory: any
  let expressServer: ExpressServer

  beforeEach(() => {
    app = expressMock(sandbox)
    loggerFactory = sandbox.createStubInstance(LoggerFactory)

    loggerFactory.getNamedLogger
      .returns(logger)

    expressServer = new ExpressServer(app, loggerFactory, configuration)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#run', () => {
    it('resolves when the server is initialised', () => {
      return expressServer.run()
        .should.be.fulfilled
    })

    it('rejects when a server instance is already running', () => {
      expressServer['server'] = app

      return expressServer.run()
        .should.be.rejectedWith(Error, 'Server instance already running')
    })
  })

  describe('#shutdown', () => {
    it('resolves when the server is shutdown correctly', () => {
      expressServer['server'] = app

      return expressServer.shutdown()
        .should.be.fulfilled
    })

    it('resolves when no server is currently running', () => {
      return expressServer.shutdown()
        .should.be.fulfilled
    })
  })
})
