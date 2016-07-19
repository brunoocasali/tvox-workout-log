angular
	.module('app.home', [])
	.controller('HomeController', ['$rootScope', '$location', HomeController]);

function HomeController($rootScope, $location) {
	$('body').addClass('bg');
}