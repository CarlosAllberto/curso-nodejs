const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.userMiddleware = (req, res, next) => {
	req.userInfo = { name: 'Carlos', id: '22929' }
	next()
}

exports.index = async (req, res) => {
	let response = {
		// pageTitle: 'Titulo de Teste',
		nome: req.query.nome,
		idade: req.query.idade,
		mostrar: true,
		ingredientes: [
			{ nome: 'Arroz', qt: '20g' },
			{ nome: 'Macarrão', qt: '100g' },
		],
		interesses: ['node', 'js', 'css'],
		teste: '<strong>Testando Negrito</strong>',
		userInfo: req.userInfo,
		tag: req.tag
	}

	response.tag = req.query.tag

	let tags = await Post.getTagsList()
	tags.forEach(e => { if (e._id === response.tag) e.class = "selected" })

	response.tags = tags

    response.posts = await Post.find()

	res.render('home', response)
}
