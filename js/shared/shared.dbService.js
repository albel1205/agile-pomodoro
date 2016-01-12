var taskTypes = {
	skip: 1,
	transfer:2,
	optimize:3,
	perform:4
};

var taskContainerTypes = {
	ActivityInventory: 1,
	Todo: 2,
	Urgent: 3
}

var interruptionTypes = {
	internal: 1,
	external: 2
}

//
// Note: each request will create a separated connection to the indexeddb database
//
function dbService($q, $rootScope)
{
	var database = null;
	
	var service = {
		addGoal:addGoal,
		getContainer: getContainer,
		addTasks: addTasks,
		getAllActivities:getAllActivities,
		getAllTodoActivities:getAllTodoActivities,
		getAllUrgentActivities:getAllUrgentActivities
	};
	
	function addGoal(goal){
		var deffered = $q.defer();
		
		addDbGoal(goal, function(goal){
			addDbTaskContainer({
				goalId:goal.id,
				containerType: taskContainerTypes.ActivityInventory
			}, function(container){
				addDbTaskContainer({
					goalId:goal.id,
					containerType: taskContainerTypes.Todo
				}, function(container){
					addDbTaskContainer({
						goalId:goal.id,
						containerType: taskContainerTypes.Urgent
					}, function(container){
						deffered.resolve(container.goalId);
					});
				});
			});
		})
		return deffered.promise;
	};
	
	function addDbGoal(goal,callback){
		openDb(function(db){
			db.goal.add(goal).then(function(item){
				db.close();//close the database
				callback(item[0]);
			});
		});
	}
	
	function addTasks(tasks){
		var deffered = $q.defer();
		addDbTask(tasks, function(response){
			deffered.resolve(response);
		});
		return deffered.promise;
	}
	
	function getContainer(goalId, taskContainerType){
		var deffered = $q.defer();
		getGoalContainerByType(goalId, taskContainerType, function(container){
			deffered.resolve(container);
		});
		
		return deffered.promise;
	}
	
	function getGoalContainerByType(goalId, containerType, callback){
		openDb(function(db){
			db.taskContainer
			.query()
			.filter('containerType', containerType)
			.filter('goalId', goalId)
			.execute()
			.then(function(results){
				var container = (results[0]);
				db.close();
				callback(container);
			});
		});
	}
	
	//private
	function addDbTask(task, callback){
		openDb(function(db){
			db.task.add(task).then(function(item){
				db.close();//close the database
				callback(item[0]);
			});
		});
	}
	
	function updateTask(task){
		var deffered = $q.defer();
		updateDbTask(task, function(updatedTask){
			deffered.resolve(updatedTask.id);
		});
		return deffered.promise;
	};
	
	//private
	function updateDbTask(task, callback){
		openDb(function(db){
			db.task.update(task).then(function(item){
				db.close();//close the database
				callback(item[0]);
			});
		});
	};
	
	function getAllActivities(goalId){
		var deffered = $q.defer();
		openDb(function(db){
			db.taskContainer
			.query()
			.filter(function(taskContainer){
				return taskContainer.containerType == taskContainerTypes.ActivityInventory
						&& taskContainer.goalId == goalId;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				db.task.query().filter(function(task){
					return task.containerId == containerId;
				}).execute().then(function(tasks){
					db.close();
					deffered.resolve(tasks);	
				});
			});
		});
		return deffered.promise;
	};
	
	function getAllTodoActivities(goalId){
		var deffered = $q.defer();
		openDb(function(db){
			db.taskContainer
			.query()
			.filter(function(taskContainer){
				return taskContainer.containerType == taskContainerTypes.Todo
						&& taskContainer.goalId == goalId;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				db.task.query().filter(function(task){
					return task.containerId == containerId;
				}).execute().then(function(tasks){
					db.close();
					deffered.resolve(tasks);	
				});
			});
		});
		return deffered.promise;
	};
	
	function getAllUrgentActivities(goalId){
		var deffered = $q.defer();
		openDb(function(db){
			db.taskContainer
			.query()
			.filter(function(taskContainer){
				return taskContainer.containerType == taskContainerTypes.Urgent
						&& taskContainer.goalId == goalId;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				db.task.query().filter(function(task){
					return task.containerId == containerId;
				}).execute().then(function(tasks){
					db.close();//close the database
					deffered.resolve(tasks);	
				});
			});
		});
		return deffered.promise;
	};
	
	function addDbTaskContainer(container, callback){
		openDb(function(db){
			db.taskContainer.add(container).then(function(newContainer){
				db.close();
				callback(newContainer[0]);
			});
		})
	}
	
	//private
	function openDb(callback){
		db.open({
			server:'agile-pomodoro',
			version:1,
			schema:{
				goal:{
					key: {keyPath:'id', autoIncrement: true},
					indexes:{
						description:{},
						fromDate:{},
						toDate:{}
					}
				},
				taskContainer:{
					key: {keyPath:'id', autoIncrement: true},
					indexes:{
						goalId:{},
						containerType: {}
					}
				},
				task:{
					key: {keyPath:'id', autoIncrement: true},
					indexes:{
						containerId:{},
						description:{},
						pomodoros:{},
						taskType:{}
					}
				},
				interruption:{
					key: {keyPath:'id', autoIncrement: true},
					indexes:{
						taskId:{},
						description:{},
						deadline:{},
						interruptionType:{}
					}
				}
			}
		}).then(function(result){
			callback(result);
		});
	}
	
	return service;
}



