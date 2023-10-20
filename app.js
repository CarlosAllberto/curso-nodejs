const express = require('express')
const router = require('./routes')
const mustache = require('mustache-express')

const app = express()
app.use('/', router)

app.use(express.json())

app.engine('mst', mustache())
app.set('view engine', 'mst')
app.set('views', __dirname + '/views')

module.exports = app
