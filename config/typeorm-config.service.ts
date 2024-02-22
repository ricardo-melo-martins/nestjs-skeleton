import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import 'reflect-metadata'
import { DataSourceOptions, getMetadataArgsStorage } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import * as path from 'path'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const pathRootProject = path.resolve(__dirname, '..')
    console.log('pathRootProject', pathRootProject)

    const env = 'local' // process.env.APP_ENV;
    const migrationsRun = true
    const migrationsTableName = 'migrations'

    const migrationFolder =
      env === 'local'
        ? path.join(__dirname, `..${path.sep}${migrationsTableName}`)
        : `${path.sep}${migrationsTableName}`

    const ext = path.extname(__filename)

    const dataSource = {
      type: <any>this.configService.get('DATABASE_DEFAULT_TYPE'),
      host: this.configService.get('DATABASE_DEFAULT_HOST'),
      port: Number(this.configService.get('DATABASE_DEFAULT_PORT')),
      username: this.configService.get('DATABASE_DEFAULT_USERNAME'),
      password: this.configService.get('DATABASE_DEFAULT_PASSWORD'),
      database: this.configService.get('DATABASE_DEFAULT_DATABASE'),
      synchronize: Boolean(this.configService.get('DATABASE_DEFAULT_SYNC')),
      logging: Boolean(this.configService.get('DATABASE_LOGGING_ENABLED')),
      autoLoadEntities: Boolean(this.configService.get('DATABASE_DEFAULT_ENTITIES_AUTOLOAD')),
      entities: [
        `${pathRootProject}/apps/**.entity.{ts,js}`,
        `${pathRootProject}/apps/**/**.entity.{ts,js}`,
        // `**/*.entity${ext}`, // used for typeorm CLI in local development
        ...getMetadataArgsStorage().tables.map((tbl) => tbl.target) // used for proper HMR work
      ],

      migrations: [`${migrationFolder}${path.sep}*${ext}`],
      migrationsTableName: migrationsTableName,
      migrationsRun: migrationsRun,
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: [],
      legacySpatialSupport: false
    } as DataSourceOptions

    return dataSource
  }
}
