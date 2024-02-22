import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import serverConfig from '@config/server.config'
import { KernelService } from './kernel/services'
import { LoggerModule } from './logger/logger.module'

const MODULES = [
  ConfigModule.forRoot({
    envFilePath: './config/.env',
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
