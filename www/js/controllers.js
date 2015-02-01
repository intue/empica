(function() {
	angular.module('empica.controllers', [])

	.controller('AppController', ['$scope', function($scope){

	}])

	.controller('ChatsController', ['$scope', function($scope){
		$scope.chats = [{
			user: 'david',
			name: 'David',
			thumbnail: 'img/user/david.png'
		},{
			user: 'james',
			name: 'James',
			thumbnail: 'img/user/james.png'
		},{
			user: 'jennifer',
			name: 'Jennifer',
			thumbnail: 'img/user/jennifer.png'
		},{
			user: 'kevin',
			name: 'Kevin',
			thumbnail: 'img/user/kevin.png'
		},{
			user: 'linda',
			name: 'Linda',
			thumbnail: 'img/user/linda.png'
		},{
			user: 'paul',
			name: 'Paul',
			thumbnail: 'img/user/paul.png'
		}];
	}])

	.controller('ChatDetailController', ['$scope',
		'$stateParams',
		'$timeout',
		'$ionicScrollDelegate',
		'GifGenerator',
		function($scope,
			$stateParams,
			$timeout,
			$ionicScrollDelegate,
			GifGenerator){

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

	.controller('SearchController', ['$scope',
		'$ionicModal',
		'ImageFinder',
		function ($scope, $ionicModal, ImageFinder){

	  	$ionicModal.fromTemplateUrl('templates/image-result.html', {
			scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
	  	});

	  	$scope.closeResult = function() {
	    	$scope.modal.hide();
	  	};


		$scope.search = function(){
			ImageFinder.find().then(function(results){
				$scope.results = results;
				$scope.modal.show();
			});
		};
	}]);
})();
