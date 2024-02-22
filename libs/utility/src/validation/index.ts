import { ValidationError } from 'class-validator'

export const extractValidationErrorMessages = (validationErrors: ValidationError[]): string => {
  return validationErrors
    .map(
      (validationError) =>
        `${Object.values(validationError.constraints)
          .map((constraint) => `  * ${constraint}.`)
          .join('\n')}`
    )
    .join('.\n')
}
