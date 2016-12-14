'use strict'
module.exports = (app)=>{
	const socketCtrl = {
		inserirUser: (res,user)=>{
    		res.io.emit('inserir', {usuario: user});
		},
		alterarUser: (res,user)=>{
			res.io.emit('update', user);
		},
		deletar: (res,user)=>{
			res.io.emit('deletar', user);
		}
	}
	return socketCtrl
}
