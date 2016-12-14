'use strict'
module.exports = (app)=>{

	const mongoose = require('mongoose')
	,	Schema = mongoose.Schema
	,	pass = require('../middleware/password');

	function configPass (v) {
		return pass.hash(v);
	}

	const usuario = new Schema(
		{
			nome: 		{ type: String, required: true},
			
			login: 		{ type: String, required: true, unique: true},
			
			email: 		{ type: String},
			
			password: 	{ type: String, required: true, set: configPass},
			
			tipo: 		{type: Number, default: 0 },
		
			token: 		{type: String},
			
			created_at: { type: Date, default: Date.now },
			
			updated_at: { type: Date, default: Date.now },
			
			status: 	{ type: Boolean, default: false}
			
		}
	);

	
	usuario.set('redisCache', true);
	usuario.set('expires', 30);
	// Adicionando Index
	usuario.index({token: 1, login: 1});

	return mongoose.model('Usuario', usuario);
	
}
