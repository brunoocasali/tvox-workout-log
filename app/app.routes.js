angular
	.module('app.routes', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/app/components/home/home.html',
			controller: 'HomeController as home'
		})
	    .state('private', {
		    abstract: true,
		    template: "<ui-view/>",
		    resolve: {
		        profile: function(User, $log, $state) {
		            return User.getCurrent().then(function(me) {
		                return me;
		            }, function() {
		            	alert('Você precisa estar logado!');
		                $state.go('home', { redirect: 'home' });
		            });
		        }
		    }
		})
		.state('private.sessions', {
	        url: '/sessions',
	        templateUrl: '/app/components/sessions/sessions.html',
	        controller: 'SessionsController as sessions',
	    });

	$urlRouterProvider.otherwise('/sessions');
}