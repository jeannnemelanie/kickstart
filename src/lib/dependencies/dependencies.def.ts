export interface Dependencies {
  dependencies: string[]
  devDependencies: string[]
}

export interface DependenciesList {
  [key: string]: Dependencies
}
