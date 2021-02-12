import { installDependencies, ADDONS } from '@lib/dependencies'
import { STACKS } from './stacks.constants'

export const getStackData = (stackName: string) => {
  const stack = STACKS[stackName]
  return stack ? stack : undefined
}

export const getStackTemplatesData = (stackName: string) => {
  const stack = getStackData(stackName)
  return stack?.templates
}

export const getStackTemplates = (stackName: string) => {
  const templates = getStackTemplatesData(stackName)
  return templates ? Object.keys(templates) : []
}

export const getStackScripts = (stackName: string) => {
  const stack = getStackData(stackName)
  return stack?.scripts || {}
}

export const installStackDependencies = (name: string) => {
  // stack
  if (STACKS[name]) return installDependencies(STACKS[name], STACKS[name].name)

  // addon
  if (ADDONS[name]) return installDependencies(ADDONS[name], `'${name}' addon`)

  // template
  if (name.includes('.')) {
    const [stack, template] = name.split('.')
    const data = STACKS[stack]?.templates[template]
    if (data) return installDependencies(data, `'${template}' template`)
  }

  return
}
