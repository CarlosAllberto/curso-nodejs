const mongoose = require('mongoose')
const slug = require('slug')
mongoose.Promise = global.Promise

const postSchema = new mongoose.Schema({
	photo: String,
	title: {
		type: String,
		trim: true,
		required: true,
	},
	slug: String,
	body: {
		type: String,
		trim: true,
	},
	tags: [String],
})

postSchema.pre('save', async function (next) {
	if (this.isModified('title')) {
		this.slug = slug(this.title, { lower: true })

		let slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')
		let postsWidthSlug = await this.constructor.find({slug:slugRegex})

		if (postsWidthSlug.length > 0) {
			this.slug = `${this.slug}-${postsWidthSlug.length + 1}`
		}
	}

	next()
})

postSchema.statics.getTagsList = function() {
	return this.aggregate([
		{ $unwind: '$tags' },
		{ $group: { _id: '$tags', count: { $sum: 1 } } },
		{ $sort: { count: -1 } }
	])
}

module.exports = mongoose.model('Post', postSchema)
