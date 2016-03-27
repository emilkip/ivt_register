(function() {

	angular
		.module('IVTRegister', [
			'ngRoute',
			'mainCtrl',
			'employeesCtrl',
			'EmployeesService',
			'filters'
		])
		.config(appConfig);


		function appConfig($routeProvider, $locationProvider) {

			$routeProvider
				.when('/', {
					templateUrl: 'javascripts/app/templates/employees/employees_all.html',
					controller: 'indexEmployeesCtrl'
				})
				.when('/employees/:id', {
					templateUrl: 'javascripts/app/templates/employees/employees_one.html',
					controller: 'oneEmployeesCtrl'
				})
				.otherwise('/');
		}

})();
