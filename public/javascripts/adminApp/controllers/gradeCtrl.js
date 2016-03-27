
angular
	.module('gradeCtrl', [])

	.controller('indexGradeCtrl', ['$scope', 'GradeService', 
		function($scope, GradeService){

			$scope.createVis = false;

			GradeService
				.getAllGrade()
				.then(function(data) {
					$scope.grades = data.data.grade;
				});

			$scope.create = function(grade) {
				GradeService
					.createGrade(grade)
					.then(function(data) {
						if(data.data.status) {
							$scope.grades.push(data.data.grade);
							$scope.createVis = false;
						}
					});
			}

			$scope.delete = function(grade, index) {

				var question = confirm('Удалить звание?');

				if(question) {
					GradeService
						.deleteGrade(grade.id)
						.then(function(data) {
							if(data.data.status)
								$scope.grades.splice(index, 1);
						});
				}
			}

			$scope.showCreate = function() {
				$scope.createVis = true;
			}
		}
	]);