'use strict';

let LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs')

// load the db functions
let db = require('./db')


module.exports = function (passport) {

    // use user email from db and store in cookie session
    passport.serializeUser(function (user, done) {
        done(null, user.email)
    })

    // get user data from db by cookie session
    passport.deserializeUser(function (user, done) {
        db.getUser(user, function (err, user) {
            // if db error
            if (err) done(err)
            // if no user found
            if (!user) done(null, false)
            // if user found pass to next function
            done(err, user)
        })
    })



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
                // get user by email check if result exists and correct password
                db.getUser(email, function (err, user) {
                    if (err) return done(err)
                    // if user doesnt exist or wrong password then flash error message
                    if ( !user || !bcrypt.compareSync(password, user.password) ) {
                        return done(null, false, { message: 'Incorrect username or password.' })
                    }
                    else {
                        // else user found return user data to passport
                        return done(null, user)
                    }
                })
            })
        }))

    /************************local sign up***************************************/
    passport.use('local-signup', new LocalStrategy({
            usernameField:     'email',
            passwordField:     'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                // check to see if user already exists by email
                db.getUser(email, function (err, user) {
                    if (err) return done(err)

                    // if user is found in db then return flash that email is already taken
                    if (user) { 
                        return done(null, false, { message: 'Email is already taken.'} ) 
                    }
                    // else user doesnt exist and create new user with hashed password
                    if (email) {
                        // create new user object
                        let user = {}
                        user.email = email

                        // create salted/hashed password
                        let salt = bcrypt.genSaltSync(8)
                        user.password = bcrypt.hashSync(password, salt, null)

                        // create new user in db and return user if db is okay
                        db.setUser(user, function(err) {
                            if (err) return done(err)
                            return done(null, user)
                        })
                    }
                })
            })
        }))


} // end of module.exports function
