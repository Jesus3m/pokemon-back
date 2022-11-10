import { UserEntity } from '@core/auth/auth.entity'
import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema<UserEntity>({
    _id: String,
    name: String,
    lastName: String,
    nickname: String,
    email: String,
    password: String,
    team: String,
    token: String,
    lastConnection: Date
},
{
    _id: false,
    versionKey: false
})
UserSchema.virtual('id').get(function () {
    return this._id
})

// Ensure virtual fields are serialized.
UserSchema.set('toJSON', {
    virtuals: true
})
