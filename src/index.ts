#!/usr/bin/env node
import prompts from 'prompts'
import dotenv from 'dotenv'
import path from 'path'

import { createApp, App } from '@lib/app'
import { ADDONS } from '@lib/dependencies'
import { STACKS, getStackTemplates } from '@lib/stacks'
import { validateProjectName } from '@lib/validation'
import { log, logError } from '@lib/log'
import { quit } from '@lib/process'

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})

const run = async () => {
  const answers = await prompts(
    // https://github.com/terkelg/prompts
    [
      {
        type: 'select',
        name: 'stack',
        message: 'Choose your project stack',
        choices: Object.keys(STACKS).map((s) => ({ title: s, value: s }))
      },
      {
        type: (prev: string) =>
          getStackTemplates(prev).length ? 'multiselect' : null,
        name: 'templates',
        message: 'Do you need extra templates configuration ?',
        instructions: false,
        // @ts-ignore
        choices: (prev: string) =>
          getStackTemplates(prev).map((t) => ({ title: t, value: t }))
      },
      {
        type: 'multiselect',
        name: 'addons',
        message: 'Any more addons ?',
        instructions: false,
        choices: Object.keys(ADDONS).map((p) => ({ title: p, value: p }))
      },
      {
        type: 'text',
        name: 'name',
        message: 'What is your project name ?',
        validate: validateProjectName
      },
      {
        type: 'text',
        name: 'description',
        message: 'What is your project description ?'
      },
      {
        type: 'confirm',
        name: 'useUsername',
        message: 'Use username in app name ?'
      },
      {
        type: 'select',
        name: 'client',
        message: 'What client are you using ?',
        instructions: false,
        choices: [
          { title: 'GitHub', value: 'github', selected: true },
          { title: 'GitLab', value: 'gitlab' }
        ]
      },
      {
        type: 'select',
        name: 'license',
        message: 'What license ?',
        instructions: false,
        choices: [
          { title: 'ISC', value: 'ISC', selected: true },
          { title: 'MIT', value: 'MIT' },
          { title: 'UNLICENSED', value: 'UNLICENSED' }
        ]
      }
    ],
    {
      onCancel: () => quit()
    }
  )

  if (typeof answers?.name !== 'string') {
    logError('Please specify the project directory!')
    await run()
    quit()
  }

  await createApp(answers as App)
}

run()
  // .then(() => log('then'))
  .catch(async (reason) => log('catch', reason))
