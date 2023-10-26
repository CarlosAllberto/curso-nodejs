exports.index = (req, res) => {
    let obj = { 
        // pageTitle: 'Titulo de Teste', 
        nome: req.query.nome,
        idade: req.query.idade,
        mostrar: true,
        ingredientes: [
            { nome: 'Arroz', qt: '20g' },
            { nome: 'Macarrão', qt: '100g' }
        ],
        interesses: [ 'node', 'js', 'css' ],
        teste: '<strong>Testando Negrito</strong>'
    }
    res.render('home', obj)
}