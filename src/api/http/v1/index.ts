import { withAuth } from '@common/middlewares/authMiddelware'
import { Router } from 'express'
import authRouter from './auth/auth.router'
import pokemonRouter from './pokemon/pokemon.router'
const router = Router()

router.use('/auth', authRouter)
router.use('/pokemon', [withAuth], pokemonRouter)
export default router
