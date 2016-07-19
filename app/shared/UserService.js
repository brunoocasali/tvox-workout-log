angular
	.module('UserService', [])
	.factory('User', ['$stamplay', '$q', UserService]);

function UserService($stamplay, $q) {
	return {
		getCurrent: getCurrent,
		logout: logout,
		isLogged: false
	};

	function getCurrent() {
      var def = $q.defer();
     
      $stamplay.User.currentUser()
	      .then(function(response) {
	        if(response.user === undefined) {
	          def.resolve(false);
	        } else {
	          def.resolve(response.user);
	        }
	      }, function(error) {
	        def.reject();
	      });
      
      return def.promise;
  	}

	function logout() {
		$stamplay.User.logout();
	}
}