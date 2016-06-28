'use strict';

const path = require('path')
let db = require('./db')

module.exports = function (app, passport) {

    /******************************normal routes***************************************/
    // home page
    app.get('/', function (req, res) {
    	res.sendFile('index.html', { root: './../' })
    });

    // account data
    app.get('/account', isLoggedIn, function (req, res) {
        // get account data from db
    });

    // tasks data
    app.get('/tasks', isLoggedIn, function (req, res) {
        // get tasks from db with username info
    });

    // logout data
    app.get('/logout', function (req, res) {
        req.logout();
        return res.send({ message: 'User logged out.'} )
    });


    // still need routes for password change, task update, admin view, password reset request, password reset
    



    // process a login
    app.post('/login', function(req, res, next) {
    	passport.authenticate('local-login', function (err, user, info) {
    		if (err) return next(err)

	    	if (!user) return res.send(info)

			req.logIn(user, function(err) {
	    		if (err) return next(err)
	    		// need to send email and all tasks for logged in user - same as gettasks route but with user email too
	    		return res.send(req.user.email)
	    	})
		})(req, res, next)
	})


    // process a sign up
    app.post('/signup', function(req, res, next) {
    	passport.authenticate('local-signup', function (err, user, info) {
    		if (err) return next(err)

	    	if (!user) return res.send(info)

	    	req.logIn(user, function(err) {
	    		if (err) return next(err)

	    		return res.send(req.user.email)
	    	})
		})(req, res, next)
	})
};





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } // if authenticated then go to next middleware
    res.json( {message: 'user not logged in. Please login'} ); // if not authenticated then redirect to home page
}