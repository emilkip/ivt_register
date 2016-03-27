
var async = require('async');


module.exports = {

	getAllUniversity: function(req, res) {

		req.models.university
			.find()
			.sort({ title: 'asc' })
			.then(function(university) {
				res.json({ status: true, university: university });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	getOneUniversity: function(req, res) {

	},

	create: function(req, res) {

		var body = req.body;

		req.models.university
			.create({
				title: body.title,
				country: body.country
			})
			.then(function(university) {
				res.json({ status: true, university: university });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	edit: function(req, res) {

	},

	delete: function(req, res) {

		req.models.university
			.destroy({
				id: req.body.id
			})
			.then(function() {

				req.models.employeeseducation
					.destroy({
						university: req.body.id
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
						university: req.body.id
					},{
						university: null
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
	}
};