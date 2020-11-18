const express = require('express')
const connection = require('./tasksRepository.js')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json({ type: 'application/*+json' }))

// Get all
router.get('/', async (req, res) => {
  await connection.findAll(req.query)
    .then(results => res.status(200).send(results))
    .catch((err) => res.status(400).send(err))
})

// Get by ID
router.get('/:inputid', async (req, res) => {
  const urlId = Number(req.params.inputid)

  await connection.findById(urlId, req.query)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err))
})

// Post
router.post('/', bodyParser.json(), async (req, res) => {
  await connection.save(req.body)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(400).send(err))
})

// Delete
router.delete('/:inputid', async (req, res) => {
  const urlId = Number(req.params.inputid, req.query)

  await connection.deleteById(urlId)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(400).send(err))
})

module.exports = router
