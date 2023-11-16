const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const slug = require('slug')

exports.index = async (req, res) => {
	let post = await Post.findOne({ slug: req.params.slug })
	res.render('postView', { post })
}

exports.add = (req, res) => res.render('postAdd')

exports.addAction = async (req, res) => {
	req.body.tags = req.body.tags.split(',').map(tag => tag.trim())
	let post = new Post(req.body)

	try {
		await post.save()
	} catch (err) {
		req.flash('error', `Error: ${err.message}`)
		return res.redirect('/posts/add')
	}

	req.flash('sucess', 'Post salvo com sucesso!/')
	res.redirect('/')
}

exports.edit = async (req, res) => {
	let post = await Post.findOne({ slug: req.params.slug })
	res.render('postEdit', { post })
}

exports.editAction = async (req, res) => {
	req.body.slug = slug(req.body.title, { lower: true })
	req.body.tags = req.body.tags.split(',').map(tag => tag.trim())

	try {
		await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, {
			new: true,
			runValidators: true,
		})
	} catch (err) {
		req.flash('error', `Error: ${err.message}`)
		return res.redirect(`/posts/${req.params.slug}/edit`)
	}

	req.flash('sucess', 'Post atualizado com sucesso!')
	res.redirect('/')
}
