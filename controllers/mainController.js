
var passport = require('passport'),
	Users = require('../models/User');


module.exports = {

	mainPage: function(req, res) {

		res.render('index', { user: req.user });
	},


	loginPage: function(req, res) {

		res.render('login', {});
	},


	login: function(req, res) {

		res.redirect('/');
	},


	logout: function(req, res) {

		req.logout();
		res.redirect('/');
	},


	reg: function(req, res) {

		res.render('reg', {});
	},


	createUser: function(req, res) {

		var body = req.body;

		req.models.users.findOne({
			username: body.username
		})
		.then(function(resultUser) {
			if(typeof resultUser == 'undefined') {
				req.models.users.create({
					username: body.username,
					password: body.password
				})
				.then(function(createdUser) {

					passport.authenticate('local', function(err, user, info) {
						if (err) console.log(err);

						req.logIn(user, function(err) {

							if (err) console.log(err);
							res.redirect('/');
						});
					})(req, res);
				});
			} else {
				res.send('Пользователь уже усществует');
			}
		})
		.catch(function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	}
};