import {
  REACT_COMMON_PACKAGES,
  REDUX_PACKAGES,
  LOWDB_PACKAGES
} from '@lib/dependencies'
import { REACT_TREE, NEXT_TREE } from '@lib/tree'
import { Stacks, Scripts } from './stacks.def'

const COMMON_SCRIPTS: Scripts = {
  'type-check': 'tsc --noEmit --project tsconfig.json',
  'lint-check': 'eslint src --ext js,jsx,ts,tsx'
}

export const STACKS: Stacks = {
  react: {
    name: 'React',
    dependencies: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-scripts',
      ...REACT_COMMON_PACKAGES.dependencies
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      '@types/react-router-dom',
      ...REACT_COMMON_PACKAGES.devDependencies
    ],
    templates: {
      'with-redux': { ...REDUX_PACKAGES },
      'with-lowdb': { ...LOWDB_PACKAGES }
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test',
      eject: 'react-scripts eject',
      ...COMMON_SCRIPTS
    },
    defaultCommand: 'yarn start',
    tree: REACT_TREE
  },
  nextjs: {
    name: 'NextJS',
    dependencies: [
      'next',
      'react',
      'react-dom',
      ...REACT_COMMON_PACKAGES.dependencies
    ],
    devDependencies: [
      '@types/node',
      '@types/react',
      '@types/react-dom',
      ...REACT_COMMON_PACKAGES.devDependencies
    ],
    templates: {
      'with-redux': {
        ...REDUX_PACKAGES,
        dependencies: ['next-redux-wrapper', ...REDUX_PACKAGES.dependencies]
      },
      'with-lowdb': { ...LOWDB_PACKAGES },
      'with-custom-server': {
        dependencies: ['body-parser', 'chalk', 'cross-env', 'express'],
        devDependencies: [
          '@types/express',
          'ts-node',
          'tsconfig-paths',
          'nodemon'
        ]
      }
    },
    scripts: {
      dev: 'next',
      build: 'next build',
      start: 'next start',
      ...COMMON_SCRIPTS
    },
    defaultCommand: 'yarn dev',
    tree: NEXT_TREE
  }
  // TODO Node stack (with ncc, nodemon, express, ...)
}
