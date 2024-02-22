import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

import { TypeOrmConfigService } from '@config/typeorm-config.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    forwardRef(() => ConfigModule),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize()
        return dataSource
      }
    })
  ],
  providers: [],
  exports: []
})
export class DatabaseModule {}
