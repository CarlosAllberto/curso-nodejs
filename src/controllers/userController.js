const User = require('../models/User')

exports.index = (req, res) => {
	let nome = req.query.nome
	res.send(`Olá, ${nome}`)
	res.json(req.query)
}

exports.login = (req, res) => res.render('login')

exports.loginAction = (req, res) => {
	let auth = User.authenticate()
	let { email, password } = req.body

	auth(email, password, (error, result) => {
		if (result === false) {
			req.flash('error', 'Dados invalidos')
			res.redirect('/user/login')
			return
		}

		req.login(result, () => {})

		req.flash('sucess', 'Você foi logado com sucesso')
		res.redirect('/')
	})
}

exports.register = (req, res) => res.render('register')

exports.registerAction = (req, res) => {
	let newUser = new User(req.body)
	let password = req.body.password
	User.register(newUser, password, err => {
		if (err) {
			req.flash('error', 'ocorreu um erro tente mais tarde')
			res.redirect('/user/register')
			return
		}

		req.flash('sucesss', 'cadastrado com sucesso')
		res.redirect('/user/login')
	})
}

exports.logout = (req, res) => {
	req.logout()
	res.redirect('/')
}