import { HttpError } from './Base'

export class Unauthorized extends HttpError {
    constructor () {
        super('Unauthorized', 401)
    }
}
