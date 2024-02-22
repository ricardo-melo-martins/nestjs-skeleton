import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as fse from 'fs-extra'
import * as path from 'path'

// import * as fse from 'fs-extra'
import { glob } from 'glob'
import { ConfigDto } from '../dto/config.dto'
import { validateSync } from 'class-validator'
import { Logger } from '@nestjs/common'
import { extractValidationErrorMessages } from '@rmm/utility/validation'
import { EnvironmentEnum } from '@rmm/utility/enum'

// global todas as configuracoes esperadas pelo sistema
// local sào as configuracoes preenchidas sobrepondo a global

// local.development.dist
// local.production.dist
// local.staging.dist

export const REGEX_CONFIG_FILES = /(?:global|local|(development|production|testing)).(env|ts)/gm
export const REGEX_CONFIG_FILES_ONLY_GLOBAL = /(?:global).(env|ts)/gm
export const REGEX_CONFIG_FILES_ONLY_LOCAL = /(?:local).(env|ts)/gm
export const REGEX_CONFIG_FILES_ONLY_GLOBALD = /(?:global.*(development)).(env|ts)/gm
export const REGEX_CONFIG_FILES_ONLY_DEVELOPMENT = /(?:development).(env|ts)/gm

export function getConfigurationDirectory(projectDirConfig: string = './config'): string {
  return projectDirConfig
}

export async function readDirectory(directoryPath: string): Promise<string[]> {
  const result: string[] = []
  if (fs.statSync(directoryPath).isDirectory()) {
    const files = await glob(`${directoryPath}/**/*.{env,ts}`, { ignore: 'node_modules/**' })
    console.log(files)

    files.forEach((f) => {
      const filePath = path.posix.join(directoryPath, f)
      // if (new RegExp(REGEX_CONFIG_FILES).test(f)) {
      result.push(filePath)
      // }
    })
  }
  return result
}

export function getConfigurationFiles(directoryPath: string): string[] {
  const result: string[] = []
  if (fs.statSync(directoryPath).isDirectory()) {
    fs.readdirSync(directoryPath).forEach((f) => {
      const filePath = path.posix.join(directoryPath, f)
      if (new RegExp(REGEX_CONFIG_FILES).test(f)) {
        result.push(filePath, ...getConfigurationFiles(filePath))
      }
    })
  }
  return result
}

// TODO:
export async function getConfigurationFilesAppsbased(directoryPath: string): Promise<string[]> {
  const result: string[] = []

  if (fs.statSync(directoryPath).isDirectory()) {
    const files = await glob(`${directoryPath}/**/*.{env,ts}`, { ignore: 'node_modules/**' })

    files.forEach((f) => {
      const filePath = path.posix.join(directoryPath, f)
      if (new RegExp(REGEX_CONFIG_FILES).test(f)) {
        result.push(filePath)
      }
    })
  }

  return result
}

export class ConfigFactory {
  private readonly logger = new Logger(this.constructor.name)
  private readonly configuration: ConfigDto
  private readonly nodeEnv: string

  constructor(kernelConfigs: any) {
    const configuration = new ConfigDto()

    this.nodeEnv = kernelConfigs.NODE_ENV

    const localconfig = this.buildConfig(kernelConfigs)

    Object.assign(configuration, {
      ...kernelConfigs,
      ...localconfig
    })

    this.validateConfiguration(configuration)

    this.configuration = configuration
  }

  getConfigObject(): object {
    return this.configuration
  }

  private buildConfig(kernelConfigs: any) {
    this.debug('kernelConfigs', kernelConfigs)

    const configPrepared = this.prepareConfigFiles(kernelConfigs)
    this.debug('configPrepared', configPrepared)

    return configPrepared
  }

  private prepareConfigFiles(kernelConfigs) {
    const configs: object = {}

    const filePath = `${this.nodeEnv}.env`
    Object.assign(configs, { filePath: filePath })

    const configDirectory = getConfigurationDirectory(kernelConfigs.PATH_CONFIG)
    Object.assign(configs, { configDirectory: configDirectory })

    if (fse.pathExistsSync(configDirectory)) {
      const filesConfig = getConfigurationFiles(configDirectory)
      Object.assign(configs, { filesConfig: filesConfig })
    }

    const globalConfig = this.getDotenvConfiguration('config/global.env') //TODO:
    const localConfig = this.getDotenvConfiguration(`config/${filePath}`)

    dotenv.populate(globalConfig, localConfig, { override: true, debug: true })

    return globalConfig
  }

  private debug(...args) {
    if (this.nodeEnv != EnvironmentEnum.PRODUCTION) {
      this.logger.debug(args)
    }
  }

  private getDotenvConfiguration(envFile): Record<string, any> {
    let parsedConfiguration = {}

    if (fs.existsSync(envFile)) {
      parsedConfiguration = dotenv.parse(fs.readFileSync(envFile))
    }

    return parsedConfiguration
  }

  private validateConfiguration(configuration) {
    const validationResult = validateSync(configuration, {
      whitelist: true,
      forbidUnknownValues: true
    })

    if (validationResult && validationResult.length > 0) {
      this.logger.error(
        'Configurations invalid',
        `Validation errors:\n${extractValidationErrorMessages(validationResult)}`
      )
      throw new Error(`Configurations invalid \n${validationResult.toString()}`)
    }
  }
}
