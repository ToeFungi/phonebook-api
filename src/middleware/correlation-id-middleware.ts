import * as uuid from 'uuid'
import * as HTTPContext from 'express-http-context'

import { NextFunction, Request, Response } from 'express'

/**
 * Correlation ID middleware component extracts an existing correlation ID, if it exists, from the incoming request, or
 * generates a new correlation ID and attaches it to the request, the response and sets it to the request context
 */
class CorrelationIdMiddleware {
  /**
   * Get the middleware component
   */
  public static getMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const correlationId: string = req.get('correlationId') ?? uuid.v4()

      req.headers['correlationId'] = correlationId
      res.set('correlationId', correlationId)

      HTTPContext.set('correlationId', correlationId)

      next()
    }
  }
}

export { CorrelationIdMiddleware }
