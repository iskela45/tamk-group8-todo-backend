const express = require('express')
const connection = require('../repositories/listsRepository.js')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json({ type: 'application/*+json' }))

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// Get all
router.get('/', async (req, res) => {
  if (req.query.apikey === process.env.apikey) {
    await connection
      .findAll(req.query)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(400).send(err))
  } else {
    res.status(401).send('Apikey is missing or incorrect')
  }
})

// Get by ID
router.get('/:inputid', async (req, res) => {
  const urlId = Number(req.params.inputid)
  if (req.query.apikey === process.env.apikey) {
    await connection
      .findById(urlId, req.query)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(500).send(err))
  } else {
    res.status(401).send('Apikey is missing or incorrect')
  }
})

// Post
router.post('/', bodyParser.json(), async (req, res) => {
  if (req.query.apikey === process.env.apikey) {
    await connection
      .save(req.body)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(400).send(err))
  } else {
    res.status(401).send('Apikey is missing or incorrect')
  }
})

// Delete
router.delete('/:inputid', async (req, res) => {
  const urlId = Number(req.params.inputid, req.query)
  if (req.query.apikey === process.env.apikey) {
    await connection
      .deleteById(urlId)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(400).send(err))
  } else {
    res.status(401).send('Apikey is missing or incorrect')
  }
})

module.exports = router
