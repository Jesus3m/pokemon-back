import { Request, Response, Router } from 'express'
import { PokemonController } from './pokemon.controller'
import { Responser } from '@common/utils/Response'
import { PokemonService } from '@core/pokemon/pokemon.service'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const pokemonController = new PokemonController(new PokemonService())
    const data = await pokemonController.getAll(req.query)
    new Responser(data, data ? 200 : 401).send(res)
})

router.get('/:id', async (req: Request, res: Response) => {
    const pokemonController = new PokemonController(new PokemonService())
    const data = await pokemonController.getBy(req.params.id, req.query)
    new Responser(data, data ? 200 : 404).send(res)
})

export default router
