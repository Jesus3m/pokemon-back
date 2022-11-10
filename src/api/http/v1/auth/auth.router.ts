import { Request, Response, Router } from 'express'
import { AuthService } from '@core/auth/auth.service'
import { AuthController } from './auth.controller'
import { Responser } from '@common/utils/Response'

const router = Router()

router.post('/signin', async (req: Request, res: Response) => {
    const authController = new AuthController(new AuthService(req.context))
    const data = await authController.signIn(req.body)
    new Responser(data, data ? 200 : 401).send(res)
})

router.post('/register', async (req: Request, res: Response) => {
    const authController = new AuthController(new AuthService(req.context))
    const data = await authController.register(req.body)
    new Responser(data, data ? 200 : 404).send(res)
})

router.get('/user', async (req: Request, res: Response) => {
    const authController = new AuthController(new AuthService(req.context))
    const data = await authController.getUser(req.query.token as string)
    new Responser(data, data ? 200 : 404).send(res)
})
export default router
