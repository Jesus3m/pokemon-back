import { convertToUrlQuery } from '@common/utils/urlQueryParams'
import { config } from '@config/index'
import { PokemonAdapter } from '@core/pokemon/repositories/pokemon.adapter'
import axios, { Axios } from 'axios'

export class PokemonApiDatasource implements PokemonAdapter {
    client: Axios
    constructor () {
        this.client = axios.create({
            baseURL: config.POKEAPI.URL
        })
    }

    async get (id: string, query: any): Promise<any | null> {
        const q = convertToUrlQuery(query)
        const data = await this.client.get(`/pokemon/${ id }?${ q }`)
        return await data.data
    }

    async getAll (query: any): Promise<any | null> {
        const q = convertToUrlQuery(query)
        const data = await this.client.get(`/pokemon/${ q }`)
        return await data.data
    }
}
