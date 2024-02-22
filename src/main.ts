import { NestFactory, HttpAdapterHost } from '@nestjs/core'

import { KernelModule } from './kernel.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { AllExceptionsFilter } from '@core/logger/filters'

const logger = new Logger('main.ts')

async function bootstrap() {
  const app = await NestFactory.create(KernelModule, {
    bufferLogs: true
  })

  const configService = app.get(ConfigService)

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  await app.listen(configService.get('server.port'))

  logger.debug(
    `Server started and listening on: ${configService.get('server.host')}:${configService.get('server.port')}`
  )
}
bootstrap()
