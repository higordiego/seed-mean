module.exports = (app) => {
	const crud = app.funcoes.crud.crudUser
  
	const userCtrl = {
		cadastrar: crud.cadastrar,
		default: crud.default,
		listar: crud.listar,
		listarLogin: crud.listarLogin,
		update: crud.update,
		deletar: crud.deletar

	}
	return userCtrl;
}
