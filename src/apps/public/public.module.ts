import { Module } from '@nestjs/common'
import { AppController } from './controllers/app.controller'
import { AppService } from './services'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class PublicModule {}
