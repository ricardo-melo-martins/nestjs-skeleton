import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import serverConfig from '@config/server.config'
import { KernelService } from './kernel/services'
import { LoggerModule } from './logger/logger.module'
import { coreConfig } from '@config/core.config'

const MODULES = [
  ConfigModule.forRoot({
    envFilePath: coreConfig.env.filePath,
    load: [serverConfig]
  }),
  LoggerModule
]

@Global()
@Module({
  imports: [...MODULES],
  exports: [...MODULES, KernelService],
  providers: [KernelService]
})
export class CoreModule {}
