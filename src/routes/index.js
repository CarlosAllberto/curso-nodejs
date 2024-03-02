const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const sobreController = require('../controllers/sobreController')
const postController = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')

const imageMiddleware = require('../middlewares/imageMiddleware')

router.get('/', homeController.userMiddleware, homeController.index)

router.get('/user', userController.index)

router.get('/user/login', userController.login)
router.post('/user/login', userController.loginAction)
router.get('/user/logout', userController.logout)

router.get('/user/register', userController.register)
router.post('/user/register', userController.registerAction)

router.get('/sobre', sobreController.index)

router.get('/posts/add', authMiddleware.index, postController.add)

router.post('/posts/add', authMiddleware.index, imageMiddleware.upload, imageMiddleware.resize, postController.addAction)

router.get('/posts/:slug/edit', authMiddleware.index, postController.edit)

router.post('/posts/:slug/edit', authMiddleware.index, postController.editAction)

router.get('/posts/:slug', postController.index)

module.exports = router
