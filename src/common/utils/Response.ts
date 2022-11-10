import { Response } from 'express'

type StatusCode = 'OK'| 'NOT FOUND'
const StatusCodes: {[key : string] : any} = {
    OK: 200,
    'NOT FOUND': 404
}

export class Responser<T> {
    code: number
    data: T
    constructor (data: T, code: StatusCode | number) {
        this.data = data
        this.code = isNaN(code as number) ? Number(StatusCodes[code]) : Number(code)
    }

    send (res: Response) {
        res.status(this.code)
        res.json({ data: this.data, code: this.code })
    }
}
