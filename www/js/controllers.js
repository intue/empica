(function() {
	angular.module('empica.controllers', [])

	.controller('AppController', ['$scope', function($scope){

	}])

	.controller('ChatsController', ['$scope', 'DataProvider', function($scope, DataProvider){
		$scope.chats = DataProvider.getChatHistory();
	}])

	.controller('ChatDetailController', ['$scope',
		'$stateParams',
		'$timeout',
		'$ionicScrollDelegate',
		'DataProvider',
		'$compile',
		'$sce',
		'ChatSocket',
		function($scope,
			$stateParams,
			$timeout,
			$ionicScrollDelegate,
			DataProvider,
			$compile,
			$sce,
			ChatSocket ){

		$scope.chatName = $stateParams.chatId;

		$scope.items = [];

		var getGenfunc = function (i){
			return function(){
				var self = this;
				this.imgSrc = 'img/loading-icon.gif';
				GifGenerator.createGIF().then(function(imgData){
					self.imgSrc = imgData;
				});
			};
		};

		$scope.isQeueuNotEmpty = function(){
			return !DataProvider.isQueueEmpty();
		};

		$scope.getSelectedImages = function (){
			return DataProvider.getSelectedImages();
		};

		ChatSocket.onReply(function(media){
			var DATA_SRC_PREFIX = "data:text/html;charset=utf-8,";
			var HTML5_PLAYER_DATA_CODE =
				'<html><head></head><body>' +
				'<video webkit-playsinline width="320" height="240" autoplay="autoplay" loop>' +
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
		'$ionicModal',
		'ImageFinder',
		'DataProvider',
		function ($scope, $ionicModal, ImageFinder, DataProvider){

		$scope.selectImage = function(imageId){
			DataProvider.addToQeueu(imageId);
		};

	  	$ionicModal.fromTemplateUrl('templates/image-result.html', {
			scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
	  	});

	  	$scope.closeResult = function() {
	    	$scope.modal.hide();
	    	$scope.tempdata = "1234";
	  	};


		$scope.search = function(){
			ImageFinder.find().then(function(results){
				$scope.results = results;
				$scope.modal.show();
			});
		};
	}]);
})();
