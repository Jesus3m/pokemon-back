export class HttpError extends Error {
    code = 500
    constructor (message: string, code = 500) {
        super(message)
        this.code = code
        Error.captureStackTrace(this, this.constructor)
    }
}
