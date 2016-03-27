(function() {

// AdminApp

'use strict';

	angular
		.module('EmployeesService', [])
		.factory('EmployeesService', EmployeesService);

		function EmployeesService($http) {

			return {
				getAllEmpl: getAllEmpl,
				getOneEmpl: getOneEmpl,
				deleteEmpl: deleteEmpl
			}


			function getAllEmpl() {
				return $http
						.get('/api/employees')
						.then(function(data) {
							return data;
						})
						.catch(function(err) {
							console.log(err);
						});
			}

			function deleteEmpl(id) {
				return $http({
						url: '/api/employees/delete',
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

			function getOneEmpl(id) {
				return $http
						.get('/api/employees/' + id)
						.then(function(data) {
							return data;
						});
			}
		};

})();
