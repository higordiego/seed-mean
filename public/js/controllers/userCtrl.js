(function(){
	'use strict'
	app.controller('UserCtrl', ['$scope', 'AuthService','Flash','$state','UserFactory','mySocket'
		,function($scope,AuthService,Flash,$state,UserFactory,mySocket){
			$scope.user = {};
			$scope.users = [];
			$scope.error = {};
			Flash.timeout = 5000;
			$scope.grupo = [{valor: 0, nome: 'Administrador'},{valor: 1, nome: 'Atendimento'}];
			$scope.status = [{valor: false, nome: 'Ativo'},{valor: true, nome: 'Bloqueado'}];
			
				/*
					Efetuar o Login
					*/
					$scope.logar = function(usuario){
						AuthService.signin(usuario).then(function(response){
							Flash.clear();
							if(!response.data.success){
								$scope.error = response.data;
								Flash.create('danger', $scope.error.message);
								delete $scope.error;
							}else{
								AuthService.setToken(response.data.token);
								$state.go('painel')
							}
						}, function(err){
							
						});
					};
					/*
						listar Usuário
						*/	

						

						$scope.cadastrar = function(){
							$scope.listarFm = !$scope.listarFm;
							$state.go('painel.user.cadastrar');
						};
						$scope.listar = function(){
							if($scope.users.length == 0){
								UserFactory.listar().then(function(response){
									$state.go('painel.user.listar');
									$scope.users = response.data;	
								});
							}
							$scope.listarFm = !$scope.listarFm;
							$state.go('painel.user.listar');
						};
				/**
					Update Usuário
					*/
					$scope.atualizar = function(user){
						$scope.users = $scope.users.filter(function(usuario){
							if(user._id == usuario._id){
								usuario.nome = user.nome;
								usuario.status = user.status;
								usuario.tipo = user.tipo;
							
							};
							return usuario
						});
					};


					$scope.update = function(data,id){
						var user = {
							nome: data.nome,
							status: data.status,
							tipo:  data.tipo,
							_id: id
						};

						UserFactory.update(user).then();
					}
					/*
						Valida se Já existe o login
						*/
						$scope.validar = function(user){
							UserFactory.listLogin(user).then(function(response){
								Flash.clear();
								if(response.data.msg){

									$scope.user.login = ''
									Flash.create('danger', response.data.error);
								};
							});
						};

						/*
							Adiciona um novo usuário
							*/

							$scope.add = function(user){
								UserFactory.cadastrar(user).then(function(response){
									if(response.data.msg){
										Flash.create('success', response.data.error);
										delete $scope.user 
										
									}else{
										Flash.create('danger', response.data.error);
										delete $scope.user

									}
								}, function(err){
									console.log(err);
								});
							}
								/*
									Retirando o usuario do array
									*/
									$scope.retirar = function(user){
										$scope.users = $scope.users.filter(function(usuario){
											if(user != usuario._id) return usuario
										});	
									};

									
										/*
											Iniciando os sockets
											Caso tenha um novo cadastrado, insere no array.
										*/
										mySocket.on('inserir', function(response){
											$scope.users.push(response.usuario);
										});
										mySocket.on('deletar', function(response){
											$scope.retirar(response.usuario);
										});
										mySocket.on('update', function(response){
											$scope.atualizar(response);
										});






						/*
							Deleta um usuário
							*/

							$scope.del = function(user){
								UserFactory.delete(user).then(function(response){
									$scope.retirar(user._id);
								}, function(err){
									console.log(err);
								})

							}


						}]);
})();

