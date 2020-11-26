const express = require('express')
var cors = require('cors')
const api = require('./routes/api.js')

const app = express()

app.use(cors())
app.use('/api', api)

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
