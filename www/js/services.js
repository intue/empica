(function() {
	angular.module('empica.services', [])

	.factory('GifGenerator', ['$q', function($q){

		var createGIF = function(images){
			var deferred = $q.defer();
			gifshot.createGIF({
				gifWidth: 460,
				gifHeight: 300,
				interval: 0.4,
				images: [
					'http://i.imgur.com/2OO33vX.jpg',
					'http://i.imgur.com/qOwVaSN.png',
					'http://i.imgur.com/Vo5mFZJ.gif']
			}, function(obj) {
			    if(obj.error) {
			    	return deferred.reject(obj.error);
			    }

			    deferred.resolve(obj.image);
			});

			return deferred.promise;
		};

		return {
			createGIF: createGIF
		};
	}]);
})();