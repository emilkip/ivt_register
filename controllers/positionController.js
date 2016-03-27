
var async = require('async');


module.exports = {

	getAllPosition: function(req, res) {

		req.models.position
			.find()
			.sort({ title: 'asc' })
			.then(function(position) {
				res.json({ status: true, position: position });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	getOnePosition: function(req, res) {

	},

	getAllFaculty: function(req, res) {
		req.models.faculty
			.find()
			.sort({ title: 'asc' })
			.populate('specialization')
			.then(function(faculties) {
				res.json({ status: true, faculties: faculties });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	getAllSpec: function(req, res) {
		req.models.specialization
			.find()
			.sort({ title: 'asc' })
			.populate('faculty')
			.then(function(specs) {
				res.json({ status: true, specs: specs });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	create: function(req, res) {

		var body = req.body;

		req.models.position
			.create({
				title: body.title
			})
			.then(function(position) {
				res.json({ status: true, position: position });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},


	delete: function(req, res) {

		req.models.position
			.destroy({
				id: req.body.id
			})
			.then(function() {
				req.models.employeesposition
					.destroy({
						position: req.body.id
					})
					.then(function() {
						res.json({ status: true });
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});

				req.models.employees
					.update({
						position: req.body.id
					},{
						position: null
					})
					.then(function() {})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},


	createFaculty: function(req ,res) {
		var body = req.body;

		req.models.faculty
			.create({
				title: body.title
			})
			.then(function(faculty) {
				res.json({ status: true, faculty: faculty });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},


	deleteFaculty: function(req ,res) {
		req.models.position
			.destroy({
				id: req.body.id
			})
			.then(function(faculty) {
				req.models.specialization
					.destroy({
						faculty: faculty.id
					})
					.then(function() {
						res.json({ status: true });
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},


	createSpecialization: function(req ,res) {
		var body = req.body;

		req.models.specialization
			.create({
				title: body.title,
				faculty: body.faculty
			})
			.then(function(spec) {
				res.json({ status: true, spec: spec });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},


	deleteSpecialization: function(req ,res) {
		req.models.specialization
			.destroy({
				id: req.body.id
			})
			.then(function() {
				res.json({ status: true });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	}
};