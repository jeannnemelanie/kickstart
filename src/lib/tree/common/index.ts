import { Tree } from '../tree.def'

const ESLINTIGNORE = `node_modules/*
public/*
build/*
dist/*
.babelrc
.eslintrc
.prettierrc
`

const ESLINTRC = `{
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "jsx-a11y",
    "immutable"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    project: "./tsconfig.json"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/ban-ts-ignore": "warn"
  }
}
`

const GITIGNORE = `/build
/coverage
/dist
/node_modules
/out
/.next

.DS_Store
.env
*.log*
`

const PRETTIERRC = `{
  "parser": "typescript",
  "singleQuote": true,
  "semi": false,
  "trailingComma": "none"
}
`

const TSCONFIG = `{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es5", # esnext ?
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "alwaysStrict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx", # preserve ?
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveConstEnums": true,
    "removeComments": true,
    "paths": {
      "@config/*": ["config/*"],
      "@modules/*": ["modules/*"],
      "@pages/*": ["pages/*"],
      "@services/*": ["services/*"],
      "@theme/*": ["theme/*"],
      "@typings/*": ["typings/*"],
      "@ui/*": ["ui/*"],
      "@utils/*": ["utils/*"]
    }
  }
}`

const APP_COMPONENT = `import React, { FC } from 'react'

const App: FC = () => {
  return <div>My App</div>
}

export default App
`

export const SRC_FOLDERS_TREE: Tree = [
  {
    name: 'config',
    contents: [{ name: 'index.ts', contents: `export default {}` }]
  },
  {
    name: 'modules',
    contents: [
      {
        name: 'index.ts',
        contents: `export { default } from './app.component'`
      },
      {
        name: 'app.component.ts',
        contents: APP_COMPONENT
      }
    ]
  },
  { name: 'pages', contents: [] },
  { name: 'services', contents: [] },
  { name: 'theme', contents: [] },
  { name: 'typings', contents: [] },
  { name: 'ui', contents: [] },
  { name: 'utils', contents: [] }
]

export const COMMON_TREE: Tree = [
  {
    name: '.eslintignore',
    contents: ESLINTIGNORE
  },
  {
    name: '.eslintrc',
    contents: ESLINTRC
  },
  {
    name: '.gitignore',
    contents: GITIGNORE
  },
  {
    name: '.prettierignore',
    contents: ''
  },
  {
    name: '.prettierrc',
    contents: PRETTIERRC
  },
  {
    name: 'tsconfig.json',
    contents: TSCONFIG
  }
]
