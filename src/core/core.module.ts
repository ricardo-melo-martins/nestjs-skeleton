import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import serverConfig from '@config/server.config'
import { KernelService } from './kernel/services'

const MODULES = [
  ConfigModule.forRoot({
    envFilePath: './config/.env',
    load: [serverConfig]
  })
]

@Global()
@Module({
  imports: [...MODULES],
  exports: [...MODULES, KernelService],
  providers: [KernelService]
})
export class CoreModule {}
