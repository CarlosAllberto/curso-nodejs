const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.index = (req, res) => {
	let id = req.params.id
	res.send(`post: ${id}`)
}

exports.add = (req, res) => res.render('postAdd')

exports.addAction = async (req, res) => {
	// let { title, body } = req.body
	// console.log(req.body)
	let post = new Post({
		title: 'teste2',
		slug: 'pagina-teste',
		body: 'corpo do post',
	})
	await post.save()
	res.redirect('/')
}
