import { execSync } from 'child_process'
import { getEnvVar } from '@lib/env'
import packageJson from '../../../package.json'

export type GitClient = 'github' | 'gitlab'

export const isGitHub = (client: GitClient) => client === 'github'
export const isGitLab = (client: GitClient) => client === 'gitlab'

export const getGitClientName = (client: GitClient) => {
  const name = { github: 'GitHub', gitlab: 'GitLab' }
  return name[client]
}

export const getGitRepoInfos = (
  appName: string,
  client: GitClient,
  useUsername: boolean
) => {
  const username = getGitUsername(client, true) || 'username'
  const name = useUsername ? `@${username}/${appName}` : appName
  const author = getAuthor(true)

  const baseUrl = getGitBaseUrl(client)
  const bugsSuffix = getGitBugsUrlSuffix(client)
  const url = `${baseUrl}/${username}/${appName}`

  return {
    name,
    username,
    author,
    url: {
      home: url,
      repo: `${url}.git`,
      bugs: `${url}/${bugsSuffix}`
    }
  }
}

const getAuthor = (log = false) => {
  const AUTHOR_NAME = getEnvVar('AUTHOR_NAME', log)
  const AUTHOR_EMAIL = getEnvVar('AUTHOR_EMAIL', log)

  let author = ''
  if (AUTHOR_NAME) author += AUTHOR_NAME
  if (AUTHOR_EMAIL) author += ` <${AUTHOR_EMAIL}>`

  return author
}

export const getGitUsername = (client: GitClient, log = false) =>
  getEnvVar(`${client.toUpperCase()}_USERNAME`, log)

export const getGitBaseUrl = (client: GitClient) =>
  isGitHub(client) ? 'https://github.com' : 'https://gitlab.com'

export const getGitBugsUrlSuffix = (client: GitClient) =>
  isGitLab(client) ? '-/issues' : 'issues'

export const isInGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch (_) {
    /* ignore */
  }
  return false
}

export const gitInit = () => {
  const branch = getEnvVar('GIT_DEFAULT_BRANCH') || 'develop'

  try {
    execSync('git --version', { stdio: 'ignore' })

    if (isInGitRepository()) {
      return false
    }

    execSync('git init', { stdio: 'ignore' })
    execSync(`git checkout -b ${branch}`, { stdio: 'ignore' })

    return true
  } catch (_) {
    /* ignore */
  }

  return false
}

export const gitCreateRepo = (client: GitClient) => {
  // TODO
}

export const gitInitialCommit = () => {
  try {
    execSync('git add -A', { stdio: 'ignore' })
    execSync(`git commit -m "Initial commit from ${packageJson.name}"`, {
      stdio: 'ignore'
    })
    return true
  } catch (_) {
    /* ignore */
  }

  return false
}
