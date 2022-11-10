import { User } from '../User'
import jwt from 'jsonwebtoken'
import { AuthEntity } from '../auth.entity'
import { config } from '@config/index'

export const generateUserCredentials = (user: User): AuthEntity => {
    return {
        authorizationToken: jwt.sign({ id: user.id, lastConnection: user.lastConnection }, config.JWT.secret, {
            expiresIn: config.JWT.expireAuth
        }),
        refreshToken: jwt.sign({ id: user.id }, config.JWT.secret, {
            expiresIn: config.JWT.expireRefresh
        })
    }
}
