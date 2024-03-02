require('dotenv').config({ path: 'variables.env' })
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', error => console.error(`DEU ERRO: ${error.message}`))

require('./src/models/Posts')
const app = require('./app')

app.set('port', process.env.PORT || 7771)
const server = app.listen(app.get('port'), () => console.log(`\nSERVIDOR RODANDO EM: https://localhost:${app.get('port')}\n`))
