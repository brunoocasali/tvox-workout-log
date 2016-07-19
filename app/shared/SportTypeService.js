angular	
	.module('SportTypeService', [])
	.factory('SportType', ['$stamplay', '$q', '$http', SportTypeService]);

function SportTypeService($stamplay, $q, $http) {

	return {
		all: all,
	};

	/** 
	 * Get all the sports types.
	 */
	function all() {
		var def = $q.defer();

		// instantiate a new product collection from the stamplay js sdk
		var sportTypes = new $stamplay.Cobject('sportTypes').Collection;
		sportTypes.populate().fetch()
			.then(function() {
				def.resolve(sportTypes);
			});

		return def.promise;
	}
}