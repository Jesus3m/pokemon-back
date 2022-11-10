import { AuthAdapter } from '../repositories/auth.adapter'
import { User } from '../User'

export const getUserByEmail = (repository: AuthAdapter) => async (email: string): Promise<User | null> => {
    const user = await repository.getBy({ email, nickname: email })
    return user ? new User(user) : null
}
export const getUserByToken = (repository: AuthAdapter) => async (token: string): Promise<User | null> => {
    const user = await repository.getBy({ token })
    return user ? new User(user) : null
}
export const getUserById = (repository: AuthAdapter) => async (id: string): Promise<User | null> => {
    const user = await repository.getById(id)
    return user ? new User(user) : null
}
