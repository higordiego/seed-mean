
(function(){
  'use strict'  
  app.factory('AuthService', ['$http', '$localStorage', '$q','$window', function($http, $localStorage, $q){
    return {
      getToken : function () {
        return $localStorage.token;
      },
      setToken: function (token) {
        $localStorage.token = token;
      },
      signin : function (data) {
        return $http.post('/', data);
      },
      signup : function (data) {
        return $http.post('api/signup', data);
      },
      logout : function () {
        delete $localStorage.token;
        $q.when();
      }
    };
  }]);
})();
