/**
 * Get an environment variable.
 * @param name The name of the environment variable.
 * @param isOptional True if the variable is optional.
 * @returns The value of the variable or "" if it is optional and falsy.
 * @throws `Error` if the variable is falsy and not optional.
 */
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

// TODO:
export const functionName = (fn) => {
  // console.log('**', typeof fn)

  if (Function.prototype.name === undefined) {
    const funcNameRegex = /function\s([^(]{1,})\(/
    const results = funcNameRegex.exec(fn.toString())
    return results && results.length > 1 ? results[1].trim() : ''
  } else if (fn.prototype === undefined) {
    return fn.constructor.name
  } else {
    return fn.prototype.constructor.name
  }
}
