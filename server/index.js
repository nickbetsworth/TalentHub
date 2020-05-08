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
  github.getUsersMatchingCriteria(req.query.location)
  .then(data => {
    res.send(data)
  })
  .catch(error => next(error))
})

app.get('/user/:name', (req, res, next) => {
  github.getUser(req.params.name)
  .then(data => {
    res.send(data)
  })
  .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))