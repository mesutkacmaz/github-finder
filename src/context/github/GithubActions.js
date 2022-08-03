import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const res = await github.get(`/search/users?${params}`)
  return res.data.items
}

// Get user & repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}

// Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  const data = await res.json()

  return data
}
