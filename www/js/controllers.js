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

	.controller('ChatDetailController', ['$scope', '$stateParams', function($scope, $stateParams){
		$scope.chatName = $stateParams.chatId;

		gifshot.createGIF({
			gifWidth: 460,
			gifHeight: 300,
			interval: 0.4,
			images: [
				'http://i.imgur.com/2OO33vX.jpg',
				'http://i.imgur.com/qOwVaSN.png',
				'http://i.imgur.com/Vo5mFZJ.gif']
		}, function(obj) {
		    if(!obj.error) {
		        $scope.imgSrc = obj.image;
		        $scope.$apply();
		    }
		});

	}]);
})();
