exports.defaultPageTitle = 'Site ABC'

exports.menu = [
	{ nome: 'Home', slug: '/' , guest: true, logged: true},
	{ nome: 'Adicionar Post', slug: '/posts/add', guest: false, logged: true },
	{ nome: 'Sobre', slug: '/sobre', guest: true, logged: true },
	{ nome: 'Contato', slug: '/contato', guest: true, logged: true },
	{ nome: 'Fale conosco', slug: '/fale-conosco', guest: true, logged: true },
	{ nome: 'Login', slug: '/user/login', guest: true, logged: false },
	{ nome: 'Cadastro', slug: '/user/register', guest: true, logged: false },
	{ nome: 'Sair', slug: '/user/logout', guest: false, logged: true },
]
