
var express 	= require('express'),
	User 		= require('../controllers/userController'),
	Position 	= require('../controllers/positionController'),
	Employees 	= require('../controllers/employeesController'),
	Grade 		= require('../controllers/gradeController'),
	University 	= require('../controllers/universityController'),
	upload 		= require('../configs/upload');

var api = express.Router();


//=======================================
// Users
//=======================================
api.get('/users', User.getAllUsers);
api.get('/users/:id', User.getOneUser);
api.post('/users/create', User.create);
api.post('/users/:id/update', User.edit);
api.post('/users/:id/remove', User.delete);
api.get('/users/get_user', User.getUser);


//=======================================
// Employees
//=======================================
api.get('/employees', Employees.getAllEmployees);
api.post('/employees/create', upload.photo.single('file'), Employees.create);
api.get('/employees/:id', Employees.getOneEmployees);
api.post('/employees/edit', upload.photo.single('file'), Employees.edit);
api.post('/employees/delete', Employees.delete);


//=======================================
// Grade
//=======================================
api.get('/grade', Grade.getAllGrade);
api.get('/grade/:id', Grade.getOneGrade);
api.post('/grade/create', Grade.create);
api.post('/grade/delete', Grade.delete);


//=======================================
// Position
//=======================================
api.get('/position', Position.getAllPosition);
api.get('/position/:id', Position.getOnePosition);
api.post('/position/create', Position.create);
api.post('/position/delete', Position.delete);


//=======================================
// University
//=======================================
api.get('/university', University.getAllUniversity);
api.get('/university/:id', University.getOneUniversity);
api.post('/university/create', University.create);
api.post('/university/delete', University.delete);


//=======================================
// University
//=======================================
api.get('/faculty', Position.getAllFaculty);
api.post('/faculty/create', Position.createFaculty);
api.post('/faculty/delete', Position.deleteFaculty);
api.get('/faculty/specializations', Position.getAllSpec);
api.post('/faculty/specializations/create', Position.createSpecialization);
api.post('/faculty/specializations/delete', Position.deleteSpecialization);

module.exports = api;