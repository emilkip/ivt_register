var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

	identity: 'employeeseducation',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		yearOfBegin: {
			type: 'string',
			required: true
		},

		spec: {
			type: 'string',
			required: false
		},

		yearOfEnd: {
			type: 'string',
			required: true
		},

		documentNum: {
			type: 'string',
			required: false
		},

		employees: {
			model: 'employees',
			required: true
		},

		university: {
			model: 'university',
			required: false
		}
	}
});