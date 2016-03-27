(function() {

'use strict';

	angular
		.module('PositionService', [])
		.factory('PositionService', PositionService);

		function PositionService($http) {

			return {
				getAllPosition: getAllPosition,
				createPosition: createPosition,
				deletePosition: deletePosition,
				editPostion: editPostion
			}


			function getAllPosition() {
				return $http
						.get('/api/position')
						.then(function(data) {
							return data;
						});
			}

			function createPosition(position) {
				return $http({
						url: '/api/position/create',
						method: 'POST',
						data: position
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log(err);
					});
			}

			function deletePosition(id) {
				return $http({
						url: '/api/position/delete',
						method: 'POST',
						data: { id: id }
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log(err);
					});
			}

			function editPostion(position) {
				return $http({
						url: '/api/position/edit',
						method: 'POST',
						data: position
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log(err);
					});
			}
		};

})();