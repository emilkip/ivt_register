var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'employeeschild',
	connection: 'myLocalMySql',

	attributes: {

		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		},

		firstName: {
			type: 'string',
			required: true
		},

		lastName: {
			type: 'string',
			required: true
		},

		employees: {
			model: 'employees',
			required: true
		},

		birthday: {
			type: 'date',
			required: false
		}
	}
});