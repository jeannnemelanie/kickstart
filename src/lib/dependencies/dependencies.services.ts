import spawn from 'cross-spawn'
import { log, logTitle } from '@lib/log'
import { Dependencies } from './dependencies.def'

export const installDependencies = async (data: Dependencies, desc: string) => {
  const { dependencies, devDependencies } = data

  if (dependencies.length) {
    logTitle(`Installing ${desc} dependencies...`, dependencies)
    await installPackages(dependencies)
  }

  if (devDependencies.length) {
    logTitle(`Installing ${desc} dev dependencies...`, devDependencies)
    await installPackages(devDependencies, true)
  }
}

export const installPackages = (packages: string[], dev = false) => {
  const args: string[] = ['add'] // '-E'
  if (dev) args.push('-D')

  const child = spawn('yarn', [...args, ...packages], { stdio: 'inherit' })

  return new Promise<void>((resolve, reject) => {
    child.on('close', (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `yarn ${args.join(
              ' '
            )} failed with exit code ${code}. Please check your console.`
          )
        )
        return
      }
      resolve()
    })
  })
}
