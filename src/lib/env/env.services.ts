import { logError } from '@lib/log'

export const getEnvVar = (name: string, log = false) => {
  const value = process.env[name]
  if (!value && log) logError(`${name} variable missing in .env file!`)
  return value
}
