import * as uuid from 'uuid'
import * as HTTPContext from 'express-http-context'

import { NextFunction, Request, Response } from 'express'

class CorrelationIdMiddleware {
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
