'use strict';

// Defining Angular app model with all other dependent modules
var App = angular.module('App', ['ngRoute']);

App.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/index.html',
        controller: 'HomeController'
    }).when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    }).otherwise({
        redirectTo: '/'
    });
});

App.controller('MainController', function(User) {
  var main = this;
  $rootScope.currentUser = {}; // creating this object to hold our current users info

  // get the current user and bind their data to $rootScope.currentUser object
  User.getCurrent()
    .then(function(data) {
      if (data.get('_id')) {
        $rootScope.currentUser.id    = data.get('_id');
        $rootScope.currentUser.name  = data.get('displayName');
        $rootScope.currentUser.image = data.get('profileImg');
      } else {
        // clear the current user just to be sure
        $rootScope.currentUser = {};
      }
    });
});


// function needsAuth(){
//   return {
//     auth: ['$auth', function($auth, $location) {
//       return $auth.validateUser().catch(function(err){
//         swal({
//           title: "Problemas na verificação de identidade!",
//           text: "Aparentemente não conseguimos identificar que você está logado!",
//           type: "error",
//           confirmButtonColor: "#DD6B55",
//           confirmButtonText: "Continuar"
//         }, function(){
//           window.location.href = '/auth/#/login';
//         });
//       });
//     }]
//   }
// }