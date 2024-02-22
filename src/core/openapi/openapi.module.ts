import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export interface Options {
  path?: string | undefined
  summary?: string
}

export class OpenApiModule {
  constructor(
    protected app: INestApplication,
    protected readonly logger,
    protected configService: ConfigService
  ) {}

  setApp(app?: INestApplication) {
    this.app = app
  }

  setup(): void {
    try {
      this.logger.debug(
        `Swagger Doc started and listening
          on: ${this.configService.get('app.doc.swagger.server')}/${this.configService.get(
            'app.doc.swagger.routepath'
          )} `
      )

      const config = new DocumentBuilder()
        .setTitle(this.configService.get('app.doc.swagger.title'))
        .setDescription(this.configService.get('app.doc.swagger.description'))
        .setVersion(this.configService.get('app.doc.swagger.version'))
        .build()

      const document = SwaggerModule.createDocument(this.app, config)

      SwaggerModule.setup(this.configService.get('app.doc.swagger.routepath'), this.app, document)
    } catch (error) {
      this.logger.error(JSON.stringify(error))
    }
  }
}
