/* eslint-disable no-console */
import 'express-async-errors'
import './config/dotenv'
import './config/module-aliases'
import { MongoConnection } from '@config/connections/mongo'
import { intiHttpServer } from './config/servers/http'
import { config } from '@config/index'

MongoConnection.connect() // Start Mongodb connection

const app = intiHttpServer() // HTTP SERVER

app.listen(config.API.PORT, () => {
    console.log(`Service Listen on port ${ config.API.PORT }`)
})

