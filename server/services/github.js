const github = require('octonode')
const querystring = require('querystring')

const client = github.client()
const ghsearch = client.search()

const encodeParams = params => querystring.stringify(params, '+', ':')

const getUsersMatchingCriteria = (location) => {
  const params = {
    location: location,
    followers: '>5'
  }

  return ghsearch.usersAsync({
    q: encodeParams(params)
  })
}

module.exports = {
  getUsersMatchingCriteria
}