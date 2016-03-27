
var multer = require('multer');


module.exports = {

	photo: multer({
		dest: 'public/images/photos'
	})
};