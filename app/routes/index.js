'use strict'
module.exports = (app)=>{
	const index 	= app.controllers.index;
		
	app.route('/')
		.get(index.index)
		.post(index.autenticao)

	app.route('/api/user')
		.get(index.teste)
	
}