import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(this.constructor.name)

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus()
      const responseBody = {
        ...exception
      }

      this.logger.error(JSON.stringify(responseBody))

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    } else {
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR

      const responseBody = {
        statusCode: httpStatus,
        message: 'internal server error',
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        method: httpAdapter.getRequestMethod(ctx.getRequest())
      }

      this.logger.error(JSON.stringify(responseBody))

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)

      throw exception
    }
  }
}
