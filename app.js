const express = require('express')
const mustache = require('mustache-express')
const router = require('./src/routes')
const helpers = require('./helpers')
const errorHandler = require('./src/handles/errorHandler')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./src/models/User')

const app = express()

app.use(cookieParser(process.env.SECRET))
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	}),
)
app.use(flash())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
	res.locals.helpers = helpers
	res.locals.teste = '123'
	res.locals.flashes = req.flash()
	res.locals.user = req.user
	next()
})

app.use('/', router)
app.use(errorHandler.notFound)

app.engine('mst', mustache(__dirname + '/src/views/partials', '.mst'))
app.set('view engine', 'mst')
app.set('views', __dirname + '/src/views')

module.exports = app
