import { Injectable, Optional } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Utility } from '@rmm/utility'
import * as path from 'path'

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
    const env = Utility.system.getProcessEnvOrFail('NODE_ENV')?.trim()
    // determine if environment exists
    if (!Utility.enum.EnvironmentEnum[env.toUpperCase()]) {
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
