import { NestFactory, HttpAdapterHost } from '@nestjs/core'

import { KernelModule } from './kernel.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { AllExceptionsFilter } from '@core/logger/filters'
import { LoggerService } from '@core/logger/services'

const logger = new Logger('main.ts')

async function bootstrap() {
  const configurationFactory = {
    bufferLogs: true
  }

  const app = await NestFactory.create(KernelModule, configurationFactory)

  const configService = app.get(ConfigService)

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  app.useLogger(LoggerService())

  await app.listen(configService.get('server.port'), configService.get('server.host'))

  logger.debug(
    `Server started and listening on: ${configService.get('server.host')}:${configService.get('server.port')}`
  )
}
bootstrap()
