import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { KernelModule } from './kernel.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { AllExceptionsFilter } from '@core/logger/filters'
import { OpenApiModule } from '@core/openapi/openapi.module'
import { LoggerService } from '@core/logger/services'

const logger = new Logger('main.ts')

async function bootstrap() {
  const configurationFactory = {
    bufferLogs: true
  }

  const app = await NestFactory.create(KernelModule, configurationFactory)

  const configService = app.get(ConfigService)

  if (configService.get('app.exceptions.custom.enabled')) {
    const httpAdapter = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  }

  if (configService.get('app.log.custom.enabled')) {
    app.useLogger(LoggerService())
  }

  if (configService.get('app.doc.enabled')) {
    new OpenApiModule(app, logger, configService).setup()
  }

  await app.listen(configService.get('server.port'), configService.get('server.host'))

  logger.debug(
    `Server started and listening on: ${configService.get('server.host')}:${configService.get('server.port')}`
  )
}
bootstrap()
