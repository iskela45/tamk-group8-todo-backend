const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const api = require('./routes/api.js')

app.use('/api', api)

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
