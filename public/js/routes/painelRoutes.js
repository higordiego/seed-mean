(function(){
	'use strict'
	app.config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {

		$stateProvider    
		 .state('painel', {
            url:'/painel',
            templateUrl: "/paginas/painel/index.html",
            controller: 'PainelCtrl',
            authorize: true
        })
		.state('painel.user',{
			url:'/user',
			templateUrl: '/paginas/user/index.html',
			controller: 'UserCtrl',
			authorize: true
		})
		.state('painel.user.cadastrar',{
			url:'/cadastrar',
			templateUrl: '/paginas/user/cadastrar.html',
			authorize: true
		})
		.state('painel.user.listar',{
			url:'/listar',
			templateUrl: '/paginas/user/listar.html',
			authorize: true
		})

	}]);
})();



