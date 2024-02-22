import { LoggerService } from '@nestjs/common'
import * as winston from 'winston'

export function LoggerService(): LoggerService {
  const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [new winston.transports.Console()]
  })

  return new WinstonLoggerService(logger)
}

export class WinstonLoggerService implements LoggerService {
  constructor(private readonly logger: winston.Logger) {}

  public verbose?(message: any, context?: string): any {
    return this.logger.verbose(...this.mapMessage(message, context))
  }

  public debug?(message: any, context?: string): any {
    return this.logger.debug(...this.mapMessage(message, context))
  }

  public log(message: any, context?: string): any {
    return this.logger.info(...this.mapMessage(message, context))
  }

  public warn(message: any, context?: string): any {
    return this.logger.warn(...this.mapMessage(message, context))
  }

  public error(message: any, trace?: string, context?: string): any {
    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message

      return this.logger.error(msg, { context, stack: [trace || message.stack], ...meta })
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message

      return this.logger.error(msg, { context, stack: [trace], ...meta })
    }

    return this.logger.error(message, { context, stack: [trace] })
  }

  private mapMessage(message: any, context?: string): [string, unknown] {
    const { message: msg, ...meta } = 'object' === typeof message ? message : { message }

    return [msg, { context, ...meta }]
  }
}
