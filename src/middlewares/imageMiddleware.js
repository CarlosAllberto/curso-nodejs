const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter: (req, file, next) => {
		let allowed = ['image/jpg', 'image/png', 'image/jpeg']

		if (allowed.includes(file.mimetype)) return next(null, true)
		next({ msg: 'Arquivo não Suportado' }, false)
	},
}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async (req, res, next) => {
	if (!req.file) return next()

	let ext = req.file.mimetype.split('/')[1]
    let filename = `${uuid.v4()}.${ext}`
    req.body.photo = filename

    let photo = await jimp.read(req.file.buffer)
    photo.resize(800, jimp.AUTO)
    photo.write(`../../public/media/${filename}`)
    next()
}
