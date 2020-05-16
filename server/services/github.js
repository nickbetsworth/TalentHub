const github = require('octonode')
const querystring = require('querystring')
const Promise = require('bluebird')

const client = github.client(process.env.GITHUB_ACCESS_TOKEN)
const ghsearch = client.search()

const encodeParams = params => querystring.stringify(params, '+', ':')

const getUsersMatchingCriteria = async (criteria, page, perPage) => {
  if (!criteria.location) {
    throw new Error('location criteria must be provided')
  }

  searchResults = await ghsearch.usersAsync({
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

  result = await client.user(username).infoAsync()
  return result[0]
}

const getUserRepositories = async username => {
  if (!username) {
    throw new Error('username must be provided')
  }

  result = await client.user(username).reposAsync();
  return result[0]
}

const getLimits = () => {
  return client.limitAsync()
}

const aggregatePaginatedResults = async (queryFunction, extractorFunction) => {
  const itemsPerPage = 100
  let page = 1

  let items = []

  while (true) {
    result = await queryFunction(page++, itemsPerPage)
    const header = result[1]
    const body = result[0]

    items = items.concat(extractorFunction(body))

    if (header.link && !header.link.includes('rel="next"')) {
      break
    }
  }
  return items
}

module.exports = {
  getUsersMatchingCriteria,
  getUser,
  getUserRepositories,
  getLimits
}