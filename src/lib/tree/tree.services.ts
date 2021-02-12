import { fsFromObject } from 'fs-from-object'
import { Tree } from './tree.def'

// https://github.com/queckezz/fs-from-object/
export const createTree = async (path: string, tree: Tree) => {
  await fsFromObject(path, tree)
}
