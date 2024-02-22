import { Module } from '@nestjs/common'
import { PublicModule } from './public/public.module'

const modules = [PublicModule]

@Module({
  imports: [...modules],
  exports: [...modules],
  providers: []
})
export class AppsModule {}
