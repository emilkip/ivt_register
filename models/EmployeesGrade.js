var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'employeesgrade',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		documentNum: {
			type: 'string',
			required: false
		},

		employees: {
			model: 'employees',
			required: true
		},

		year: {
			type: 'string',
			required: false
		},

		grade: {
			model: 'grade',
			required: true
		}
	}
});