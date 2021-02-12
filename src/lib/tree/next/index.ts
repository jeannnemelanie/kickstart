import { Tree } from '../tree.def'
import { SRC_FOLDERS_TREE, COMMON_TREE } from '../common'

const NEXT_DEF = `/// <reference types="next" />
/// <reference types="next/types/global" />
`

const NEXT_CONFIG = `/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const ALIASES = {
  '@config': 'src/config',
  '@modules': 'src/modules',
  '@pages': 'src/pages',
  '@services': 'src/services',
  '@theme': 'src/theme',
  '@typings': 'src/typings',
  '@ui': 'src/ui',
  '@utils': 'src/utils'
}

module.exports = {
  webpack(config) {
    // Resolve custom apth aliases
    Object.entries(ALIASES).forEach(([alias, pathToResolve]) => {
      config.resolve.alias[alias] = path.join(__dirname, pathToResolve)
    })

    // Detect circular dependencies
    // https://www.npmjs.com/package/circular-dependency-plugin
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /src/,
        failOnError: true, // add errors to webpack instead of warnings
        allowAsyncCycles: false, // allow import cycles that include an asyncronous import
        cwd: process.cwd() // set the current working directory for displaying module paths
      })
    )

    return config
  }
}
`

export const NEXT_TREE: Tree = [
  {
    name: 'src',
    contents: [
      ...SRC_FOLDERS_TREE,
      {
        name: 'next-env.d.ts',
        contents: NEXT_DEF
      }
    ]
  },
  ...COMMON_TREE,
  {
    name: 'next.config.js',
    contents: NEXT_CONFIG
  }
]
