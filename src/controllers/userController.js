const flash = require('express-flash')
const User = require('../models/User')

exports.index = (req, res) => {
	let nome = req.query.nome
	res.send(`Olá, ${nome}`)
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

		req.login(result, err => {
			if (err) {
				return req.flash('error', 'Não foi possivel autenticar')
			}

			req.flash('sucess', 'Você foi logado com sucesso')
			res.redirect('/')
		})
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

		req.flash('sucess', 'cadastrado com sucesso')
		res.redirect('/user/login')
	})
}

exports.logout = (req, res) => {
	req.logout(err => {
		if (err) return req.flash('error', 'não foi possivel fazer logout')
		res.redirect('/')
	})
}

exports.profile = (req, res) => res.render('profile')

exports.profileAction = async (req, res) => {
	try {
		let { username, email } = req.body

		await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ username: username, email: email },
			{ new: true, runValidators: true },
		)
	} catch (err) {
		req.flash('error', 'não foi possivel alterar:', err.message)
		return res.redirect('/profile')
	}

	req.flash('success', 'dados alterados com sucesso!')
	res.redirect('/profile')
}
