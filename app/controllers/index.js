'use strict'
import path from 'path'
module.exports = (app)=>{
	const 	regrasUser = app.funcoes.regras.user
	,	 indexCtrl = {
		
		autenticao: (req,res)=>{
			regrasUser.autenticar(req,res);
		},
		index: (req,res)=> res.sendFile(path.join(__dirname, '../../public/paginas/', 'index.html')),
		teste: (req,res)=> res.json({user: req.decoded})


	};
	return indexCtrl;
}