'use strict';

module.exports = function (app, passport) {

    /******************************normal routes***************************************/
    // show home page
    app.get('/', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') })
    });
    // show profile page
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        })
    });

    app.get('/tasks', isLoggedIn, function (req, res) {
        res.render('tasks.ejs', {
            user: req.user
        })
    });

    // logout page
    app.get('/logout', function (req, res) {
        req.logout();
        res.render('login.ejs', { message: req.flash('loginMessage') })
    });

    /*******************************local authentication****************************/
    // show login page
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') })
    });

    // process a login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // if success redirect to profile page
        failureRedirect: '/login', // if failure rediect to login page
        failureFlash:    true // allow flash messages
    }));

    /******show sign up page*****/
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('loginMessage') })
    });

    /******process a sign up*****/
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash:    true
    }));

    /***************************unlink local account******************************/
    app.get('/unlink/local', function (req, res) {
        let user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function () {
            res.redirect('/profile')
        })
    })
};

/********** check to see if user is authenticated for profile access***********/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } // if authenticated then go to next middleware
    res.redirect('/'); // if not authenticated then redirect to home page
}