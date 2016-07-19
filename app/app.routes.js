angular
	.module('app.routes', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', AppRoutes]);

function AppRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
	
	// $locationProvider.html5Mode(true);

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/app/components/home/home.html',
			controller: 'HomeController as home'
		})

		.state('sessions', {
	        url: '/sessions',
	        templateUrl: '/app/components/sessions/sessions.html',
	        controller: 'SessionsController as sessions',
	        data: { requireLogin : true }
	    });

	$urlRouterProvider.otherwise('/sessions');
}