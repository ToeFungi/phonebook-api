import { EventEmitter } from 'events'

/**
 * Predicate to test if parameter is an object
 *
 * @param obj parameter to test
 * @returns true if parameter is an object
 */
function isObject(obj: any): boolean {
  return typeof (obj) === 'object'
}

/**
 * Decorator for a writeable stream to include correlationId with each record.
 */
class StreamCorrelationIdDecorator extends EventEmitter implements NodeJS.WritableStream {
  writable: boolean = true

  constructor(private stream: NodeJS.WritableStream, private getContextVariable: (param: string) => any) {
    super()
  }

  /**
   * Write the record to the supplied writable stream with the additional `correlationId` if available.
   */
  write(record: any): boolean {
    try {
      const logObject: any = isObject(record) ? record : JSON.parse(record)
      const correlationId: string = this.getContextVariable('correlationId')

      if (correlationId) {
        logObject.correlationId = correlationId
      }

      return this.stream.write(JSON.stringify(logObject) + '\n')
    } catch (_) {
      return this.stream.write(record)
    }
  }

  /**
   * @inheritdoc
   */
  end(record?: any): void {
    return this.stream.end(record)
  }
}

export { StreamCorrelationIdDecorator }
