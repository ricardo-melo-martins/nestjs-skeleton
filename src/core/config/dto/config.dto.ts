import { IsNumberString, IsString, IsNotEmpty } from 'class-validator'
import { EnvironmentEnum } from '@rmm/utility/enum'

export class ConfigDto {
  @IsNotEmpty()
  @IsString()
  // @isEnum(EnvironmentEnum)
  APP_ENV: EnvironmentEnum

  @IsNotEmpty()
  @IsString()
  SERVER_ADDRESS: string

  @IsNotEmpty()
  @IsNumberString()
  SERVER_PORT: number

  @IsNotEmpty()
  @IsString()
  DATABASE_DEFAULT_TYPE: string

  @IsNotEmpty()
  @IsNumberString()
  DATABASE_DEFAULT_PORT: number

  @IsNotEmpty()
  @IsString()
  DATABASE_DEFAULT_HOST: string

  @IsNotEmpty()
  @IsString()
  DATABASE_DEFAULT_USERNAME: string

  @IsNotEmpty()
  @IsString()
  DATABASE_DEFAULT_PASSWORD: string

  @IsNotEmpty()
  @IsString()
  DATABASE_DEFAULT_DATABASE: string

  @IsNotEmpty()
  DATABASE_DEFAULT_ENTITIES: string
  @IsNotEmpty()
  DATABASE_DEFAULT_SYNC: string | boolean
  @IsNotEmpty()
  DATABASE_DEFAULT_ENTITIES_AUTOLOAD: string | boolean
  @IsNotEmpty()
  DATABASE_LOGGING_ENABLED: string | boolean

  @IsNotEmpty()
  APP_NAME: string
  @IsNotEmpty()
  LOG_CUSTOM_ACTIVE: string
  @IsNotEmpty()
  EXCEPTIONS_CUSTOM_ACTIVE: string
  @IsNotEmpty()
  SWAGGER_ENABLED: string
  @IsNotEmpty()
  SWAGGER_ROUTE_PATH: string
  @IsNotEmpty()
  SWAGGER_TITLE: string
  @IsNotEmpty()
  SWAGGER_DESCRIPTION: string
  @IsNotEmpty()
  SWAGGER_VERSION: string
  @IsNotEmpty()
  SWAGGER_HOST: string
  @IsNotEmpty()
  BASE_PATH_UPLOADS: string
  @IsNotEmpty()
  BASE_PATH_CACHES: string
  @IsNotEmpty()
  BASE_PATH_INDEXES: string
  @IsNotEmpty()
  BASE_PATH_LOCALES: string
  @IsNotEmpty()
  BASE_PATH_LOGS: string
  @IsNotEmpty()
  BASE_PATH_SESSIONS: string
  @IsNotEmpty()
  BASE_PATH_CONFIG: string
}
// NEST_DEBUG: 'true',
// NODE_ENV: 'development',
