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
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
	// author: mongoose.Schema.Types.ObjectId,
})

postSchema.pre('save', async function (next) {
	if (this.isModified('title')) {
		this.slug = slug(this.title, { lower: true })

		let slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')
		let postsWidthSlug = await this.constructor.find({ slug: slugRegex })

		if (postsWidthSlug.length > 0) {
			this.slug = `${this.slug}-${postsWidthSlug.length + 1}`
		}
	}

	next()
})

postSchema.statics.getTagsList = function () {
	return this.aggregate([{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }])
}

// postSchema.statics.getPosts = function (filters = {}) {
// 	return this.find(filters).populate('author')
// 	// return this.aggregate([
// 	// 	{ $match: filters },
// 	// 	{
// 	// 		$lookup: {
// 	// 			from: 'users',
// 	// 			let: { author: '$author' },
// 	// 			pipeline: [{ $match: { $expr: { $eq: ['$$author', '$_id'] } } }, { $limit: 1 }],
// 	// 			as: 'author',
// 	// 		},
// 	// 	},
// 	// 	// {
// 	// 	// 	$addFields: {
// 	// 	// 		author: { $arrayElemAt: ['author', 0] },
// 	// 	// 	},
// 	// 	// },
// 	// ])
// }

module.exports = mongoose.model('Post', postSchema)
