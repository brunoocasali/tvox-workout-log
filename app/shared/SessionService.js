angular	
	.module('SessionService', [])
	.factory('Session', ['$stamplay', '$q', '$http', SessionService]);

function SessionService($stamplay, $q, $http) {

	return {
		all: all,
		allTypes: allTypes,
		get: get,
		create: create,
		destroy: destroy,
	};

	/** 
	 * Get all the sessions
	 */
	function all(query) {
		var q = $q.defer();

		$stamplay.Object("session")
		.get(query)
		.then(function(res) {
			q.resolve(res.data);
		}, function(err) {
			q.reject(err);
		});

      	return q.promise;
	}

	function allTypes() {
		var q = $q.defer();

		$stamplay.Object("sport_type")
			.get({populate_owner: true })
			.then(function(res) {
				q.resolve(res.data);
			}, function(err) {
				q.reject(err);
			});

      	return q.promise;
	}

	/**
	 * Get a single session
	 */
	function get(id) {
		var def = $q.defer();

		// instantiate a new session model from the stamplay js sdk
		var session = new Stamplay.Object('session').Model;

		// get the session in question and return it
		session.fetch(id, { populate: true })
			.then(function() {
				def.resolve(session);
			});

		return def.promise;
	}

	function create(data) {
		var def = $q.defer();

		$stamplay.Object("session")
			.save(data)
			.then(function(res) {
	           def.resolve(res);
	        })
	        .fail(function(err) {
	          alert('ERROR CODE ' + err.code + '. Message: ' + err.message);
	          console.log(err);
	        });

		return def.promise;
	}

	function destroy(id) {
		var q = $q.defer();
	    
	    $stamplay.Object("session").remove(id)
	        .then(function(res) {
	          q.resolve();
	        }, function(err) {
	          q.reject();
	        })
	    return q.promise;
	}
}