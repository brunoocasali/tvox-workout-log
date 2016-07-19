angular
	.module('app.sessions', [])
	.controller('SessionsController', ['Session', '$rootScope', 'User', '$scope', SessionsController]);

function SessionsController(Session, User, $state, $rootScope) {
	var sessions = this;
	
	// return {
	// 	init: init
	// 	load: load
	// }

	function load() {
		Session.allTypes()
			.then(function(data) {
				$rootScope.types = data;
			});
	}

	function init() {
		$('body').removeClass('bg');
		$('select').imagepicker({  hide_select: false });

		var modal = document.getElementById('modal');
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

	setTimeout(function() { init(); }, 1000);
}