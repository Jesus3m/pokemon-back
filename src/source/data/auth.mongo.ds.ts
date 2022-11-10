import { FilterQuery, Model } from 'mongoose'
import { MongoConnection } from '@config/connections/mongo'
import { UserEntity } from '@core/auth/auth.entity'
import { UserSchema } from './schemas/mongo/auth.mongo.schema'
import { AuthAdapter } from '@core/auth/repositories/auth.adapter'
import { nanoid } from 'nanoid'

export class AuthMongoDatasource implements AuthAdapter {
    UserModel: Model<UserEntity>
    constructor (tenant: string) {
        this.UserModel = MongoConnection.modelFactory<UserEntity>('User', UserSchema, tenant)!
    }

    async getById (id: string): Promise<UserEntity | null> {
        const user = this.UserModel.findById(id)
        return user
    }

    async getBy (query: FilterQuery<UserEntity>): Promise<UserEntity | null> {
        const user = this.UserModel.findOne({
            $or: Object.entries(query).map(x => ({ [x[0]]: x[1] }))
        })
        return user
    }

    async create (user: UserEntity) {
        const newUser = new this.UserModel({ ...user, _id: nanoid() })
        await newUser.save()
        return newUser
    }

    async update (user: UserEntity): Promise<UserEntity | null> {
        const newUser = await this.UserModel.findByIdAndUpdate(user.id, user)
        return newUser
    }
}
