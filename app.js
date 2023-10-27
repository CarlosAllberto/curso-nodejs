const express = require('express')
const mustache = require('mustache-express')
const router = require('./src/routes')
const helpers = require('./helpers')
const errorHandler = require("./src/handles/errorHandler")

const app = express()

app.use((req, res, next) => {
	res.locals.helpers = helpers
	res.locals.teste = '123'
    next()
})

app.use('/', router)
app.use(errorHandler.notFound)

app.use(express.json())

app.engine('mst', mustache(__dirname + '/src/views/partials', '.mst'))
app.set('view engine', 'mst')
app.set('views', __dirname + '/src/views')

module.exports = app
