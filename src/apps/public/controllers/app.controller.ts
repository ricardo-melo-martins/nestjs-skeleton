import { Controller, Get } from '@nestjs/common'

import { AppService } from '@apps/public/services'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello()
  }
}
