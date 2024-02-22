import { Global, Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from './logger/logger.module'
import { DatabaseModule } from './database/database.module'

import { KernelService } from './kernel/services'

import serverConfig from '@config/server.config'
import { coreConfig } from '@config/core.config'
import appConfig from '@config/app.config'

const MODULES = [
  ConfigModule.forRoot({
    envFilePath: coreConfig.env.filePath,
    load: [serverConfig, appConfig],
    isGlobal: true
  }),
  LoggerModule,
  DatabaseModule
]

@Global()
@Module({
  imports: [...MODULES],
  exports: [...MODULES, KernelService],
  providers: [KernelService]
})
export class CoreModule {}
