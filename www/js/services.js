(function() {
	angular.module('empica.services', [])

	.factory('DataProvider', function(){
		var selectedImages = [];

		var images = [
				{ imageSrc:'img/dm/despicable-me-2-Minion-1.png', id: 1 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-2.png', id: 2 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-3.png', id: 3 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-4.png', id: 4 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-5.png', id: 5 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-6.png', id: 6 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-7.png', id: 7 },
				{ imageSrc:'img/dm/despicable-me-2-Minion-8.png', id: 8 },
				{ imageSrc:'img/dm/Angry-Minion.png', id: 9 },
				{ imageSrc:'img/dm/Curious-Minion1.png', id: 10 },
				{ imageSrc:'img/dm/Curious-Minion2.png', id: 11 },
				{ imageSrc:'img/dm/Dancing-minion.png', id: 12 },
				{ imageSrc:'img/dm/Edith-despicable-me-2.png', id: 13 },
				{ imageSrc:'img/dm/Evil-Minion-1.png', id: 14 },
				{ imageSrc:'img/dm/Evil-Minion-2.png', id: 15 },
				{ imageSrc:'img/dm/evil-minion-3.png', id: 16 },
				{ imageSrc:'img/dm/evil-minion-4.png', id: 17 },
				{ imageSrc:'img/dm/girl-minion.png', id: 18 },
				{ imageSrc:'img/dm/Shy-Minion.png', id: 19 },
				{ imageSrc:'img/dm/superman-minion.png', id: 20 },
				{ imageSrc:'img/dm/Happy-Minion.png', id: 21 },
				{ imageSrc:'img/dm/kungfu-Minion.png', id: 22 },
				{ imageSrc:'img/dm/Minion-playing-golf.png', id: 23 },
				{ imageSrc:'img/dm/Minion-reading.png', id: 24 },
				{ imageSrc:'img/dm/Minion.png', id: 25 },
				{ imageSrc:'img/dm/Sad-Agnes.png', id: 26 },
				{ imageSrc:'img/dm/agnes-overjoyed.png', id: 27 },
				{ imageSrc:'img/dm/agnes-sleeping.png', id: 28 },
				{ imageSrc:'img/dm/happy-agnes.png', id: 29 },
				{ imageSrc:'img/dm/Margo-dispicable-me-2.png', id: 30 },
				{ imageSrc:'img/dm/gru-icon-1.png', id: 31 },
				{ imageSrc:'img/dm/gru-icon-2.png', id: 32 }
			];

		var addToBuildQueue = function(imageId){
			selectedImages.push(imageId);
		};

		var getDummySearchResult = function(){
			return images;
		};

		var isQueueEmpty = function (){
			return !selectedImages.length;
		};

		var getSelectedImages = function (){
			var result = [];
			images.forEach(function (item){
				selectedImages.forEach(function(id){
					if(item.id === id){
						result.push(item.imageSrc);
					}
				});
			});
			return result;
		};

		var getChatHistory = function () {
			return chatHistory;
		};

		return {
			addToQeueu: addToBuildQueue,
			isQueueEmpty: isQueueEmpty,
			getDummySearchResult: getDummySearchResult,
			getSelectedImages: getSelectedImages
		};
	})

	.factory('ImageFinder', ['$q', 'DataProvider', function($q, DataProvider){
		var findImageBySearchText = function (searchText){
			var deferred = $q.defer();
			deferred.resolve(DataProvider.getDummySearchResult());
			return deferred.promise;
		};

		return {
			find: findImageBySearchText
		};
	}])

	.factory('ChatSocket', function(){
		var socket = io('http://localhost:3030/');

		var send = function (data){
			socket.emit('newchat', data);
		};

		var onReply = function(callback){
			socket.on('newchat:reply', callback);
		};

		return {
			send: send,
			onReply:onReply
		};
	});
})();