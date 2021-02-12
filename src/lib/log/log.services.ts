import chalk from 'chalk'

export const log = (...data: unknown[]) => {
  console.log('L')
  console.log('L', ...data)
}

export const logTitle = (log: string, ...data: unknown[]) => {
  console.log('LT')
  console.log('LT', chalk.cyan(log))
  if (data) console.log('LT', ...data)
}

export const logSuccess = (log: string, ...data: unknown[]) => {
  console.log('LS')
  console.log('LS', chalk.green(log))
  if (data) console.log('LS', ...data)
}

export const logError = (log: string, ...data: unknown[]) => {
  console.log('LE')
  console.error('LE', chalk.red(log))
  if (data) console.log('LE', ...data)
}
