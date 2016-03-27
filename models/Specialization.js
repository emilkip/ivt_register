var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'specialization',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		title: {
			type: 'string',
			required: true
		},

		faculty: {
			model: 'faculty',
			required: false
		}
	}
});