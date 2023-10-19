const app = require('./app')
const dotenv = require('dotenv').config({ path: 'variables.env' })

app.set('port', process.env.PORT || 7771)

const server = app.listen(app.get('port'), () => console.log('\nSERVIDOR RODANDO\n'))
