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
	}])

	.factory('ImageFinder', ['$q', function($q){
		var findImageBySearchText = function (searchText){
			var deferred = $q.defer();
			var images = [
				'img/dm/despicable-me-2-Minion-1.png',
				'img/dm/despicable-me-2-Minion-2.png',
				'img/dm/despicable-me-2-Minion-3.png',
				'img/dm/despicable-me-2-Minion-4.png',
				'img/dm/despicable-me-2-Minion-5.png',
				'img/dm/despicable-me-2-Minion-6.png',
				'img/dm/despicable-me-2-Minion-7.png',
				'img/dm/despicable-me-2-Minion-8.png',
				'img/dm/Angry-Minion.png',
				'img/dm/Curious-Minion1.png',
				'img/dm/Curious-Minion2.png',
				'img/dm/Dancing-minion.png',
				'img/dm/Edith-despicable-me-2.png',
				'img/dm/Evil-Minion-1.png',
				'img/dm/Evil-Minion-2.png',
				'img/dm/evil-minion-3.png',
				'img/dm/evil-minion-4.png',
				'img/dm/girl-minion.png',
				'img/dm/Shy-Minion.png',
				'img/dm/superman-minion.png',
				'img/dm/Happy-Minion.png',
				'img/dm/kungfu-Minion.png',
				'img/dm/Minion-playing-golf.png',
				'img/dm/Minion-reading.png',
				'img/dm/Minion.png',
				'img/dm/Sad-Agnes.png',
				'img/dm/agnes-overjoyed.png',
				'img/dm/agnes-sleeping.png',
				'img/dm/happy-agnes.png',
				'img/dm/Margo-dispicable-me-2.png',
				'img/dm/gru-icon-1.png',
				'img/dm/gru-icon-2.png'
			];
			deferred.resolve(images);
			return deferred.promise;
		};

		return {
			find: findImageBySearchText
		};
	}]);
})();