(function(){
	'use strict'
	app.factory('SocketUser', ['mySocket', function(mySocket){
		return {
			getUser: function (){
				mySocket.on('inserir', function(userSave){
					return userSave.usuario;
				});
			}
		}
	}]);
})();