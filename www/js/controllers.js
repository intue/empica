(function() {
	angular.module('empica.controllers', [])

	.controller('AppController', ['$scope', function($scope){

	}])

	.controller('ChatsController', ['$scope', function($scope){
		$scope.chats = [{
			user: 'ruwan',
			name: 'Ruwan',
			thumbnail: 'http://icons.iconarchive.com/icons/everaldo/kids-icons/128/thumbnail-icon.png'
		},
		{
			user: 'pradeep',
			name: 'Pradeep Ruwan',
			thumbnail: 'http://icons.iconarchive.com/icons/everaldo/kids-icons/128/thumbnail-icon.png'
		}];
	}])

	.controller('ChatDetailController', ['$scope', '$stateParams', '$timeout','$ionicScrollDelegate', 'GifGenerator', 
		function($scope, $stateParams, $timeout, $ionicScrollDelegate, GifGenerator){

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

		for(var i = 0; i < 100; i++){
			var genFunc = getGenfunc(i);
			$scope.items.push({
				mpicId: i,
				imgSrc: 'http://i.imgur.com/2OO33vX.jpg',
				genFunc: genFunc
			});
		}

		$timeout(function () {
			$ionicScrollDelegate.scrollBottom();
		}, 0);

	}]);
})();
