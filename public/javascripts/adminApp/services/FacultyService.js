(function() {

'use strict';

	angular
		.module('FacultyService', [])
		.factory('FacultyService', FacultyService);

		function FacultyService($http) {

			return {
				getAllFaculty: getAllFaculty,
				createFaculty: createFaculty,
				deleteFaculty: deleteFaculty,
				getAllSpecialization: getAllSpecialization,
				createSpecialization: createSpecialization,
				deleteSpecialization: deleteSpecialization
			}


			function createFaculty(faculty) {
				return $http({
						url: '/api/faculty/create',
						method: 'POST',
						data: faculty
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log(err);
					});
			}

			function getAllFaculty() {
				return $http
						.get('/api/faculty')
						.then(function(data) {
							return data;
						});
			}

			function deleteFaculty(id) {
				return $http({
						url: '/api/faculty/delete',
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

			function getAllSpecialization() {
				return $http
						.get('/api/faculty/specializations')
						.then(function(data) {
							return data;
						});
			}

			function createSpecialization(specialization) {
				return $http({
						url: '/api/faculty/specializations/create',
						method: 'POST',
						data: specialization
					})
					.then(function(res) {
						return res;
					})
					.catch(function(err) {
						console.log(err);
					});
			}

			function deleteSpecialization(id) {
				return $http({
						url: '/api/faculty/specialization/delete',
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

		};

})();