import 'module-alias/register'
import moduleAlias from 'module-alias'
import path from 'path'
const root = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? 'dist' : 'src'

moduleAlias.addAliases({
    '@core': path.join(process.cwd(), root, 'core'),
    '@api': path.join(process.cwd(), root, 'api'),
    '@http': path.join(process.cwd(), root, 'api', 'http'),
    '@source': path.join(process.cwd(), root, 'source'),
    '@common': path.join(process.cwd(), root, 'common'),
    '@config': path.join(process.cwd(), root, 'config'),
    '@middlewares': path.join(process.cwd(), root, 'common', 'middlewares'),
    '@error': path.join(process.cwd(), root, 'common', 'error'),
    '@utils': path.join(process.cwd(), root, 'common', 'utils')
})
