import { Dependencies, DependenciesList } from '@lib/dependencies'
import { Tree } from '@lib/tree'

export interface Scripts {
  [key: string]: string
}

export interface Stack extends Dependencies {
  name: string
  templates: DependenciesList
  scripts: Scripts
  defaultCommand: string
  tree?: Tree
}

export interface Stacks {
  [key: string]: Stack
}
