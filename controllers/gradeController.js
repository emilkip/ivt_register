
var async = require('async');


module.exports = {

	getAllGrade: function(req, res) {

		req.models.grade
			.find()
			.sort({ title: 'asc' })
			.then(function(grade) {
				res.json({ status: true, grade: grade });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	getOneGrade: function(req, res) {

	},

	create: function(req, res) {

		var body = req.body;

		req.models.grade
			.create({
				title: body.title
			})
			.then(function(grade) {
				res.json({ status: true, grade: grade });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},

	edit: function(req, res) {

	},

	delete: function(req, res) {

		req.models.grade
			.destroy({
				id: req.body.id
			})
			.then(function() {
				req.models.employeesgrade
					.destroy({
						grade: req.body.id
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
						grade: req.body.id
					},{
						grade: null
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