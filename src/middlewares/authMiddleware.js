exports.index = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'você não está logado.')
		return res.redirect('/user/login')
	}
	next()
}

exports.changePassword = (req, res, next) => {
	let password = req.body.password
	let passwordConfirm = req.body['password-confirm']

	if (password !== passwordConfirm) {
		req.flash('error', 'senhas não são iguais')
		return res.redirect('/profile')
	}

	req.user.setPassword(password, async () => {
		await req.user.save()

		req.flash('sucess', 'senha alterada com successo!')
		return res.redirect('/')
	})
}
