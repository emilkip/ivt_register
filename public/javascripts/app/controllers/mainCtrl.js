
angular
	.module('mainCtrl', [])

	.controller('mainCtrl', ['$scope', 
		function($scope) {

			$scope.filtersVis = false;
			$scope.filter = {};


			$scope.showFilers = function() {
				$scope.search = undefined;
				$scope.searchBlockVis = !$scope.searchBlockVis;
			}

		}
	]);
