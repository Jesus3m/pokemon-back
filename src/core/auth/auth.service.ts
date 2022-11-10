import { HttpError } from '@common/errors/Base'
import { ContextType } from '@common/types/context.types'
import { AuthMongoDatasource } from '@source/data/auth.mongo.ds'
import { compare, genSalt, hash } from 'bcryptjs'
import { AuthEntity, SignInType, UserEntity } from './auth.entity'
import { generateUserCredentials } from './usecases/createUserCredentials'
import { getUserByEmail, getUserByToken } from './usecases/getUser'
import { verifyToken } from './usecases/verifyToken'
import { User } from './User'

export class AuthService {
    constructor (private context: ContextType) {}

    async signIn (user: SignInType): Promise<AuthEntity> {
        const repository = new AuthMongoDatasource(this.context.tenant)

        const userFound = await getUserByEmail(repository)(user.user)
        if (!userFound) {
            throw new HttpError('User not Found', 404)
        }

        // Compare passwords
        const isValidLogin = await compare(user.pass, userFound.password!)

        if (!isValidLogin) {
            throw new HttpError('user cant be logged', 403)
        }

        // Update last connection time
        userFound.lastConnection = new Date()
        const tokens = generateUserCredentials(userFound)

        userFound.token = tokens.refreshToken
        userFound.save(repository)

        return tokens
    }

    async register (user: UserEntity): Promise<UserEntity> {
        const repository = new AuthMongoDatasource(this.context.tenant)
        const userFound = await getUserByEmail(repository)(user.email)

        if (userFound) {
            throw new HttpError('User already exists', 403)
        }
        const newUser = new User(user)

        // Encrypt password
        newUser.password = await hash(newUser.password!, await genSalt(10))
        // Save
        newUser.save(repository)
        return newUser.get()
    }

    async getUser (token: string): Promise<UserEntity> {
        const repository = new AuthMongoDatasource(this.context.tenant)

        await verifyToken(token)

        const userFound = await getUserByToken(repository)(token)
        if (!userFound) {
            throw new HttpError('User not Found', 404)
        }
        return userFound.get()
    }

    async refreshToken (token: string) {
        const repository = new AuthMongoDatasource(this.context.tenant)

        await verifyToken(token)

        const userFound = await getUserByToken(repository)(token)
        if (!userFound) {
            throw new HttpError('User not Found', 404)
        }

        const tokens = generateUserCredentials(userFound)

        userFound.token = tokens.refreshToken
        userFound.save(repository)

        return tokens
    }
}
