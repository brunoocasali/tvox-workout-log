angular
	.module('app.sessions', [])
	.controller('SessionsController', ['Session', '$rootScope', 'User', '$scope', SessionsController]);

function SessionsController(Session, User, $state, $rootScope) {
	var sessions = this;
	$rootScope.session = {};
	var modal = document.getElementById('modal');

	sessions.save = function() {
		$rootScope.session.athlete = $rootScope.loggedUser.userId;

		Session.create($rootScope.session).then(function(){
			alert('Congratulations');
			modal.style.display = "none";
		});
	};

	function load() {
		Session.allTypes()
			.then(function(data) {
				$rootScope.types = data;
			});

		Session.all({populate: true, athlete: $rootScope.loggedUser.userId })
			.then(function(data) {
				$rootScope.sessions = data;
				console.log(data);
			});
	}

	function init() {
		$('body').removeClass('bg');
		// $('select').imagepicker({  hide_select: false });
		
		var btn = document.getElementById("myBtn");
		var span = document.getElementsByClassName("close")[0];

		btn.onclick = function() { modal.style.display = "block"; }
		span.onclick = function() { modal.style.display = "none"; }
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}	
	}

	load();
	init();
}