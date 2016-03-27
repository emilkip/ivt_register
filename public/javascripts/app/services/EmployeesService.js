(function() {

'use strict';

	angular
		.module('EmployeesService', [])
		.factory('EmployeesService', EmployeesService);

		function EmployeesService($http) {

			return {
				getAllEmpl: getAllEmpl,
				getOneEmpl: getOneEmpl
			}


			function getAllEmpl() {
				return $http
						.get('/api/employees')
						.then(function(data) {
							return data;
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



