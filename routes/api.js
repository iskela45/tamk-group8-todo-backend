const express = require('express')
const app = express()

const tasks = require('./tasks.js')

app.use('/tasks', tasks)

module.exports = app
