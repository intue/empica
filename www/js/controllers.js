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

	}])

	.controller('SearchController', ['$scope', '$ionicModal', 'ImageFinder', function ($scope, $ionicModal, ImageFinder){
		// Create the login modal that we will use later
	  	$ionicModal.fromTemplateUrl('templates/image-result.html', {
			scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
	  	});

	  	// Triggered in the login modal to close it
	  	$scope.closeResult = function() {
	    	$scope.modal.hide();
	  	};


		$scope.search = function(){
			console.log('$scope.searchText', $scope.searchText);
			$scope.htmlContent = '<p>Wow, this is really something huh?</p>';
			$scope.modal.show();
			ImageFinder.find().then(function(results){
				$scope.results = results;
			});
		};
	}]);
})();
