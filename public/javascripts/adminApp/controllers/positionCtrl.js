

angular
	.module('positionCtrl', [])

	.controller('indexPositionCtrl', ['$scope', 'PositionService', 
		function($scope, PositionService){

			$scope.createVis = false;

			PositionService
				.getAllPosition()
				.then(function(data) {
					$scope.positions = data.data.position;
				});

			$scope.create = function(position) {
				PositionService
					.createPosition(position)
					.then(function(data) {
						if(data.data.status) {
							$scope.positions.push(data.data.position);
							$scope.createVis = false;
						}
					});
			}

			$scope.delete = function(position, index) {

				var question = confirm('Удалить должность?');

				if(question) {
					PositionService
						.deletePosition(position.id)
						.then(function(data) {
							if(data.data.status)
								$scope.positions.splice(index, 1);
						});
				}
			}

			$scope.showCreate = function() {
				$scope.createVis = true;
			}
		}
	]);