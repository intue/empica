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
	}]);
})();
