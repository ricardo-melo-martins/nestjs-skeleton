import { NestFactory } from '@nestjs/core'

import { KernelModule } from './kernel.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

const logger = new Logger('main.ts')

async function bootstrap() {
  const app = await NestFactory.create(KernelModule, {
    bufferLogs: true
  })

  const configService = app.get(ConfigService)

  await app.listen(configService.get('server.port'))

  logger.debug(
    `Server started and listening on: ${configService.get('server.host')}:${configService.get('server.port')}`
  )
}
bootstrap()
