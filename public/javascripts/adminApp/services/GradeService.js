(function() {

'use strict';

	angular
		.module('GradeService', [])
		.factory('GradeService', GradeService);

		function GradeService($http) {

			return {
				getAllGrade: getAllGrade,
				createGrade: createGrade,
				deleteGrade: deleteGrade,
				editGrade: editGrade
			}


			function createGrade(grade) {
				return $http({
						url: '/api/grade/create',
						method: 'POST',
						data: grade
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log(err);
					});
			}

			function getAllGrade() {
				return $http
						.get('/api/grade')
						.then(function(data) {
							return data;
						});
			}

			function deleteGrade(id) {
				return $http({
						url: '/api/grade/delete',
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

			function editGrade(grade) {
				return $http({
						url: '/api/grade/edit',
						method: 'POST',
						data: grade
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