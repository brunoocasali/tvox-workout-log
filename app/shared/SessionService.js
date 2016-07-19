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
	function all() {
		var q = $q.defer();

		$stamplay.Object("session").get({
			populate_owner : true
		}).then(function(res) {
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

	/**
	 * Create a session
	 */
	function create(data) {
		var def = $q.defer();

		// instantiate a new session model from the stamplay js sdk
		var session = new $stamplay.Object('session').Model;		
		
		// loop over the fields in data and update the session
		angular.forEach(data, function(value, key) {
			session.set(key, value);
		});
		
		// save the object
		session.save()
			.then(function() {
				def.resolve(session);
			});

		return def.promise;
	}

	/**
	 * DESTROY a session
	 */
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