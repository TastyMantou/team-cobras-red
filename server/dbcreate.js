'use strict';

const bcrypt = require('bcrypt-nodejs');
const fs = require("fs");

// get db file and check to see if it exists
const file = "reddittasker.db";
const exists = fs.existsSync(file);

// connect to db
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(file);

// if db file doesnt exist then create user table
db.serialize(function() {
	if (!exists) {
		db.run("CREATE TABLE if NOT EXISTS users(username VARCHAR(50) unique, password VARCHAR(50))");
}





function setUser (userobj, cb) {
	// store {user, password} from userobj parameter into db
	// return {user, password, id}
}

function getUser (username, cb) {
	// get user column from userObj parameter from db
	//  return userObj
}





module.exports = {
	setUser,
	getUser
}


