
var async = require('async'),
	moment = require('moment'),
	_ = require('lodash');


module.exports = {


	getAllEmployees: function(req, res) {

		req.models.employees
			.find()
			.sort({ lastName: 'asc' })
			.then(function(employees) {
				if(typeof employees != 'undefined')
					res.json({ status: true, employees: employees });
				else
					res.json({ status: false });
			})
			.catch(function(err) {
				console.log(err);
				res.json({ status: false });
			});
	},


	getOneEmployees: function(req, res) {

		async.waterfall([
			function(cb) {

				req.models.employees
					.findOne({ id: req.params.id })
					.then(function(employees) {
						if(typeof employees != 'undefined') {
							cb(null, employees);
						}
						else
							res.json({ status: false });
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(employees, cb) {

				req.models.employeesposition
					.find({ employees: req.params.id })
					.populate('position')
					.populate('faculty')
					.populate('specialization')
					.then(function(position) {
						cb(null, employees, position);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(employees, position, cb) {
				req.models.employeesgrade
					.find({ employees: req.params.id })
					.populate('grade')
					.then(function(grade) {
						cb(null, employees, position, grade);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(employees, position, grade, cb) {
				req.models.employeeseducation
					.find({ employees: req.params.id })
					.populate('university')
					.then(function(educations) {
						cb(null, employees, position, grade, educations);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(employees, position, grade, educations, cb) {
				req.models.employeeschild
					.find({ employees: req.params.id })
					.then(function(childs) {
						cb(null, employees, position, grade, educations, childs);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			}
		], function(err, employees, position, grade, educations, childs) {

			if(err) {
				console.log(err);
				res.json({ status: false });
			} else {
				res.json({
					status: 	true,
					employees: 	employees,
					positions: 	position,
					grades: 		grade,
					educations: educations,
					childs: 	childs
				})
			}
		});
	},


	create: function(req, res) {

		var body = req.body,
			file = req.file,
			photo,
			birthday;


		body.childs = typeof body.childs == 'undefined' ? [] : body.childs;
		body.educations = typeof body.educations == 'undefined' ? [] : body.educations;
		body.positions = typeof body.positions == 'undefined' ? [] : body.positions;
		body.grades = typeof body.grades == 'undefined' ? [] : body.grades;

		if(body.birthday.year != '' && body.birthday.month != '' && body.birthday.day != '')
			birthday = new Date(body.birthday.year, body.birthday.month - 1, body.birthday.day);
		else
			birthday = null;

		if(typeof file != 'undefined') photo = file.filename;
		else photo = 'placeholder.png';

		async.waterfall([
			function(cb) {
				req.models.employees
					.create({
						firstName: 	body.firstName != '' ? body.firstName : undefined,
						lastName: 	body.lastName != '' ? body.lastName : undefined,
						middleName: body.middleName != '' ? body.middleName : undefined,
						passportNum: body.passportNum != '' ? body.passportNum : undefined,
						address: 	body.address != '' ? body.address : undefined,
						telephone: 	body.telephone != '' ? body.telephone : undefined,
						photo: 		photo,
						birthday: 	birthday
					})
					.then(function(employees) {
						cb(null, employees);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(employees, cb) {
				if(body.positions.length != 0) {

					body.positions.forEach(function(item, i) {
						if(_.has(item, 'position')) {
							req.models.employeesposition
								.create({
									employees: 		employees.id,
									position: 		item.position,
									faculty: 		item.faculty || null,
									specialization: item.spec || null,
									yearOfBegin: 	typeof item.yearOfBegin == 'undefined' ? null : item.yearOfBegin,
									yearOfEnd: 		typeof item.yearOfEnd == 'undefined' ? null : item.yearOfEnd,
									documentNum: 	typeof item.documentNum == 'undefined' || item.documentNum == 'null' ? null : item.documentNum
								})
								.then(function() {})
								.catch(function(err) {
									console.log(err);
								});
						}
					});
				}

				cb(null, employees);
			},
			function(employees, cb) {
				if(body.grades.length != 0) {

					body.grades.forEach(function(item, i) {
						if(_.has(item, 'grade')) {
							req.models.employeesgrade
								.create({
									employees: 		employees.id,
									grade: 			item.grade,
									year: 			typeof item.year == 'undefined' ? null : item.year,
									documentNum: 	typeof item.documentNum == 'undefined' ? null : item.documentNum
								})
								.then(function() {})
								.catch(function(err) {
									console.log(err);
								});
						}

					});
				}

				cb(null, employees);
			},
			function(employees, cb) {

				if(body.educations.length != 0) {

					body.educations.forEach(function(item, i) {
						if(_.has(item, 'university')) {
							req.models.employeeseducation
								.create({
									employees: 		employees.id,
									university: 	item.university,
									spec: 			typeof item.spec == 'undefined' ? null : item.spec,
									yearOfBegin: 	typeof item.yearOfBegin == 'undefined' ? null : item.yearOfBegin,
									yearOfEnd: 		typeof item.yearOfEnd == 'undefined' ? null : item.yearOfEnd,
									documentNum: 	typeof item.documentNum == 'undefined' ? null : item.documentNum
								})
								.then(function() {})
								.catch(function(err) {
									console.log(err);
								});
						}
					});
				}

				cb(null, employees);
			},
			function(employees, cb) {

				if(body.childs.length != 0) {

					body.childs.forEach(function(item, i) {

						req.models.employeeschild
							.create({
								employees: employees.id,
								firstName: item.firstName,
								lastName: item.lastName,
								birthday: item.birthday
							})
							.then(function() {})
							.catch(function(err) {
								console.log(err);
							});
					});
				}

				cb(null, employees);
			}

		], function(err, employees) {

			if(err) {
				console.log(err);
				res.json({ status: false });
			} else {
				res.json({
					status: true,
					employees: employees
				})
			}
		});
	},


	edit: function(req, res) {

		var body = req.body,
			file = req.file,
			photo,
			birthday;

		body.childs = typeof body.childs == 'undefined' ? [] : body.childs;
		body.educations = typeof body.educations == 'undefined' ? [] : body.educations;
		body.positions = typeof body.positions == 'undefined' ? [] : body.positions;
		body.grades = typeof body.grades == 'undefined' ? [] : body.grades;

		if(body.birthday.year != '' && body.birthday.month != '' && body.birthday.day != '')
			birthday = new Date(body.birthday.year, body.birthday.month - 1, body.birthday.day);
		else
			birthday = null;

		if(typeof file != 'undefined') photo = file.filename;
		else photo = body.photo;


		async.waterfall([
			function(cb) {
				req.models.employees
					.update({
						id: body.id
					}, {
						firstName: 		body.firstName,
						lastName: 		body.lastName,
						middleName: 	body.middleName,
						passportNum: 	body.passportNum,
						address: 		body.address,
						telephone: 		body.telephone,
						photo: 			photo,
						birthday: 		new Date(body.birthday.year, body.birthday.month - 1, body.birthday.day)
					})
					.then(function(employees) {
						cb(null, employees);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			}
			,function(employees, cb) {

				req.models.employeesposition
					.destroy({ employees: body.id })
					.then(function() {

						if(body.positions.length != 0) {

							body.positions.forEach(function(item, i) {
								if(_.has(item, 'position')) {
									req.models.employeesposition
										.create({
											employees: 		body.id,
											position: 		typeof item.position != 'undefined' ? item.position.id : null,
											faculty: 		typeof item.faculty != 'undefined' ? item.faculty.id : null,
											specialization: typeof item.specialization != 'undefined' ? item.specialization.id : null,
											yearOfBegin: 	typeof item.yearOfBegin == 'undefined' || item.yearOfBegin == 'null' ? null : item.yearOfBegin,
											yearOfEnd: 		typeof item.yearOfEnd == 'undefined' || item.yearOfEnd == 'null' ? null : item.yearOfEnd,
											documentNum: 	typeof item.documentNum == 'undefined' || item.documentNum == 'null' ? null : item.documentNum
										})
										.then(function() {})
										.catch(function(err) {
											console.log(err);
										});
								}
							});
						}

						cb(null, employees);
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			function(employees, cb) {

				req.models.employeesgrade
					.destroy({ employees: body.id })
					.then(function() {

						if(body.grades.length != 0) {

							body.grades.forEach(function(item, i) {
								if(_.has(item, 'grade')) {
									req.models.employeesgrade
										.create({
											employees: 		body.id,
											grade: 			typeof item.grade != 'undefined' ? item.grade.id : null,
											year: 			typeof item.year == 'undefined' || item.year == 'null' ? null : item.year,
											documentNum: 	typeof item.documentNum == 'undefined' || item.documentNum == 'null' ? null : item.documentNum
										})
										.then(function() {})
										.catch(function(err) {
											console.log(err);
										});
								}

							});
						}

						cb(null, employees);
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			function(employees, cb) {

				req.models.employeeseducation
					.destroy({ employees: body.id })
					.then(function() {

						body.educations.forEach(function(item, i) {
							if(_.has(item, 'university')) {
								req.models.employeeseducation
									.create({
										employees: 		body.id,
										university: 	typeof item.university != 'undefined' ? item.university.id : null,
										spec: 			typeof item.spec == 'undefined' || item.spec == 'null' ? null : item.spec,
										yearOfBegin: 	typeof item.yearOfBegin == 'undefined' || item.yearOfBegin == 'null' ? null : item.yearOfBegin,
										yearOfEnd: 		typeof item.yearOfEnd == 'undefined' || item.yearOfEnd == 'null' ? null : item.yearOfEnd,
										documentNum: 	typeof item.documentNum == 'undefined' || item.documentNum == 'null' ? null : item.documentNum
									})
									.then(function() {})
									.catch(function(err) {
										console.log(err);
									});
							}
						});

						cb(null, employees);
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			function(employees, cb) {

				req.models.employeeschild
					.destroy({ employees: body.id })
					.then(function() {

						if(body.childs.length != 0) {

							body.childs.forEach(function(item, i) {

								req.models.employeeschild
									.create({
										employees: body.id,
										firstName: item.firstName,
										lastName: item.lastName,
										birthday: item.birthday
									})
									.then(function() {})
									.catch(function(err) {
										console.log(err);
									});
							});
						}

						cb(null, employees);
					})
					.catch(function(err) {
						console.log(err);
					});
			}

		], function(err, employees) {

			if(err) {
				console.log(err);
				res.json({ status: false });
			} else {
				res.json({
					status: true,
					employees: employees
				})
			}
		});
	},


	delete: function(req, res) {

		async.waterfall([
			function(cb) {
				req.models.employees
					.destroy({ id: req.body.id })
					.then(function() {
						cb(null);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(cb) {
				req.models.employeesposition
					.destroy({ employees: req.body.id })
					.then(function() {
						cb(null);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(cb) {
				req.models.employeesgrade
					.destroy({ employees: req.body.id })
					.then(function() {
						cb(null);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(cb) {
				req.models.employeeseducation
					.destroy({ employees: req.body.id })
					.then(function() {
						cb(null);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			},
			function(cb) {
				req.models.employeeschild
					.destroy({ employees: req.body.id })
					.then(function() {
						cb(null);
					})
					.catch(function(err) {
						console.log(err);
						res.json({ status: false });
					});
			}

		], function(err) {

			if(err) {
				console.log(err);
				res.json({ status: false });
			} else {
				res.json({ status: true });
			}
		});
	}
};