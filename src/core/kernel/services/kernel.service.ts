import { Injectable, Optional } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as path from 'path'

export enum EnvironmentEnum {
  'LOCAL' = 'local',
  'PRODUCTION' = 'production',
  'DEVELOPMENT' = 'development',
  'STAGING' = 'staging',
  'TESTING' = 'testing'
}

export const getProcessEnvOrFail = (name: string, isOptional = false): string => {
  const value = process.env[name]

  if (!isOptional && !value) {
    try {
      throw new Error(`ERROR: Missing required environment variable '${name}'!`)
    } catch (error) {
      console.error((error as Error).stack)
      process.exit(1)
    }
  }

  return value || ''
}

@Injectable()
export class KernelService {
  constructor(@Optional() private readonly configService: ConfigService) {
    if (ConfigService) {
      try {
        if (this.isValid()) {
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  isValid(): boolean {
    return this.currentEnvironment && this.configService != undefined
  }

  get currentEnvironment(): string {
    const env = getProcessEnvOrFail('NODE_ENV')?.trim()
    // determine if environment exists
    if (!EnvironmentEnum[env.toUpperCase()]) {
      throw new Error(`ERROR: Missing required environment variable '${env}'!`)
    }

    return env
  }

  getInitialConfiguration(): object {
    const pathRoot = path.resolve('.')
    const nodeEnv = this.currentEnvironment

    return {
      PATH_ROOT: pathRoot,
      PATH_SRC: path.join(pathRoot, 'src'),
      PATH_CONFIG: path.join(pathRoot, 'config'),
      NODE_ENV: nodeEnv
    }
  }
}
