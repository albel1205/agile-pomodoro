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
		getAllActivities:getAllActivities,
		getAllTodoActivities: getAllTodoActivities,
		getAllUrgentActivities:getAllUrgentActivities,
		assignTaskToTodo: assignTaskToTodo,
		addInterruption:addInterruption
	};
	
	function addGoal(goal){
		var deffered = $q.defer();
		openDb(function(){
			database.goal.add(goal).then(function(item){
				database.close();//close the database
				deffered.resolve(item.id);
			});
		});
		return deffered.promise;
	};
	
	function addTask(task){
		var deffered = $q.defer();
		openDb(function(){
			database.task.add(task).then(function(item){
				database.close();//close the database
				deffered.resolve(item.id);
			});
		});
		return deffered.promise;
	};
	
	function updateTask(task){
		var deffered = $q.defer();
		openDb(function(){
			database.task.update(task).then(function(item){
				database.close();//close the database
				deffered.resolve(item.id);
			});
		});
		return deffered.promise;
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
	
	function openDb(callback){
		db.open({
			server:'agile-pomodoro',
			version:1,
			schema:{
				goal:{
					key: {keyPath:'id', autoIncrement: true},
					indexes:{
						packageInventoryId:{},
						packageTodoId: {},
						packageUrgentId:{},
						year: {},
						weekNumber: {}
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
			database = result;
			callback();
		});
	}
	
	return service;
}



