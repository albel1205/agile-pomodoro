var taskTypes = {
	skip: 1,
	transfer:2,
	optimize:3,
	perform:4
};

function InventoryController
	($scope, pageService, dbService)
{
	$scope.showModal = false;
	$scope.taskDescription = '';
	$scope.numberOfPomodoros = 0;
	$scope.selectedTaskTypeVal = taskTypes.skip;
	
	$scope.skipTasks = [];
	$scope.transferTasks = [];
	$scope.performTasks = [];
	$scope.optimizeTasks = [];
	
	$scope.openTaskPopup = function(taskType){
		clearPopupData();
		$scope.selectedTaskTypeVal = taskType;
		
		$scope.showModal = true;
	};
	
	function clearPopupData(){
		$scope.taskDescription = '';
		$scope.numberOfPomodoros = 0;
	}
	
	$scope.closeTaskPopup= function(){
		$scope.showModal = false;
	};
	
	$scope.addTask = function(){
		var isAdded = addTask();
		$scope.showModal = !isAdded;
	};
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 2;
	};
	
	$scope.goToToDoPage = function(){
		saveAllTask(function(){
			pageService.setCurrentPageId(3);	
		});
	};
	
	$scope.backToWeekGoal = function(){
		pageService.setCurrentPageId(1);
	}
	
	function addTask(){
		if(!$scope.taskDescription || $scope.taskDescription == ''
		|| !$scope.numberOfPomodoros || $scope.numberOfPomodoros == '' || $scope.numberOfPomodoros == 0){
			return false;
		}
		
		var task = {
			header: $scope.taskDescription,
			numberOfPomodoros: $scope.numberOfPomodoros,
			taskType: $scope.selectedTaskTypeVal
		}
		
		if(task.taskType == taskTypes.skip) addSkipTask(task);
		if(task.taskType == taskTypes.transfer) addTransferTask(task);
		if(task.taskType == taskTypes.perform) addPerformTask(task);
		if(task.taskType == taskTypes.optimize) addOptimizeTask(task);
		
		return true;
	}
	
	function saveAllTask(callback){	
		var goalId = pageService.getCurrentGoalId();
			
		dbService
		.getContainer(goalId, taskContainerTypes.ActivityInventory)
		.then(function(container){
			var tasks = [];
			var containerId = container.id;
		
			angular.forEach($scope.skipTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.header,
					pomodoros:task.numberOfPomodoros,
					taskType:taskTypes.skip
				});
			});
			
			angular.forEach($scope.transferTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.header,
					pomodoros:task.numberOfPomodoros,
					taskType:taskTypes.transfer
				});
			});
			
			angular.forEach($scope.performTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.header,
					pomodoros:task.numberOfPomodoros,
					taskType:taskTypes.perform
				});
			});
			
			angular.forEach($scope.optimizeTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.header,
					pomodoros:task.numberOfPomodoros,
					taskType:taskTypes.optimize
				});
			});
			
			
			dbService
			.addTasks(tasks)
			.then(function(response){
				callback();
			});
		});
		
		
	}
	
	function addSkipTask(task){
		$scope.skipTasks.push(task);
	}
	
	function addTransferTask(task){
		$scope.transferTasks.push(task);
	}
	
	function addOptimizeTask(task){
		$scope.optimizeTasks.push(task);
	}
	
	function addPerformTask(task){
		$scope.performTasks.push(task);
	}
}
