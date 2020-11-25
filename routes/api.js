const express = require('express')
const app = express()

const tasks = require('./tasks.js')
const lists = require('./lists.js')

app.use('/tasks', tasks)
app.use('/lists', lists)

module.exports = app
