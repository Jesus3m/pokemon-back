import { HttpError } from '@common/errors/Base'
import { config } from '@config/index'
import { verify } from 'jsonwebtoken'

export const verifyToken = async (token: string) => {
    try {
        const data = await verify(token, config.JWT.secret)
        return data
    } catch (error) {
        console.log(error)
        throw new HttpError('Token expired or not valid', 403)
    }
}
