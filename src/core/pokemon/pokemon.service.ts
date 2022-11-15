import { PokemonApiDatasource } from '@source/data/pokemon.api.ds'
import { PokemonEntity } from './pokemon.entity'
import { PokemonAdapter } from './repositories/pokemon.adapter'

export class PokemonService {
    repository: PokemonAdapter
    constructor () {
        this.repository = new PokemonApiDatasource()
    }

    async getAll (query: any) {
        const data = await this.repository.getAll(query)
        return data as PokemonEntity[]
    }

    async getBy (id: string, query: any) {
        const data = await this.repository.get(id, query)
        return data
    }
}
