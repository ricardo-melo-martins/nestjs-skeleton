import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RequestInterceptor } from './interceptors'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor
    }
  ]
})
export class LoggerModule {}
