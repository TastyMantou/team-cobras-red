'use strict';

module.exports = function (app, passport) {

    /******************************normal routes***************************************/
    // home page
    app.get('/', function (req, res) {
    });

    // account data
    app.get('/account', isLoggedIn, function (req, res) {
        // get account data
    });

    // tasks data
    app.get('/tasks', isLoggedIn, function (req, res) {
        // get tasks from db with username info
    });

    // logout data
    app.get('/logout', function (req, res) {
        req.logout();
        res.send({message: 'User logged out.'})
    });


    // still need routes for password change, task update, admin view, password reset request, password reset
    






    /*******************************local authentication****************************/

    // process a login
    app.post('/login', passport.authenticate('local-login', { failureFlash: true }), function (req, res, next) {
        // req.user contains authenticated user
        // if this cb called then auth successful
        // need to send data to frontend
    });

    /******process a sign up*****/
    app.post('/signup', passport.authenticate('local-signup', { failureFlash: true }), function (req, res, next) {
        // same as above but for signup
    });
};







/********** check to see if user is authenticated for profile access***********/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } // if authenticated then go to next middleware
    res.send({message: 'user not logged in. Please login'}); // if not authenticated then redirect to home page
}