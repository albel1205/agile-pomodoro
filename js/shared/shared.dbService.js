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

function dbService($q, $rootScope)
{
	var database = null;
	
	var service = {
		openDb: openDb,
		addGoal:addGoal,
		addTask: addTask,
		updateTaskKind:updateTaskKind,
		updateTaskPomodoro:updateTaskPomodoro,
		getAllActivities:getAllActivities,
		getAllTodoActivities: getAllTodoActivities,
		getAllUrgentActivities:getAllUrgentActivities,
		assignTaskToTodo: assignTaskToTodo,
		addInternalInterrup:addInternalInterrup,
		addExternalInterrup:addExternalInterrup
	};
	
	function addGoal(){
		
	};
	
	function addTask(){
		
	};
	
	function updateTaskKind(){
		
	};
	
	function updateTaskPomodoro(){
		
	};
	
	function getAllActivities(){
		
	};
	
	function getAllTodoActivities(){
		
	};
	
	function getAllUrgentActivities(){
		
	};
	
	function assignTaskToTodo(){
		
	};
	
	function addInternalInterrup(){
		
	};
	
	function addExternalInterrup(){
		
	};
	
	function openDb(){
		var deferred = $q.defer();
	
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
			deferred.resolve(database);
		});
		
		return deferred.promise;
	};
	
	return service;
}



