
export type PokemonAdapter = {
    get(id: string, query: any): Promise<any | null>
    getAll(query: any): Promise<any | null>
}
