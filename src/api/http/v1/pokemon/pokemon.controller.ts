import { Get, Query, Route, Path } from 'tsoa'
import { PokemonService } from '../../../../core/pokemon/pokemon.service'
import { PokemonEntity } from '../../../../core/pokemon/pokemon.entity'

@Route('pokemon')
export class PokemonController {
    service: PokemonService
    constructor (service: PokemonService) {
        this.service = service
    }

    @Get('')
    async getAll (@Query('query') query: any): Promise<PokemonEntity[]> {
        const data = await this.service.getAll(query)
        return data
    }

    @Get(':id')
    async getBy (@Path('id') id: string, @Query('query') query: any): Promise<PokemonEntity> {
        const data = await this.service.getBy(id, query)
        return data
    }
}
