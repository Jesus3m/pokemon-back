import { HttpError } from '@common/errors/Base'
import { config } from '@config/index'
import { verify } from 'jsonwebtoken'

export const verifyToken = async (token: string) => {
    try {
        await verify(token, config.JWT.secret)
    } catch (error) {
        throw new HttpError('Token expired or not valid', 403)
    }
}
