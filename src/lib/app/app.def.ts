import { GitClient } from '@lib/git'

export interface App {
  stack: string
  templates: string[]
  addons: string[]
  name: string
  description: string
  useUsername: boolean
  client: GitClient
  license: 'ISC' | 'MIT' | 'UNLICENSED'
}
