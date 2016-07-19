angular
	.module('app.sessions', [])
	.controller('SessionsController', ['Session', '$rootScope', 'User', '$scope', SessionsController]);

function SessionsController(Session, User, $state, $rootScope) {
	var sessions = this;
	var modal = document.getElementById('modal');
	
	sessions.save = save;
	sessions.destroy = destroy;

	$rootScope.session = { when: new Date() };

	function save() {
		$rootScope.session.athlete = $rootScope.loggedUser.userId;

		Session.create($rootScope.session).then(function(){
			alert('Congratulations');
			modal.style.display = "none";

			getAll();
		})
	};

	
	function destroy(id){
		Session.destroy(id).then(function(){
			alert('Destroyed!');

			getAll();
		});
	};

	Session.allTypes()
		.then(function(data) {
			$rootScope.types = data;
		});

	function init() {
		$('body').removeClass('bg');
		
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

	function getAll(){
		Session.all({id: $rootScope.loggedUser.userId })
			.then(function(data) {
				$rootScope.session_objects = data;
				$rootScope.total = 0;

				for (var i = data.length - 1; i >= 0; i--) {
					$rootScope.total += data[i].time_spent;
				}

				$('#total').text($rootScope.total + ' hours of exercices');
			});
	}

	getAll();
	init();
}