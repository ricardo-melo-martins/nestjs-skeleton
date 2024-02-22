import { Module, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RequestInterceptor } from './interceptors'

import { LogsMiddleware } from './middlewares'
import { WinstonLoggerService } from './services'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor
    },
    WinstonLoggerService
  ],
  exports: [WinstonLoggerService]
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*')
  }
}
