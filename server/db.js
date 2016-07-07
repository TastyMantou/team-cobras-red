'use strict';

const fs = require("fs")

// get db file and check to see if it exists
const file = "sqlite/sqlite3"
const exists = fs.existsSync(file)

// connect to db
let sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database(file)

// if db file doesnt exist then create user table
db.serialize(function() {
	if (!exists) {
		db.run('CREATE TABLE "task" ("task_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ON CONFLICT ROLLBACK COLLATE RTRIM, "user_id" INTEGER NOT NULL ON CONFLICT ROLLBACK,"priority" INTEGER DEFAULT 1, "task_description" TEXT,"completed" INTEGER DEFAULT 0,"display_order" INTEGER, CONSTRAINT "fk_task_user_1" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id"), CONSTRAINT "TASK_PRIMARY_UN" UNIQUE ("task_id" ASC) ON CONFLICT ROLLBACK); CREATE TABLE "user" ("user_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "username" TEXT NOT NULL,"password" TEXT NOT NULL,"isAdmin" INTEGER NOT NULL DEFAULT 0, CONSTRAINT "USERNAME_UN" UNIQUE ("username" ASC) ON CONFLICT ROLLBACK);')
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