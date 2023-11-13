const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const sobreController = require('../controllers/sobreController')
const postController = require('../controllers/postController')

router.get('/', homeController.userMiddleware, homeController.index)

router.get('/user', userController.index)

router.get('/user/login', userController.login)

router.get('/user/register', userController.register)

router.get('/sobre', sobreController.index)

router.get('/posts/add', postController.add)
router.post('/posts/add', postController.addAction)

router.get('/posts/:slug/edit', postController.edit)
router.post('/posts/:slug/edit', postController.editAction)

router.get('/posts/:id', postController.index)

module.exports = router
