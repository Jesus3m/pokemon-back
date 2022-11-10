import { NextFunction, Request, RequestHandler, Response } from 'express'

export const withContext = (generateContext: (request: Request) => {[key: string]: any}):RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    const context = generateContext(req)
    req.context = context
    next()
}
