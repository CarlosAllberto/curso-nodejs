const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOption = {
	storage: multer.memoryStorage(),
	fileFilter: (req, file, next) => {
		let allowed = ['image/jpg', 'image/png', 'image/jpeg']
		if (allowed.includes(file.mimetype)) {
			next(null, true)
		} else {
			next({ msg: 'Arquivo não Suportado' }, false)
		}
	},
}

exports.upload = multer(multer).single('photo')

exports.resize = () => {}
