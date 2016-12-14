
(function(){
  'use strict'
  app.factory('authInterceptor', ['$q','$location','$localStorage', function ($q, $location,$localStorage) {

    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers['x-access-token'] = $localStorage.token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('#/');
        }
        return $q.reject(response);
      }
    };
  }])

  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
})();









