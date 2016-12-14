'use strict'
module.exports = (app)=>{
	const User = app.models.user
	,	  navRegra = {	
		index: (req,res)=>{
			let user = app.models.user;
			user = req.decoded._doc;
			if(user.tipo == 0){
				let menuItems = [
				{
					name: 'Usuários',
					url:  '.user',
				},
				// {
				// 	name:   'Estabelecimentos',
				// 	url:    '.estabelcimento',
				// },
				// {
				// 	name:   'Clientes',
				// 	url:    '.clientes',
				// },
				// {
				// 	name:   'Tabelas de Preço',
				// 	url:    '.preco',
				// },
				// {
				// 	name:   'Lava Jato',
				// 	url:    '.lavajato',
				// },
				// {
				// 	name:   'Convênios',
				// 	url:    '.convenio',
				// },
				// {
				// 	name:   'Mensalidades',
				// 	url:    '.lavajato',
				// }
				];
				res.json(menuItems);
			}
		}
	};
	return navRegra;
}