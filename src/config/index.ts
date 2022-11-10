export const config = {
    API: {
        PORT: process.env.PORT || 5000,
        VERSION: process.env.VERSION || 1,
        HOSTNAME: process.env.HOST || 'localhost',
        PROTOCOL: process.env.PROTOCOL || 'http',
        SERVICE_PATH: process.env.SERVICE_PATH || 'company',
        SERVICE_URL: process.env.SERVICE_URL

    },
    MONGODB: {
        PROTOCOL: process.env.MONGODB_PROTOCOl || 'mongodb+srv',
        HOST: process.env.MONGODB_HOST,
        PORT: process.env.MONGODB_PORT,
        USER: process.env.MONGODB_USER,
        PASS: process.env.MONGODB_PASS,
        DATABASE: process.env.MONGODB_DB
    },
    JWT: {
        secret: process.env.JWT_SECRET || 'somesecret',
        expireAuth: process.env.EXPIRE_AUTH_TOKEN || 3600,
        expireRefresh: process.env.EXPIRE_REFRESH_TOKEN || 86400
    }
}
