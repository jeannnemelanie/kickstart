export type Tree = TreeItem[]

export interface TreeItem {
  name: string
  contents: string | Tree
  mtime?: Date
}
