import { Module } from '@nestjs/common'
import { KernelService } from './core/kernel/services'
import { CoreModule } from '@core/core.module'
import { AppsModule } from '@apps/apps.module'

const MODULES = [CoreModule, AppsModule]

@Module({
  imports: [...MODULES],
  controllers: [],
  providers: [KernelService],
  exports: [KernelService, ...MODULES]
})
export class KernelModule {}
