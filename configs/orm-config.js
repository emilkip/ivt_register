var Waterline = require('waterline'),
	connectConfig = require('./waterline-config');

// Models
var Employees 				= require('../models/Employees'),
	EmployeesEducation 		= require('../models/EmployeesEducation'),
	EmployeesGrade 			= require('../models/EmployeesGrade'),
	EmployeesPosition 		= require('../models/EmployeesPosition'),
	Grade 					= require('../models/Grade'),
	Position 				= require('../models/Position'),
	University 				= require('../models/University'),
	User 					= require('../models/User'),
	EmployeesChild 			= require('../models/EmployeesChild'),
	Faculty 				= require('../models/Faculty'),
	Specialization 			= require('../models/Specialization');

var orm = new Waterline();


orm.loadCollection(Employees);
orm.loadCollection(EmployeesEducation);
orm.loadCollection(EmployeesGrade);
orm.loadCollection(EmployeesPosition);
orm.loadCollection(Grade);
orm.loadCollection(Position);
orm.loadCollection(University);
orm.loadCollection(User);
orm.loadCollection(EmployeesChild);
orm.loadCollection(Faculty);
orm.loadCollection(Specialization);


module.exports.initialize = function(app, PORT, callback) {

	orm.initialize(connectConfig, function(err, models) {
		if(err) throw err;

		callback(models.collections, models.connections);
	});
}
