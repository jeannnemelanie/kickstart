// kill process
export const quit = () => process.exit(1)

// get the current working directory of the node.js process
export const getCurrentDirectory = () => process.cwd()

// change the current working directory
export const goTo = (directory: string) => process.chdir(directory)

// get the arguments passed to the node.js process when run in the command line
export const getArguments = () => process.argv
export const getArgument = (index: number) => getArguments()[index]
