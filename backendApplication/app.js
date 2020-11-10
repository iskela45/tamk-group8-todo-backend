const express = require('express')
const app = express()
app.use(express.json())
const locations = require('./routes/locations.js')

app.use('/locations', locations)

const server = app.listen(8080, () => {
  console.log(`listening on port ${server.address().port}`)
})
