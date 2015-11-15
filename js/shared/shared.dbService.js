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
		addTask: addTask,
		updateTask:updateTask,
		deleteTask:deleteTask,
		getAllActivities:getAllActivities,
		getAllTodoActivities: getAllTodoActivities,
		getAllUrgentActivities:getAllUrgentActivities,
		assignTaskToTodo: assignTaskToTodo,
		addInterruption:addInterruption,
		addPackageInventory: addPackageInventory,
		addPackageTodo: addPackageTodo,
		addPackageUrgent: addPackageUrgent
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
			database = db;
			database.goal.add(goal).then(function(item){
				database.close();//close the database
				callback(item[0]);
			});
		});
	}
	
	function addTask(task){
		var deffered = $q.defer();
		addDbTask(task, function(newTask){
			deffered.resolve(newTask.id);
		});
		return deffered.promise;
	};
	
	//private
	function addDbTask(task, callback){
		openDb(function(db){
			database = db;
			database.task.add(task).then(function(item){
				database.close();//close the database
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
			database = db;
			database.task.update(task).then(function(item){
				database.close();//close the database
				callback(item[0]);
			});
		});
	};
	
	function getAllActivities(){
		var deffered = $q.defer();
		openDb(function(){
			database.taskContainer
			.query()
			.filter(function(){
				return taskContainer.containerType == taskContainerTypes.ActivityInventory;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				database.task.query().filter(function(){
					return task.containerId == containerId;
				}).execute().then(function(tasks){
					database.close();
					deffered.resolve(results);	
				});
			});
		});
		return deffered.promise;
	};
	
	function getAllTodoActivities(){
		var deffered = $q.defer();
		openDb(function(){
			database.taskContainer
			.query()
			.filter(function(){
				return taskContainer.containerType == taskContainerTypes.Todo;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				database.task.query().filter(function(){
					return task.containerId == containerId;
				}).execute().then(function(tasks){
					database.close();
					deffered.resolve(results);	
				});
			});
		});
		return deffered.promise;
	};
	
	function getAllUrgentActivities(){
		var deffered = $q.defer();
		openDb(function(){
			database.taskContainer
			.query()
			.filter(function(){
				return taskContainer.containerType == taskContainerTypes.Urgent;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				database.task.query().filter(function(){
					return task.containerId == containerId;
				}).execute().then(function(tasks){
					database.close();//close the database
					deffered.resolve(results);	
				});
			});
		});
		return deffered.promise;
	};
	
	function assignTaskToTodo(task){
		var deffered = $q.defer();
		openDb(function(){
			database.taskContainer
			.query()
			.filter(function(){
				return taskContainer.containerType == taskContainerTypes.Todo;
			})
			.execute()
			.then(function(results){
				var containerId = (results[0]).id;
				task.containerId = containerId;
				database.task.update(task).then(function(item){
					database.close();//close the database
					deffered.resolve(item.id);
				});
			});
		});
		return deffered.promise;
	};
	
	function addInterruption(interruption){
		var deffered = $q.defer();
		openDb(function(){
			database.interruption.add(interruption).then(function(item){
				database.close();//close the database
				deffered.resolve(item.id);
			});
		});
		return deffered.promise;
	}
	
	function deleteTask(id){
		var deffered = $q.defer();
		deleteDbTask(id, function(key){
			deffered.resolve(key);
		})
		return deffered.promise;
	}
	
	//private
	function deleteDbTask(id, callback){
		openDb(function(db){
			database = db;
			database.task.remove(id).then(function(key){
				database.close();//close the database
				callback(key);
			});
		});
	}
	
	function addPackageInventory(goalId){
		var deffered = $q.defer();
		
		addDbTaskContainer({
			goalId:goalId,
			containerType: taskContainerTypes.ActivityInventory
		}, function(container){
			deffered.resolve(container.id);
		});
		
		return deffered.promise;
	}
	
	function addPackageTodo(goalId){
		var deffered = $q.defer();
		
		addDbTaskContainer({
			goalId:goalId,
			containerType: taskContainerTypes.Todo
		}, function(container){
			deffered.resolve(container.id);
		});
		
		return deffered.promise;
	}
	
	function addPackageUrgent(goalId){
		var deffered = $q.defer();
		
		addDbTaskContainer({
			goalId:goalId,
			containerType: taskContainerTypes.Urgent
		}, function(container){
			deffered.resolve(container.id);
		});
		
		return deffered.promise;
	}
	
	function addDbTaskContainer(container, callback){
		openDb(function(db){
			database = db;
			database.taskContainer.add(container).then(function(newContainer){
				database.close();
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
			//database = result;
			callback(result);
		});
	}
	
	return service;
}



