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
		tag: req.tag,
	}

	console.log(req.user)

	response.tag = req.query.tag
	let postFilter = response.tag != 'undefined' ? { tags: response.tag } : ''

	let tagsPromise = Post.getTagsList()
	let postsPromise = Post.find(postFilter)

	const [tags, posts] = await Promise.all([tagsPromise, postsPromise])

	tags.forEach(e => {
		if (e._id === response.tag) e.class = 'selected'
	})

	response.tags = tags
	response.posts = posts

	res.render('home', response)
}
