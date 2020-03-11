import { createSandbox } from 'sinon'

import { StreamCorrelationIdDecorator } from '../../../src/lib/stream-correlation-id-decorator'

describe('StreamCorrelationIdDecorator', () => {
  const sandbox = createSandbox()
  const testRecord = { hello: 'world' }

  let stdout: any
  let getContextVariable: any

  let streamCorrelationIdDecorator: StreamCorrelationIdDecorator

  beforeEach(() => {
    stdout = sandbox.stub({
      end: () => true,
      write: () => true
    })

    getContextVariable = sandbox.stub()

    streamCorrelationIdDecorator = new StreamCorrelationIdDecorator(stdout, getContextVariable)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#write', () => {
    it('writes to the decorated stream', () => {
      getContextVariable.returns(undefined)

      streamCorrelationIdDecorator.write(testRecord)

      stdout.write.should.have.been.calledOnceWithExactly('{"hello":"world","correlationId":""}\n')
    })

    it('writes correlationId coming from httpContext to the decorated stream', () => {
      getContextVariable.returns('123')

      streamCorrelationIdDecorator.write(testRecord)

      stdout.write.should.have.been.calledOnceWithExactly('{"hello":"world","correlationId":"123"}\n')
    })

    it('writes the record to the stream if there is an error', () => {
      getContextVariable.throws(Error)

      streamCorrelationIdDecorator.write(testRecord)

      stdout.write.should.have.been.calledOnceWithExactly({ correlationId: '123', hello: 'world' })
    })
  })

  describe('#end', () => {
    it('ends the stream with the object given', () => {
      streamCorrelationIdDecorator.end(testRecord)

      stdout.end.should.have.been.calledOnceWithExactly(testRecord)
    })
  })
})
