require('express-flash')
const { randomBytes } = require('crypto')
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

exports.forget = (req, res) => res.render('forget')

exports.forgetAction = async (req, res) => {
	let user = await User.findOne({ email: req.body.email }).exec()
	if (!user) {
		req.flash('error', 'E-mail não cadastrado')
		return res.redirect('/user/forget')
	}

	user.resetPasswordToken = randomBytes(20).toString('hex')
	user.resetPasswordExpires = Date.now() + 3600000 // 1 hora
	await user.save()

	let resetLink = `http://${req.headers.host}/user/forget/${user.resetPasswordToken}`

	console.log(resetLink)
	res.redirect('/user/login')
}

exports.forgetToken = async (req, res) => {
	let user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	})

	if (!user) {
		req.flash('error', 'Token expirado')
		return res.redirect('/user/forget')
	}

	res.render('forgetPassword')
}

exports.forgetTokenAction = async (req, res) => {
	let user = await User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: { $gt: Date.now() },
	})

	if (!user) {
		req.flash('error', 'Token expirado')
		return res.redirect('/user/forget')
	}

	let password = req.body.password
	let passwordConfirm = req.body['password-confirm']

	if (password !== passwordConfirm) {
		req.flash('error', 'senhas não são iguais')
		return res.redirect('back')
	}

	user.setPassword(password, async () => {
		await user.save()

		req.flash('sucess', 'senha alterada com successo!')
		return res.redirect('/')
	})
}