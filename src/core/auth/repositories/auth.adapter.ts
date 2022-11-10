import { FilterQuery } from 'mongoose'
import { UserEntity } from '../auth.entity'

export type AuthAdapter = {
    getById(id: string): Promise<UserEntity | null>
    getBy(query: FilterQuery<UserEntity>): Promise<UserEntity | null>
    create(user: UserEntity): Promise<UserEntity>
    update(user: UserEntity): Promise<UserEntity | null>
}
