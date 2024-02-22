import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME,
  doc: {
    enabled: Boolean(process.env.SWAGGER_ENABLED === 'true') || false,
    swagger: {
      routepath: process.env.SWAGGER_ROUTE_PATH || 'api',
      title: process.env.SWAGGER_TITLE || 'API',
      description: process.env.SWAGGER_DESCRIPTION || 'API description',
      version: process.env.SWAGGER_VERSION || '1.0',
      server: [String(process.env.SWAGGER_HOST)]
    }
  },
  server: {
    workingDirectory: process.env.PWD || process.cwd(),
    port: parseInt(process.env.SERVER_PORT || process.env.PORT, 10) || 3000,
    address: process.env.SERVER_ADDRESS || '127.0.0.1'
  },
  database: {
    type: process.env.DATABASE_DEFAULT_TYPE || 'mysql',
    host: process.env.DATABASE_DEFAULT_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_DEFAULT_PORT, 10) || 3306,
    username: process.env.DATABASE_DEFAULT_USERNAME,
    password: process.env.DATABASE_DEFAULT_PASSWORD,
    database: process.env.DATABASE_DEFAULT_DATABASE,
    entities: process.env.DATABASE_DEFAULT_ENTITIES || [],
    synchronize: Boolean(process.env.DATABASE_DEFAULT_SYNC === 'true') || false,
    autoLoadEntities: Boolean(process.env.DATABASE_DEFAULT_ENTITIES_AUTOLOAD === 'true') || false,
    logging: Boolean(process.env.DATABASE_LOGGING_ENABLED === 'true') || false
  },
  log: {
    custom: {
      enabled: Boolean(process.env.LOG_CUSTOM_ENABLED === 'true') || false
    }
  },
  exceptions: {
    custom: {
      enabled: Boolean(process.env.EXCEPTIONS_CUSTOM_ENABLED === 'true') || false
    }
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'jwt__secret',
    expires: Number(process.env.JWT_EXPIRES || 5 * 60 * 1000) // 5 * 60 * 1000 = 5 min
  },
  session: {
    secret: process.env.SESSION_SECRET || 'session__secret',
    expires: Number(process.env.SESSION_EXPIRES || 86400000)
  },
  cors: {
    origin: [String(new RegExp(process.env.CORS_ORIGIN || /\*/))], // frontend
    methods: String(process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'),
    credentials: Boolean(process.env.CORS_CREDENTIALS || true)
  }
}))
