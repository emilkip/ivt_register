
angular
	.module('universityCtrl', [])

	.controller('indexUniversityCtrl', ['$scope', 'UniversityService', 
		function($scope, UniversityService){

			$scope.createVis = false;

			UniversityService
				.getAllUniversity()
				.then(function(data) {
					console.log(data);
					$scope.universities = data.data.university;
				});

			$scope.create = function(university) {
				UniversityService
					.createUniversity(university)
					.then(function(data) {
						if(data.data.status) {
							$scope.universities.push(data.data.university);
							$scope.createVis = false;
						}
					});
			}

			$scope.delete = function(university, index) {

				var question = confirm('Удалить вуз?');

				if(question) {
					UniversityService
						.deleteUniversity(university.id)
						.then(function(data) {
							if(data.data.status)
								$scope.universities.splice(index, 1);
						});
					}
			}

			$scope.showCreate = function() {
				$scope.createVis = true;
			}
		}
	]);