(function(){
	'use strict'
	app.factory('UserFactory', ['$http','Config' ,function($http,Config){
		return {
			listar: function(){
				return $http.get(Config.principal + 'users');
			},
			update: function(data){
				return $http.put(Config.principal + 'users/' , data);
			},
			listLogin: function(login){
				return $http.get(Config.principal + 'users/validar/'+ login);
			},
			cadastrar: function(user){
				return $http.post(Config.principal + 'users', user);
			},
			delete: function(user){
				
				return $http.delete(Config.principal + 'users/'+user._id );
			}



		};
	}]);
})();