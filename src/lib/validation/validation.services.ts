import fs from 'fs'
import validateNpmPackageName from 'validate-npm-package-name'

export const exists = (directory: string) => fs.existsSync(directory)

export const isWriteable = async (directory: string) => {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK)
    return true
  } catch (err) {
    return false
  }
}

const validateFolderLocation = (projectName: string) =>
  exists(`./${projectName}`)
    ? 'Project directory already exists! Try another project name!'
    : true

export const validateProjectName = (projectName: string) => {
  const validation = validateNpmPackageName(projectName)
  const { validForNewPackages, errors, warnings } = validation

  if (!validForNewPackages) {
    const problems = [...(errors || []), ...(warnings || [])]
    return `Invalid project name: ${problems[0]}`
  }

  return validateFolderLocation(projectName)
}
