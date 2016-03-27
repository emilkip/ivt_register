var express = require('express'),
	passport = require('passport');

var router = express.Router();

var Main = require('../controllers/mainController'),
	policy = require('../policies/index');



router.get('/',  Main.mainPage);

router.get('/login', Main.loginPage);

router.post('/login', passport.authenticate('local', {
	successRedirect: '/', 
	failureRedirect: '/login' 
}), Main.login);

router.get('/logout', Main.logout);

router.get('/reg', Main.reg);

router.post('/reg', Main.createUser);


module.exports = router;
