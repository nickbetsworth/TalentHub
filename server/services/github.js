const github = require('octonode')
const querystring = require('querystring')

const client = github.client(process.env.GITHUB_ACCESS_TOKEN)
const ghsearch = client.search()
client.user()

const encodeParams = params => querystring.stringify(params, '+', ':')

const getUsersMatchingCriteria = (location) => {
  if (!location) {
    throw new Error('location must be provided')
  }
  
  const params = {
    location: location,
    followers: '>5'
  }

  return aggregatePaginatedResults(
    (page, perPage) => ghsearch.usersAsync({
      page: page,
      per_page: perPage,
      q: encodeParams(params)
    }),
    body => body.items)
}

const getUser = async username => {
  if (!username) {
    throw new Error('username must be provided')
  }

  result = await client.user(username).infoAsync()
  return result[0]
}

const populateFollowerList = users => {

}

const aggregatePaginatedResults = async (queryFunction, extractorFunction) => {
  const itemsPerPage = 100
  let page = 1

  let items = []

  while (true) {
    console.log(`Gathering data from page ${page}`)
    result = await queryFunction(page++, itemsPerPage)
    console.log(result)
    const header = result[1]
    const body = result[0]

    items = items.concat(extractorFunction(body))

    if (header.link && !header.link.includes('rel="next"')) {
      break
    }
    break
  }

  return items
}

module.exports = {
  getUsersMatchingCriteria,
  getUser
}