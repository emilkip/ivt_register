
angular
	.module('facultyCtrl', [])

	.controller('indexFacultyCtrl', ['$scope', 'FacultyService', 
		function($scope, FacultyService){

			$scope.createFacultyVis = false;
			$scope.createSpecVis = false;

			FacultyService
				.getAllFaculty()
				.then(function(data) {
					$scope.faculties = data.data.faculties;
				});

			FacultyService
				.getAllSpecialization()
				.then(function(data) {
					$scope.specs = data.data.specs;
				});

			$scope.createFaculty = function(faculty) {
				FacultyService
					.createFaculty(faculty)
					.then(function(data) {
						if(data.data.status) {
							$scope.faculties.push(data.data.faculty);
							$scope.createFacultyVis = false;
						}
					});
			}

			$scope.deleteFaculty = function(faculty, index) {

				var question = confirm('Удалить факультет?');

				if(question) {
					FacultyService
						.deleteFaculty(faculty.id)
						.then(function(data) {
							if(data.data.status)
								$scope.faculties.splice(index, 1);
						});
				}
			}

			$scope.showCreate = function(type) {
				if(type == 'faculty')
					$scope.createFacultyVis = true;
				if(type == 'spec')
					$scope.createSpecVis = true;
			}

			$scope.createSpec = function(spec) {
				FacultyService
					.createSpecialization(spec)
					.then(function(data) {
						if(data.data.status) {
							$scope.specs.push(data.data.spec);
							$scope.createSpecVis = false;
						}
					});
			}

			$scope.deleteSpec = function(spec, index) {

				var question = confirm('Удалить кафедру?');

				if(question) {
					FacultyService
						.deleteSpecialization(spec.id)
						.then(function(data) {
							if(data.data.status)
								$scope.specs.splice(index, 1);
						});
				}
			}

		}
	]);