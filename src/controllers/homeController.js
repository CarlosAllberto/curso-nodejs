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
	}

    let posts = await Post.find()
    response.posts = posts

	res.render('home', response)
}
