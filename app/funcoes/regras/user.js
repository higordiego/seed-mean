'use strict'
import express  from 'express'
import jwt  	from 'jsonwebtoken'
module.exports = (app)=>{
	const 	User = app.models.user
	,		pass = require('../../middleware/password')
	,		regraUser = {
		autenticar: (req,res)=>{
			User.findOne({
				login: req.body.nome
			},{token: 0}, function(err, user) {
				
				if (err) throw err;

				if (!user) {
					res.json({ success: false, message: '<strong> Ops! </strong> Usuário não encontrado.' });
				} else if (user) {

					if(pass.validate(user.password, req.body.senha)) {
						res.json({ success: false, message: ' <strong> Ops! </strong> Senha incorreta.' });
					} else {
						var token = jwt.sign(user, app.get('superSecret'), {
								expiresIn : 60*40*60
							});	
						User.update({_id: user._id},{$set:{token: token}}).then((us)=>{
							res.json({
								success: true,
								message: 'Token Ativado',
								token: token
							});
						}).catch((err)=>{
							throw err;
						});
						
					};
				};
			});
		},

	}
	return regraUser;
}