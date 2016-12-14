
(function(){
	'use strict'
	app.controller('PainelCtrl', ['$scope','AuthService','$location','$http', 'PainelFactory'
		,function($scope,AuthService,$location,$http,PainelFactory){
			$scope.init = function(){
				PainelFactory.index().then(function(response){
					$scope.menuItems = response.data;
				});	
			};
			$scope.sair = function(){
				AuthService.logout();
				$location.path('/');
			}
		}]);
})();
