const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let obj = { 
        nome: req.query.nome,
        idade: req.query.idade,
        mostrar: true,
        ingredientes: [
            { nome: 'Arroz', qt: '20g' },
            { nome: 'Macarrão', qt: '100g' }
        ]
    }
    res.render('home', obj)
})

router.get('/user', (req, res) => {
    let nome = req.query.nome
    res.send(`Olá, ${nome}`)
    res.json(req.query)
})

router.get('/sobre', (req, res) => res.send('página sobre'))

router.get('/posts/:id', (req, res) => {
    let id = req.params.id
    res.send(`post: ${id}`)
})

module.exports = router
