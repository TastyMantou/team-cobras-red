'use strict';

const path = require('path');
let db = require('./db');

module.exports = function (app, passport) {

	/******************************normal routes***************************************/
	// home page
	app.get('/', function (req, res) {
		res.sendFile('index.html', {
			root: './../'
		})
	});

	// account data
	app.get('/account', isLoggedIn, function (req, res) {
		// get account data from db
	});


    // tasks data
    app.get('/tasks', isLoggedIn, function (req, res) {
        res.sendFile('tasks.html', { root: './../' });
    });

    // logout data
    app.get('/logout', function (req, res) {
        req.logout();
        return res.send({ message: 'User logged out.' });
    });

    // still need routes for password change, task update, admin view, password reset request, password reset

    // process a login
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send(info);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                // need to send email and all tasks for logged in user - same as gettasks route but with user email too
                return res.send(req.user.email);
            })
        })(req, res, next);
    });

    // process a sign up
    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send(info);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err)
                }

                return res.send(req.user.email)
            });
        })(req, res, next);
    })

	const taskSortBy = " ORDER BY display_order ASC";
	//Task Data
	app.get('/adminView', function (req, res) {
		//todo limit to login user
		var sqlStatement = "SELECT * FROM task ORDER BY user_id ASC" ;
		db.serialize(function () {
			db.all(sqlStatement, function (err, rows) {
				if (err) {
					res.send(err);
				} else {
					res.send(rows);
				}

			});
		});
	});

	app.get('/task/:task_id', function (req, res) {
		var taskId = req.params.task_id;
		//todo limit to login in user
		var sqlStatement = "SELECT * FROM task WHERE task.task_id = $taskId" + taskSortBy;
		db.serialize(function () {
			db.get(sqlStatement, {
					$taskId: taskId,
				},
				function (err, row) {
					if (err) {
						res.send(err);
					} else {
						res.send(row);
					}
				});
		});
	});

	app.post('/insertTask', function (req, res, next) {

		var taskObject = req.body;

		var taskId = taskObject.task_id;
		var userId = taskObject.user_id;
		var priority = taskObject.priority;
		var task_des = taskObject.task_description;
		var completed = parseInt(taskObject.completed, 10);
		var display_order = taskObject.display_order;

		var sqlPreparedStatement = "INSERT INTO task(task_id, user_id, priority, task_description, completed, display_order) " +
			"VALUES ($taskId, $userId, $priority, $task_des, $completed, $display_order)";

		db.serialize(function () {
			db.run(sqlPreparedStatement, {
					$taskId: taskId,
					$userId: userId,
					$priority: priority,
					$task_des: task_des,
					$completed: completed,
					$display_order: display_order
				},
				function (error) {
					if (error) {
						res.send(error);
					} else {
						res.send('Successfully inserted task into database');
					}
				});
		});

	});

	app.put('/updateTask', function (req, res, next) {

		var taskObject = req.body;

		var taskId = taskObject.task_id;
		var priority = taskObject.priority;
		var task_des = taskObject.task_description;
		var completed = parseInt(taskObject.completed, 10);
		var display_order = taskObject.display_order;

		var sqlPreparedStatement = 'UPDATE task ' +
			'SET priority = $priority, task_description = $task_des, completed = $completed, display_order = $display_order ' +
			'WHERE task.task_id = $taskId';

		db.serialize(function () {
			db.run(sqlPreparedStatement, {
					$taskId: taskId,
					$priority: priority,
					$task_des: task_des,
					$completed: completed,
					$display_order: display_order
				},
				function (error) {
					if (error) {
						res.send(error);
					} else {
						res.send('Successfully update task into database');
					}
				});
		});

	});

	app.delete('/deleteTask/:task_id', function (req, res) {
		var taskId = req.params.task_id;
		var sqlPreparedStatement = 'DELETE FROM task WHERE task.task_id = $taskId';

		db.serialize(function () {
			db.run(sqlPreparedStatement, {
					$taskId: taskId,
				},
				function (error) {
					if (error) {
						res.send(error);
					} else {
						res.send('Successfully deleted task from the database');
					}
				});
		});

	});

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	} // if authenticated then go to next middleware
	res.json({
		message: 'user not logged in. Please login'
	}); // if not authenticated then redirect to home page
}
