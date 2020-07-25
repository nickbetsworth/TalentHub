const github = require('octonode')
const querystring = require('querystring')
const Promise = require('bluebird')

const client = github.client(process.env.GITHUB_ACCESS_TOKEN)
const ghsearch = client.search()

const encodeParams = params => querystring.stringify(params, '+', ':')

const getUsersMatchingCriteria = async (criteria, page, perPage) => {
  if (!criteria.location) {
    throw new Error('Location criteria must be provided')
  }

  const searchResults = await ghsearch.usersAsync({
    page: page,
    per_page: perPage,
    q: encodeParams(criteria),
    sort: 'followers',
    order: 'desc'
  })
  
  // Map the user search results into actual user objects - this contains more information, such as # followers
  return Promise.all(searchResults[0].items.map(searchResult => {
    return getUser(searchResult.login).then(user => { 
      return getUserRepositories(user.login).then(repos => {
        return {...user, repos: repos}
      });
    })
  }))
}

const getUser = async username => {
  if (!username) {
    throw new Error('username must be provided')
  }

  const result = await client.user(username).infoAsync()
  return result[0]
}

const locateUserEmail = async username => {
  // Todo:
  //  - Repository selection ( filter out forks )
  const repos = await getUserRepositories(username)
  // Todo: ensure the user has at least one repository
  return getEmailFromRepo(repos[0])
}

/**
 * Searches the given repository for the e-mail address of the repository owner.
 * 
 * The e-mail is taken from one of the commits near the creation of the repo.
 */
const getEmailFromRepo = async repo => {
  // Todo: there must be a better way of getting the 'first commit' date than created_at
  const date = new Date(Date.parse(repo.created_at) + 3600 * 24 * 7).toISOString()
  const result = await client.repo(repo.full_name).commitsAsync({
    until: date
  })

  const commits = result[0].reverse();

  for (let commit of commits) {
    const author = commit.commit.committer;
    if (!author.email.endsWith('@users.noreply.github.com')) {
      return author.email;
    }
  }

  throw new Error('Unable to locate e-mail address')
}

const getUserRepositories = async username => {
  if (!username) {
    throw new Error('username must be provided')
  }

  const result = await client.user(username).reposAsync()
  return result[0]
}

const getLimits = () => {
  return client.limitAsync()
}

module.exports = {
  getUsersMatchingCriteria,
  getUser,
  getUserRepositories,
  locateUserEmail,
  getLimits
}