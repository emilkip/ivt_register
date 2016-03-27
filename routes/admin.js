var express = require('express'),
	passport = require('passport'),
	Admin = require('../controllers/adminController'),
	policy = require('../policies/index');

var admin = express.Router();



admin.get('/', policy.isAdmin, Admin.mainPage);


module.exports = admin;