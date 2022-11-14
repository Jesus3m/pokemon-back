import * as yup from 'yup'
import { HttpError } from '@common/errors/Base'
import { PokemonEntity } from './pokemon.entity'

export class Pokemon implements PokemonEntity {
    readonly id: string | undefined
    name: string = ''
    lastName: string = ''
    nickname: string = ''
    email: string = ''
    password?: string = ''
    team: string = ''
    token: string | undefined = undefined
    lastConnection: Date = new Date()

    constructor (pokemon: PokemonEntity) {
        this.id = pokemon.id || pokemon._id
        this.name = pokemon.name
        this.lastName = pokemon.lastName
        this.nickname = pokemon.nickname
        this.email = pokemon.email
        this.password = pokemon.password
        this.team = pokemon.team
        this.token = pokemon.token
        this.lastConnection = pokemon.lastConnection || new Date()

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

    get (): PokemonEntity {
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
}
