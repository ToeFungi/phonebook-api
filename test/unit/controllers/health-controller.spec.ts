import { createSandbox } from 'sinon'
import { Request, Response } from 'express'
import { MockRequest, MockResponse, createResponse, createRequest } from 'node-mocks-http'

import { loggerMock } from '../../support/mocks/logger-mock'
import { LoggerFactory } from '../../../src/factories/logger-factory'
import { mongoClientMock } from '../../support/mocks/mongo-client-mock'
import { HealthController } from '../../../src/controllers/health-controller'

describe('HealthController', () => {
  const sandbox = createSandbox()
  const logger = loggerMock(sandbox)

  let request: MockRequest<Request>
  let response: MockResponse<Response>

  let database: any
  let loggerFactory: any
  let healthController: HealthController

  beforeEach(() => {
    database = mongoClientMock(sandbox)

    request = createRequest()
    response = createResponse()

    loggerFactory = sandbox.createStubInstance(LoggerFactory)
    loggerFactory.getNamedLogger
      .returns(logger)

    healthController = new HealthController(database, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getHealth', () => {
    it('resolves with appropriate payload and status when all dependencies are healthy', () => {
      const expectedData = {
        databaseConnection: 'healthy',
        healthController: 'healthy'
      }

      database.isConnected
        .onFirstCall()
        .returns(true)

      return healthController.getHealth(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(200)
          response._getJSONData()
            .should.deep.equal(expectedData)
        })
    })

    it('resolves with appropriate payload and status when some dependencies are not healthy', () => {
      const expectedData = {
        databaseConnection: 'error',
        healthController: 'healthy'
      }

      database.isConnected
        .onFirstCall()
        .returns(false)

      return healthController.getHealth(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(200)
          response._getJSONData()
            .should.deep.equal(expectedData)
        })
    })
  })
})
