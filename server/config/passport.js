'use strict';

let LocalStrategy = require('passport-local').Strategy;

// load the user model
let User = require('../app/models/user');

module.exports = function (passport) {

    // serialize user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });
    // deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user)
        })
    });

    /******************************login login***************************/
    passport.use('local-login', new LocalStrategy({
            // override default fields in passport module
            usernameField:     'email',
            passwordField:     'password',
            // pass in request from route to check if a user is logged in
            passReqToCallback: true
        },
        function (req, email, password, done) {
            // async for login to be done before db access
            process.nextTick(function () {
                // find user by email
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err) {
                        return done(err)
                    }

                    // if no user is found send flash
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'))
                    }
                    // if invalid password send flash
                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                    }// else login successful
                    else {
                        return done(null, user)
                    }
                })
            })
        }));

    /************************local sign up***************************************/
    passport.use('local-signup', new LocalStrategy({
            usernameField:     'email',
            passwordField:     'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            process.nextTick(function () {
                // see if email is used already
                User.findOne({ 'local.email': email }, function (err, existingUser) {
                    // if error stop db connection and return error
                    if (err) {
                        return done(err)
                    }

                    // if email exists then send flash
                    if (existingUser) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                    }

                    //  if login successful connect to new local account
                    if (req.user) {
                        let user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err) {
                                throw err
                            }
                            return done(null, user)
                        })
                    }
                    // else create new local account
                    else {
                        // create user model
                        let newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err) {
                                throw err
                            }
                            return done(null, newUser)
                        })
                    }

                })
            })
        }))

}; // end of module.exports function
