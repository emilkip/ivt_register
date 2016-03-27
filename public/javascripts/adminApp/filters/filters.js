
angular
	.module('filters', [])

	.filter('timeFormat', function() {
		return function(item) {
			return moment(item).format('DD-MM-YYYY');
		}
	});