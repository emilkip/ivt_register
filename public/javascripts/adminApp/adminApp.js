(function() {

	angular
		.module('IVTAdmin', [
			'ngRoute',
			'employeesCtrl',
			'positionCtrl',
			'gradeCtrl',
			'facultyCtrl',
			'universityCtrl',
			'ngFileUpload',
			'EmployeesService',
			'PositionService',
			'GradeService',
			'UniversityService',
			'FacultyService',
			'filters'
		])
		.config(appConfig);


		function appConfig($routeProvider, $locationProvider) {

			$routeProvider
				.when('/', {
					templateUrl: 'javascripts/adminApp/templates/main.html',
					controller: ''
				})
				.when('/employees', {
					templateUrl: 'javascripts/adminApp/templates/employees/employees.html',
					controller: 'indexEmployeesCtrl'
				})
				.when('/employees/create', {
					templateUrl: 'javascripts/adminApp/templates/employees/employees-create.html',
					controller: 'createEmployeesCtrl'
				})
				.when('/employees/:id/edit', {
					templateUrl: 'javascripts/adminApp/templates/employees/employees-edit.html',
					controller: 'editEmployeesCtrl'
				})
				.when('/position', {
					templateUrl: 'javascripts/adminApp/templates/position/position.html',
					controller: 'indexPositionCtrl'
				})
				.when('/grades', {
					templateUrl: 'javascripts/adminApp/templates/grade/grade.html',
					controller: 'indexGradeCtrl'
				})
				.when('/faculties', {
					templateUrl: 'javascripts/adminApp/templates/faculty/faculties.html',
					controller: 'indexFacultyCtrl'
				})
				.when('/university', {
					templateUrl: 'javascripts/adminApp/templates/university/university.html',
					controller: 'indexUniversityCtrl'
				})
				.otherwise('/');
		}

})();
