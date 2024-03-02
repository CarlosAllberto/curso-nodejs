exports.index = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'você não está logado.')
		return res.redirect('/user/login')
	}
	next()
}
