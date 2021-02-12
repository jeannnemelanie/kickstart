import { Dependencies, DependenciesList } from './dependencies.def'

export const COMMON_PACKAGES: Dependencies = {
  dependencies: ['circular-dependency-plugin'],
  devDependencies: [
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'prettier',
    'typescript',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser'
  ]
}

export const REACT_COMMON_PACKAGES: Dependencies = {
  dependencies: [...COMMON_PACKAGES.dependencies],
  devDependencies: [
    ...COMMON_PACKAGES.devDependencies,
    'eslint-plugin-immutable',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks'
  ]
}

export const REDUX_PACKAGES: Dependencies = {
  dependencies: [
    'react-redux',
    'redux-persist',
    'normalizr',
    'reselect',
    '@reduxjs/toolkit'
  ],
  devDependencies: ['@types/react-redux']
}

export const LOWDB_PACKAGES: Dependencies = {
  dependencies: ['lowdb', 'shortid'],
  devDependencies: ['@types/lowdb', '@types/shortid']
}

export const ADDONS: DependenciesList = {
  axios: {
    dependencies: ['axios'],
    devDependencies: []
  },
  classnames: {
    dependencies: ['classnames'],
    devDependencies: ['@types/classnames']
  },
  lodash: {
    dependencies: ['lodash'],
    devDependencies: ['@types/lodash']
  },
  'react-icons': {
    dependencies: ['react-icons'],
    devDependencies: []
  },
  'react-jss': {
    dependencies: ['react-jss'],
    devDependencies: []
  },
  querystring: {
    dependencies: ['querystring'],
    devDependencies: []
  }
}
