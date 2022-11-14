import { HttpError } from '@common/errors/Base'
import { verifyToken } from '@core/auth/usecases/verifyToken'
import { NextFunction, Request, Response } from 'express'

export const withAuth = async (req: Request, res: Response, next: NextFunction) => {
    // if (!req.headers.authorization) {
    //     throw new HttpError('Authorization token is required')
    // }
    // const verifiedToken = await verifyToken(req.headers.authorization!) as { id: string, lastConnection: Date}
    // if (!verifiedToken?.id) {
    //     throw new HttpError('Token Invalid')
    // }
    next()
}
