(function() {
	angular.module('empica.controllers', [])

	.controller('AppController', ['$scope', function($scope){

	}])

	.controller('ChatsController', [
		'$scope',
		'$stateParams',
		'$timeout',
		'$ionicScrollDelegate',
		'DataProvider',
		'ChatSocket',
		function($scope,
			$stateParams,
			$timeout,
			$ionicScrollDelegate,
			DataProvider,
			ChatSocket ){

		$scope.items = [];
		$scope.player = 'templates/player.html';
		$scope.searchbox = 'templates/searchbox.html';
		$scope.previewbox = 'templates/previewbox.html';


		$scope.isQeueuNotEmpty = function(){
			return !DataProvider.isQueueEmpty();
		};

		$scope.getSelectedImages = function (){
			$scope.previewPath = 'img/dm/agnes-overjoyed.png';
			console.log('getSelectedImages', DataProvider.getSelectedImages());
			return DataProvider.getSelectedImages();
		};

		$scope.send = function(){
			ChatSocket.send({
				media : DataProvider.getSelectedImages()
			});
		};

		$timeout(function () {
			$ionicScrollDelegate.scrollBottom();
		}, 0);

	}])

	.controller('SearchController', ['$scope',
		'ImageFinder',
		'DataProvider',
		function ($scope, ImageFinder, DataProvider){

		$scope.search = function($event){
			$scope.searchResult = 'templates/image-result.html';
			ImageFinder.find().then(function(results){
				console.log('results for ');
				$scope.results = results;
			});
		};

		$scope.selectImage = function (imageId){
			DataProvider.addToQeueu(imageId);
			$scope.searchResult = null;
		};
	}])

	.controller('PlayerController', [
		'$scope',
		'$timeout',
		'$compile',
		'$sce',
		'ChatSocket', function ($scope, $timeout, $compile, $sce, ChatSocket){
			ChatSocket.onReply(function(media){
			var DATA_SRC_PREFIX = "data:text/html;charset=utf-8,";
			var HTML5_PLAYER_DATA_CODE =
				'<html><head></head><body>' +
				'<video controls webkit-playsinline width="320" height="240" autoplay="autoplay">' +
				'<source src="'+ media.data + '">' +
				'Your browser doesn\'t support HTML5 video.' +
				'</video>' +
				'</body></html>';

			var compiledPlayer = $compile('<div>' + HTML5_PLAYER_DATA_CODE + '</div>')($scope);

			$timeout(function(){
				//Need timeout to wait to get the interpolated html code
				$scope.iFrameDataSrc = $sce.trustAsResourceUrl(DATA_SRC_PREFIX + escape(compiledPlayer.html()));
			});
		});
	}]);
})();
