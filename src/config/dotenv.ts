import dotenv from 'dotenv'
import path from 'path'

if ((process.env.NODE_ENV !== 'production') && (process.env.NODE_ENV !== 'staging')) {
    dotenv.config({
        path: path.join(process.cwd(), `.env.${ process.env.NODE_ENV || 'development' }`)
    })
}
