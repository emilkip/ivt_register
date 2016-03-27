
angular
	.module('employeesCtrl', [])

	.controller('indexEmployeesCtrl', ['$scope', 'EmployeesService', 
		function($scope, EmployeesService){

			$scope.sortField = 'lastName';

			EmployeesService
				.getAllEmpl()
				.then(function(data) {
					$scope.employees = data.data.employees;
				});
		}
	])

	.controller('oneEmployeesCtrl', ['$scope', 'EmployeesService', '$routeParams', 
		function($scope, EmployeesService, $routeParams){

			EmployeesService
				.getOneEmpl($routeParams.id)
				.then(function(data) {
					$scope.employees = data.data.employees;
					$scope.positions = data.data.positions;
					$scope.grades = data.data.grades;
					$scope.educations = data.data.educations;
					$scope.childs = data.data.childs;
				});
		}
	]);
