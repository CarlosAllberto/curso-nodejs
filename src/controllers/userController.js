exports.index = (req, res) => {
	let nome = req.query.nome
	res.send(`Olá, ${nome}`)
	res.json(req.query)
}

exports.login = (req, res) => res.render('login')

exports.register = (req, res) => res.render('register')
