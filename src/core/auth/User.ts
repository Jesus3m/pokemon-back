import { UserEntity } from './auth.entity'
import * as yup from 'yup'
import { HttpError } from '@common/errors/Base'
import { AuthAdapter } from './repositories/auth.adapter'

export class User implements UserEntity {
    readonly id: string | undefined
    name: string = ''
    lastName: string = ''
    nickname: string = ''
    email: string = ''
    password?: string = ''
    team: string = ''
    token: string | undefined = undefined
    lastConnection: Date = new Date()

    constructor (user: UserEntity) {
        this.id = user.id || user._id
        this.name = user.name
        this.lastName = user.lastName
        this.nickname = user.nickname
        this.email = user.email
        this.password = user.password
        this.team = user.team
        this.token = user.token
        this.lastConnection = user.lastConnection || new Date()

        this.validate()
    }

    private validate () {
        try {
            const schema = yup.object().shape({
                name: yup.string().required('name is required'),
                lastName: yup.string().required('lastName is required'),
                nickname: yup.string(),
                email: yup.string().required('email is required'),
                password: yup.string().required('password is required'),
                team: yup.string(),
                lastConnection: yup.date()
            })

            schema.validateSync({
                name: this.name,
                lastName: this.lastName,
                nickname: this.nickname,
                email: this.email,
                password: this.password,
                team: this.team,
                lastConnection: this.lastConnection

            })
            return this
        } catch (error) {
            const _err = error as yup.ValidationError
            throw new HttpError(_err.message, 400)
        }
    }

    get (): UserEntity {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            nickname: this.nickname,
            email: this.email,
            team: this.team,
            lastConnection: this.lastConnection
        }
    }

    save (repository: AuthAdapter) {
        const user = { ...this, pasword: this.password }
        if (!this.id) {
            repository.create(user)
        } else {
            repository.update(user)
        }
        return this
    }
}
