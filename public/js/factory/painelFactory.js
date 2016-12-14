(function(){
	'use strict'
	app.factory('PainelFactory', ['$http','Config' , function($http,Config){
		return {
			index: function(){
				return $http.get(Config.principal + 'painel');
			}
		};
	}]);
})();