const express = require('express')

const router = express.Router()
router.get('/', res => res.send('página inicial'))
router.get('/sobre', res => res.send('página sobre'))

module.exports = router
