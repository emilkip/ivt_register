var Waterline = require('waterline');


module.exports = Waterline.Collection.extend({

	identity: 'position',
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
		}
	}
});