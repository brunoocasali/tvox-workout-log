angular.module('App', ['ngStamplay', 'ui.router', 'app.routes', 'app.sessions', 'app.home', 'UserService', 'SessionService', 'SportTypeService'])
	   .controller('MainController', ['User', '$rootScope', '$q', '$state', MainController])
	   .run(function ($rootScope, $state, $location, User) {
	   		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		      
	   		User.getCurrent()
		   		.then(function(user) {
				  $rootScope.currentUser = user;
			      User.isLogged = true;
				});

		      var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !User.isLogged;
		      
		      // NOT authenticated - wants any private stuff
		      if(shouldLogin)
		      {
		        $state.go('home');
		        event.preventDefault();
		        return;
		      }
		     
		      // authenticated (previously) comming not to root main
		      if(User.isLogged) 
		      {
		        var shouldGoToMain = fromState.name === "" && toState.name !== "sessions" ;
		          
		        if (shouldGoToMain)
		        {
		            $state.go('sessions');
		            event.preventDefault();
		        }

		        return;
		      }
		      
		      // UNauthenticated (previously) comming not to root public 
		      var shouldGoToPublic = fromState.name === "" && toState.name !== "home";
		        
		      if(shouldGoToPublic)
		      {
		          $state.go('home');
		          event.preventDefault();
		      }
		    });
		});


function MainController(User, $rootScope, $q, $state) {
  var main = this;
  main.logout = logout;

  $rootScope.currentUser = {};

  function logout() {
    $rootScope.isLogged = false;
    User.logout();
    $rootScope.currentUser = {};
  }
}