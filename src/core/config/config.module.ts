import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from './services'
import { CONFIG_OPTIONS } from './constants'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigModuleOptions } from './interfaces'
import { KernelService } from '@core/kernel/services'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class ConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options
        },
        ConfigService,
        {
          provide: 'KERNEL_CONFIG',
          useClass: KernelService
        }
      ],
      exports: [ConfigService]
    }
  }
}
