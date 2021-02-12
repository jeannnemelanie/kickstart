import fs from 'fs'
import os from 'os'
import path from 'path'

export const makeDir = (root: string, options = { recursive: true }) =>
  fs.promises.mkdir(root, options)

export const createFile = (root: string, filename: string, content: string) =>
  fs.writeFileSync(path.join(root, filename), content)

export const createJsonFile = (root: string, filename: string, content: any) =>
  createFile(root, filename, JSON.stringify(content, null, 2) + os.EOL)
