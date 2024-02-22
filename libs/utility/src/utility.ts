import { getProcessEnvOrFail } from './system'
import { toBool, toHyphenate, toSlug } from './transform'
import { extractValidationErrorMessages } from './validation'
import { EnvironmentEnum, DirectionOrderEnum } from './enum/index'

/**
 * Utility class
 */
export const Utility = {
  datetime: {},
  number: {},
  string: {},
  system: {
    getProcessEnvOrFail
  },
  text: {},
  transform: {
    toHyphenate: toHyphenate,
    toSlug: toSlug,
    toBool: toBool
  },
  url: {},
  validation: {
    extractValidationErrorMessages
  },
  enum: {
    EnvironmentEnum,
    DirectionOrderEnum
  }
}
