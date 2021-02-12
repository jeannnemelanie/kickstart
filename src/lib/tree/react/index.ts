import { Tree } from '../tree.def'
import { SRC_FOLDERS_TREE, COMMON_TREE } from '../common'

const INDEX_HTML = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="React App" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`

const INDEX_TS = `import React from 'react'
import ReactDOM from 'react-dom'

import App from '@modules/app'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
`

export const REACT_TREE: Tree = [
  {
    name: 'public',
    contents: [{ name: 'index.html', contents: INDEX_HTML }]
  },
  {
    name: 'src',
    contents: [
      ...SRC_FOLDERS_TREE,
      {
        name: 'react-app-env.d.ts',
        contents: `/// <reference types="react-scripts" />`
      },
      {
        name: 'index.ts',
        contents: INDEX_TS
      }
    ]
  },
  ...COMMON_TREE
  // TODO add setup webpack with CircularDependencyPlugin + aliases
]
