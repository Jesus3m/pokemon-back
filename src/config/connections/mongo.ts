import mongoose, { Connection, Schema } from 'mongoose'
import { config } from '@config/index'
export class MongoConnection {
    static connection: Connection

    static connect (companyUri?: string) {
        const connectionUri = `mongodb+srv://${ config.MONGODB.USER ? `${ config.MONGODB.USER }:${ config.MONGODB.PASS }@` : '' }${ config.MONGODB.HOST }`
        if (!MongoConnection.connection) {
            const db = mongoose.createConnection(companyUri! || connectionUri, {
                socketTimeoutMS: 22000,
                keepAlive: true,
                maxPoolSize: 10
            })
            MongoConnection.connection = db
        }
        return MongoConnection.connection
    }

    useDB (tenant: string) {
        const conn = MongoConnection.connect()
        if (conn) {
            const db = conn.useDb(`${ tenant }`, { useCache: true })
            return db
        }
    }

    static modelFactory<T> (model: string, schema: Schema, tenant: string) {
        const db = new MongoConnection().useDB(tenant)
        db?.model<T>(model, schema)
        return db?.model<T>(model)
    }
}
