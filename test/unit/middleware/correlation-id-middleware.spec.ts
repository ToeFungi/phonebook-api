import * as uuid from 'uuid'
import * as HTTPContext from 'express-http-context'

import { Response } from 'express'
import { createSandbox } from 'sinon'
import { createRequest, createResponse, MockResponse } from 'node-mocks-http'

import { CorrelationIdMiddleware } from '../../../src/middleware/correlation-id-middleware'

describe('CorrelationIdMiddleware', () => {
  const sandbox = createSandbox()

  const nextFunction = sandbox.spy()
  const response: MockResponse<Response> = createResponse()

  const generatedId = '987-654-321'
  const requestedId = '123-456-789'

  let uuidStub: any
  let httpContextStub: any

  beforeEach(() => {
    uuidStub = sandbox.stub(uuid, 'v4')
    httpContextStub = sandbox.stub(HTTPContext, 'set')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getMiddleware', () => {
    it('sets the correlation ID when it is set on the request', () => {
      const middleware = CorrelationIdMiddleware.getMiddleware()
      const request = createRequest({
        headers: {
          'correlationId': requestedId
        }
      })

      middleware(request, response, nextFunction)

      nextFunction.should.have.been.calledWithExactly()
      request.headers.correlationId.should.deep.equal(requestedId)
      httpContextStub.should.have.been.calledOnceWithExactly('correlationId', requestedId)
    })

    it('sets the correlation ID to a generated ID', () => {
      const middleware = CorrelationIdMiddleware.getMiddleware()
      const request = createRequest()

      uuidStub.returns(generatedId)

      middleware(request, response, nextFunction)

      nextFunction.should.have.been.calledWithExactly()
      request.headers.correlationId.should.deep.equal(generatedId)
      httpContextStub.should.have.been.calledOnceWithExactly('correlationId', generatedId)
    })
  })
})
