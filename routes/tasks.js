const express = require('express')
var router = express.Router()

const db = [{ name: 'tiina' }, { name: 'jack' }]

router.get('/names', (req, res) => {
  res.send(db)
})
module.exports = router
