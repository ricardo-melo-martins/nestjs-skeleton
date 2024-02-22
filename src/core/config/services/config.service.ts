import { Inject, Injectable } from '@nestjs/common'
import { CONFIG_OPTIONS } from '../constants'
import { ConfigOptions } from '../interfaces'
import { ConfigFactory } from '../factory'
import { ConfigDto } from '../dto/config.dto'
import { KernelService } from '@core/kernel/services'

@Injectable()
export class ConfigService {
  private readonly _configuration

  constructor(
    @Inject('KERNEL_CONFIG') private kernelService: KernelService,
    @Inject(CONFIG_OPTIONS) options: ConfigOptions
  ) {
    try {
      const initialConfig = {}

      Object.assign(initialConfig, {
        ...this.kernelService.getInitialConfiguration(),
        ...options
      })

      const builder = new ConfigFactory(initialConfig)

      this._configuration = builder.getConfigObject()
    } catch (error) {
      console.log(this.constructor.name, error)
      throw new Error('Config file not found')
    }
  }

  public get<K extends keyof ConfigDto>(key: K): ConfigDto[K] {
    if (!this._configuration[key] || this._configuration[key] === 'null') {
      return
    }
    return this._configuration[key]
  }

  public info(params: string) {
    return params.toUpperCase()
  }
}
