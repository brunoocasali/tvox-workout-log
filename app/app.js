angular.module('App', ['ngStamplay', 'ui.router', 'app.routes', 'UserService', 'SessionService', 'app.sessions', 'app.home'])
	   .controller('MainController', ['User', '$rootScope', '$q', '$state', MainController])

function MainController(User, $rootScope, $q, $state) {
  var main = this;
  main.logout = logout;

  $rootScope.total = 0;
  $rootScope.loggedUser = {}; 

  User.getCurrent()
   .then(function(data) {
    if (data['_id']) {
      $rootScope.loggedIn = true;
      $rootScope.loggedUser.userId = data['_id'];
      $rootScope.loggedUser.displayName = data['displayName'];
      $rootScope.loggedUser.profileImg = data['profileImg'];

      $state.go('private.sessions');
    } else {
      $rootScope.loggedIn = false;
      $state.go('home');
    }
  });

  function logout() {
    $rootScope.isLogged = false;
    User.logout();
    $rootScope.currentUser = {};
  }
}