(function() {

'use strict';

	angular
		.module('UniversityService', [])
		.factory('UniversityService', UniversityService);

		function UniversityService($http) {

			return {
				getAllUniversity: getAllUniversity,
				createUniversity: createUniversity,
				deleteUniversity: deleteUniversity,
				editUniversity: editUniversity
			}


			function createUniversity(university) {
				return $http({
						url: '/api/university/create',
						method: 'POST',
						data: university
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log('Server error');
					});
			}

			function getAllUniversity() {
				return $http
						.get('/api/university')
						.then(function(data) {
							return data;
						});
			}

			function deleteUniversity(id) {
				return $http({
						url: '/api/university/delete',
						method: 'POST',
						data: { id: id }
					})
					.then(function(res) {
						return res;
					})
					.catch(function() {
						console.log('Server error');
					});
			}

			function editUniversity(university) {
				return $http({
						url: '/api/university/edit',
						method: 'POST',
						data: university
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log('Server error');
					});
			}
		};

})();