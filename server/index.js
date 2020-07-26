require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./middleware/errorHandler')

app.use(cors())

const github = require('./services/github')

const PORT = process.env.PORT || 3000

// Get a list of candidate users that match criteria
app.get('/users', (req, res, next) => {
  const criteria = {
    location: req.query.location,
    followers: '>10'
  }

  const page = req.query.page
  const per_page = req.query.per_page || 15
  github.getUsersMatchingCriteria(criteria, page, per_page)
  
  .then(data => {
    res.send(data)
  })
  .catch(error => next(error))
})

app.get('/locateEmail/:username', (req, res, next) => {
  github.locateUserEmail(req.params.username).then(data => {
    res.send(data)
  })
  .catch(error => next(error))
})

app.get('/apiLimits', (req, res, next) => {
  github.getLimits()
  .then(data => {
    res.send(data)
  })
  .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))