(function(){
    'use strict'
    app.config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {

        $stateProvider    

        .state("login", {
            url: '/',
            templateUrl : "/paginas/login/index.html",
            controller: 'UserCtrl',
            authorize: false
            
        })
       

        $urlRouterProvider
        .otherwise('/');

    }]);
})();




