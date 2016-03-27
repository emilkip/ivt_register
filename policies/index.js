
module.exports = {

	isAuthorized: function(req, res, next) {

		if(!req.user) {
			res.redirect('/login');
		} else {
			next();
		}
	},


	isAdmin: function(req, res, next) {

		if(!req.user) {
			res.redirect('/login');
		} else {
			if(req.user.admin) {
				next();
			} else {
				res.redirect('/');
			}
		}
	}

};