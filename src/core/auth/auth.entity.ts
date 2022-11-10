export interface UserEntity {
    id?: string
    _id?: string
    name: string
    lastName: string
    nickname: string
    email: string
    password?: string
    team: string
    lastConnection?: Date
    token?: string
}

export type SignInType = {
    user: string
    pass: string
}

export interface AuthEntity {
    refreshToken: string
    authorizationToken: string
}
