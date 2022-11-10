import express, { Application } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import router from '../../api/http/v1'
import { config } from '@config/index'
import { withContext } from '@common/middlewares/contextMiddleware'
import { ErrorMiddleware } from '@common/middlewares/errorMiddleware'
import morgan from 'morgan'
export const intiHttpServer = (): Application => {
    const app = express()

    // Middlewares
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(cors({
        origin: '*'
    }))

    // Set a context into each request
    const contextMiddleware = withContext(request => {
        return {
            tenant: (request.get('origin')?.split('.')[0] || request.hostname.split('.')[0]) || 'pokedb'
        }
    })

    // Static Routes
    const serviceUrl = config.API.SERVICE_URL || `${ config.API.PROTOCOL }://${ config.API.HOSTNAME }:${ config.API.PORT }/api`
    app.use('/api/public', express.static('public'))

    // Swagger documentation
    app.use(
        `/api/v${ config.API.VERSION }/docs`,
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: `${ serviceUrl }/public/swagger.json`
            }
        })
    )

    // Router
    app.use(`/api/v${ config.API.VERSION }`, [contextMiddleware], router)

    // Error Middleware
    app.use(ErrorMiddleware)

    return app
}
