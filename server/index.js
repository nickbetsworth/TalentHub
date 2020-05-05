const express = require('express')
const app = express()
const github = require('./services/github')

//app.get('/users/')

// Get the contact details of a user
//app.get('/contact/')

// Get a list of candidate users that match criteria
app.get('/users', (req, res) => {
  console.log(req.query)
  github.getUsersMatchingCriteria(req.query.location).then(data => {
    res.send(data);
  })
  
});

app.listen(3000, () => console.log(`Listening on port ${3000}`))