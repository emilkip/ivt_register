var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'employeesposition',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		yearOfBegin: {
			type: 'string',
			required: false
		},

		yearOfEnd: {
			type: 'string',
			required: false
		},

		employees: {
			model: 'employees',
			required: true
		},

		position: {
			model: 'position',
			required: true
		},

		faculty: {
			model: 'faculty',
			required: false
		},

		specialization: {
			model: 'specialization',
			required: false
		},

		documentNum: {
			type: 'string',
			required: false
		}
	}
});