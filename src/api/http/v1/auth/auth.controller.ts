import { Body, Get, Post, Query, Route } from 'tsoa'
import { AuthService } from '@core/auth/auth.service'
import { AuthEntity, SignInType, UserEntity } from '../../../../core/auth/auth.entity'

@Route('auth')
export class AuthController {
    service: AuthService
    constructor (service: AuthService) {
        this.service = service
    }

    @Post('signin')
    async signIn (@Body() body: SignInType): Promise<AuthEntity> {
        const data = await this.service.signIn(body)
        return data
    }

    @Post('register')
    async register (@Body() body: UserEntity): Promise<UserEntity> {
        const data = await this.service.register(body)
        return data
    }

    @Get('user')
    async getUser (@Query('token') token : string): Promise<UserEntity> {
        const data = await this.service.getUser(token)
        return data
    }
}
