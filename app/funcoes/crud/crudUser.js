'use strict'
module.exports = (app)=>{
	const User = app.models.user
	,	  Socket = app.socket.userSocket
	,	  CrudCtrl = {

		cadastrar: (req,res)=>{
			let user = new User();
			user.nome = req.body.nome
			user.login = req.body.login
			user.email = req.body.email
			user.password = req.body.senha
			user.tipo 	  = req.body.tipo
			Socket.inserirUser(res,user);
			user.save()

			.then(user =>res.json({msg: true, error: 'Cadastrado com Sucesso!', usuario: user}))
			.catch((err) => res.json({msg: false, error: 'Error em Cadastrar Usuário'}));

		},
		listar: (req,res)=>{
			let recebe = User.find({},{token:0, password:0})
			recebe.lean();
			recebe.exec().then((user)=> res.json(user)).catch((err)=> res.json({msg: err}));
		},
		update: (req,res)=>{
			let user = new User()
			user = req.body;
			let update = {nome: user.nome, status: user.status, tipo: user.tipo};
			Socket.alterarUser(res,user);
			User.update({_id: user._id},update).then((user)=> res.json({msg: true})).catch((err)=> res.json({msg: false}));
		},
		listarLogin: (req,res)=>{
			let recebe = User.findOne({login: req.params.login}, {login:1});
			recebe.lean();
			recebe.exec().then((user)=>{
				!user ? res.json({msg: false}) : res.json({msg:true,error: '<strong> Ops!</strong> Login já existe! '})
			}).catch((err)=>{
				throw err;
			})
		},
		default: (req,res)=>{
			let user = new User();
			user.nome = 'Higor Diego'
			user.login = 'higor'
			user.email =  'higordiegoti@gmail.com'
			user.password = '123'
			user.tipo 	  = 0
			user.save()
			.then(user => res.json(user))
			.catch(err => res.json(err));
		},
		autenticar: (req,res)=>{
			res.json({msg: true});
		},
		deletar: (req,res)=>{
			Socket.deletar(res, {usuario: req.params.id});
			User.remove({_id: req.params.id})
			.then((user)=> res.json({msg: true}))
			.catch((err)=> res.json({msg: false}));

		}
	}
	return CrudCtrl;
}