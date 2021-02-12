import path from 'path'

import { getStackData, Scripts, installStackDependencies } from '@lib/stacks'
import { gitInit, getGitRepoInfos } from '@lib/git'
import { makeDir, createFile, createJsonFile } from '@lib/fs'
import { isWriteable, exists } from '@lib/validation'
import { log, logSuccess, logError } from '@lib/log'
import { quit, goTo } from '@lib/process'
import { createTree } from '@lib/tree'
import { getEnvVar } from '@lib/env'

import { App } from './app.def'

export const createApp = async (app: App) => {
  const stack = getStackData(app.stack)

  if (!stack) {
    logError(`Choosen stack '${app.stack}' not found`)
    return quit()
  }

  const appPath = path.resolve(app.name)
  const appName = path.basename(appPath)
  const appDirPath = path.dirname(appPath)

  // Verify if current directory is writeable
  if (!(await isWriteable(appDirPath))) {
    logError(
      'The application path is not writable, please check folder permissions and try again.'
    )
    return quit()
  }

  // Verify is app folder already exists
  if (exists(appPath)) {
    logError('The application directory already exists!')
    return quit()
  }

  // Create project folder
  await makeDir(appPath)
  log(`Project directory '${appName}' created!`)

  // Go to project folder
  goTo(appPath)

  // Init git
  if (gitInit()) log('Git repository initialized!')

  // TODO Create git repo
  // if (gitCreateRepo(app.client))
  //   log(`Git repository created on ${getGitClientName(app.client)}!`)

  // Create package.json
  createPackageJson(appPath, app, stack.scripts)
  log(`package.json created!`)

  // README.md
  createReadMe(appPath, app)
  log(`README.md created!`)

  // Create app tree (files & folders)
  if (stack.tree) {
    await createTree(appPath, stack.tree)
    log(`App tree (files & folders) created!`)
  }

  // Install all packages
  await installAppPackages(app)

  // TODO Commit changes
  // gitInitialCommit()

  // Done!
  logSuccess(
    `${stack.name} app '${appName}' was successfully created with Kickstart! ✨`,
    `Run \`cd ${appName} && ${stack.defaultCommand}\` to start working.`
  )
}

const createPackageJson = (root: string, app: App, scripts?: Scripts) => {
  const { description, useUsername, license, client } = app
  const { name, author, url } = getGitRepoInfos(app.name, client, useUsername)

  createJsonFile(root, 'package.json', {
    name,
    version: '0.1.0',
    description,
    author,
    main: 'src/index.ts',
    private: true,
    license,
    scripts: {
      ...(scripts || {})
    },
    keywords: [],
    repository: {
      type: 'git',
      url: url.repo
    },
    bugs: {
      url: url.bugs
    },
    homepage: url.home
  })
}

const createReadMe = (appPath: string, app: App) => {
  createFile(
    appPath,
    'README.md',
    `# App ${app.name}
${app.description}`
  )
  // TODO add command in README.md
}

const installAppPackages = async (app: App) => {
  await installStackDependencies(app.stack)

  for (const template of app.templates)
    await installStackDependencies(`${app.stack}.${template}`)

  for (const addon of app.addons) await installStackDependencies(addon)
}
