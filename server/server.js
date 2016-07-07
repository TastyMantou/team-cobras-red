'use strict';

let express = require('express'),
    passport = require('passport'),
    flash = require('connect-flash'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    session = require('express-session');

let app = express();
const port = process.env.PORT || 8080;

require('./passport')(passport); // pass passport object to auth functions

app.use(cookieParser()); // cookies for auth
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    name: 'redditTaskSessions',
    secret: 'fghtr@#$fh56SD234Fdvf',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use for flash messages stored in session


// load routes and pass in app and configured passport
require('./routes')(app, passport);

app.all('*', function (err, req, res, next) {
    res.json({message: 'Error with the server.'})
})


// create server object
let server = http.createServer(app);
// booting up server function
let boot = function () {
    server.listen(port, function () {
        console.log('Express server listening on port ', port);
    })
};
// shutdown server function
let shutdown = function () {
    server.close()
};

// if main module then start server else pass to exports
if (require.main === module) {
    boot()
} else {
    module.exports = {
        boot: boot,
        shutdown: shutdown,
        port: port,
        server: server,
        app: app
    }
}