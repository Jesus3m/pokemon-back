import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../errors/Base'

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.code)
        res.json({ error: err.message, code: err.code, stack: err.stack })
        return
    } else if (err instanceof Error) {
        res.status(500)
        res.json({ error: err.message, code: 500 })
        return
    }
    next(err)
}
