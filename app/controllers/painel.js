'use strict'
module.exports = (app)=>{
	const 	Regras 	   = app.funcoes.regras.navBar
	,		painelCtrl = {
		index: (req,res)=> Regras.index(req,res),
	}
	return painelCtrl;
}