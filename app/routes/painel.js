'use strict'
module.exports = (app)=>{
	const painel = app.controllers.painel
	,	  url 	 = '/api/'
	
	app.route(url+ 'painel')
		.get(painel.index)
}