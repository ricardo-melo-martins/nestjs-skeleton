import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request } from 'express'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    const method = request.method
    const url = request.url
    const query = request.query
    const body = request.body

    const logMessage = {
      message: `${method} ${url} REQUEST`,
      query,
      body
    }

    this.logger.log(JSON.stringify(logMessage))

    return next.handle().pipe(tap(() => this.logger.debug(`After... ${Date.now() - now}ms`)))
  }
}
