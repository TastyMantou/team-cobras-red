'use strict';

const fs = require("fs")

// get db file and check to see if it exists
const file = "reddittasker.db"
const exists = fs.existsSync(file)

// connect to db
let sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database(file)

// if db file doesnt exist then create user table
db.serialize(function() {
	if (!exists) {
		db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(50) unique, password varchar(100), salt varchar(50))")
	}
})


// set new user 
function setUser (user, cb) {
	db.run('INSERT INTO users (email, password) VALUES (?, ?)', [user.email, user.password], function(err) {
		// return err object and number of changes
		cb(err, this.changes)
	})
}

// get an existing user
function getUser (user, cb) {
	db.get('SELECT email, password FROM users WHERE email = ?', user, function(err, row) {
		// return err object and row result in json
		cb(err, row)
	})
}

// change password to existing user
function setPassword (user, cb) {

}

// get all task data from db of a user
function getUserTasks (user, cb) {

}

module.exports = {
	setUser,
	getUser,
	setPassword,
	getUserTasks
}