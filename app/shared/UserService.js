angular
	.module('UserService', [])
	.factory('User', ['$stamplay', '$q', UserService]);

function UserService($stamplay, $q) {
	var service = {
		isLogged: false
	};

	service.getCurrent = function() {
      var def = $q.defer();
     
      $stamplay.User.currentUser()
	      .then(function(response) {
	        if(response.user === undefined) {
	          service.isLogged = false;
	          def.reject(response);
	        } else {
	          service.isLogged = true;
	          def.resolve(response.user);
	        }
	      }, function(error) {
	        def.reject();
	      });
      
      return def.promise;
  	}

	service.logout = function () {
		$stamplay.User.logout();
	}

	return service;
}