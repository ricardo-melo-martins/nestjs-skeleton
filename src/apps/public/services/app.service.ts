import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { KernelService } from '@core/kernel/services'

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly kernelService: KernelService
  ) {}

  getHello(): object {
    return {
      message: 'Hello World!',
      port: this.configService.get('server.port'),
      kernel_config: this.kernelService.getInitialConfiguration()
    }
  }
}
