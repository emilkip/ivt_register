var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'employees',
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

		middleName: {
			type: 'string',
			required: false
		},

		birthday: {
			type: 'date',
			required: false
		},

		passportNum: {
			type: 'string',
			required: false
		},

		address: {
			type: 'string',
			required: false
		},

		telephone: {
			type: 'string',
			required: false
		},

		positions: {
			collection: 'employeesposition',
			via: 'employees'
		},

		grades: {
			collection: 'employeesgrade',
			via: 'employees'
		},

		photo: {
			type: 'string',
			required: false,
			defaultsTo: 'placeholder.png'
		},

		childs: {
			collection: 'employeeschild',
			via: 'employees'
		},

		educations: {
			collection: 'employeeseducation',
			via: 'employees'
		}
	}
});