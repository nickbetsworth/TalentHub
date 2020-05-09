const github = require('octonode')
const querystring = require('querystring')

const client = github.client(process.env.GITHUB_ACCESS_TOKEN)
const ghsearch = client.search()
client.user()

const encodeParams = params => querystring.stringify(params, '+', ':')

const getUsersMatchingCriteria = async criteria => {
  if (!criteria.location) {
    throw new Error('location criteria must be provided')
  }
  
  users = await aggregatePaginatedResults(
    (page, perPage) => ghsearch.usersAsync({
      page: page,
      per_page: perPage,
      q: encodeParams(criteria),
      sort: 'followers',
      order: 'desc'
    }),
    body => body.items
  )

  return Promise.all(users.map(user => getUser(user.login)))
}

const getUser = async username => {
  if (!username) {
    throw new Error('username must be provided')
  }

  result = await client.user(username).infoAsync()
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
  getLimits
}