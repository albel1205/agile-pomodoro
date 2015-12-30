var taskTypes = {
	skip: 1,
	transfer:2,
	optimize:3,
	perform:4
};

function InventoryController
	($scope, pageService, dbService)
{
	$scope.draggedItem;
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
	
	$scope.onDropInSkipCallback= function(event, ui){
		if($scope.draggedItem){
			addSkipTask($scope.draggedItem);
			$scope.draggedItem = null;
		}
	}
	
	$scope.onDropInTransferCallback= function(event, ui){
		if($scope.draggedItem){
			addTransferTask($scope.draggedItem);
			$scope.draggedItem = null;
		}
	}
	
	$scope.onDropInOptimizeCallback= function(event, ui){
		if($scope.draggedItem){
			addOptimizeTask($scope.draggedItem);
			$scope.draggedItem = null;
		}
	}
	
	$scope.onDropInPerformCallback= function(event, ui){
		if($scope.draggedItem){
			addPerformTask($scope.draggedItem);
			$scope.draggedItem = null;
		}
	}
	
	$scope.onDragging = function(task){
		$scope.draggedItem = task;
		removeTask(task);
	}
	
	function removeTask(task){
		if(task.taskType == taskTypes.skip) removeSkipTask(task);
		if(task.taskType == taskTypes.transfer) removeTransferTask(task);
		if(task.taskType == taskTypes.perform) removePerformTask(task);
		if(task.taskType == taskTypes.optimize) removeOptimizeTask(task);
	}
	
	function removeSkipTask(task){
		var index = $scope.skipTasks.indexOf(task);
		$scope.skipTasks = removeItemAtIndex($scope.skipTasks, index);
		
		console.log('removed '+ task.description +' task from skips');
		console.log('skipTasks: ' + $scope.skipTasks.length);
	}
	
	function removeTransferTask(task){
		var index = $scope.transferTasks.indexOf(task);
		$scope.transferTasks = removeItemAtIndex($scope.transferTasks, index);
		
		console.log('removed '+ task.description +' task from transfers');
		console.log('transferTasks: ' + $scope.transferTasks.length);
	}
	
	function removePerformTask(task){
		var index = $scope.performTasks.indexOf(task);
		$scope.performTasks = removeItemAtIndex($scope.performTasks, index);
		
		console.log('removed '+ task.description +' task from perform');
		console.log('performTasks: ' + $scope.performTasks.length);
	}
	
	function removeOptimizeTask(task){
		var index = $scope.optimizeTasks.indexOf(task);
		$scope.optimizeTasks = removeItemAtIndex($scope.optimizeTasks, index);
				
		console.log('removed '+ task.description +' task from optimizes');
		console.log('optimizeTasks: ' + $scope.optimizeTasks.length);
	}
	
	function getIndexOfTask(array, task){
		var count = 0;
		angular.forEach(array, function(value, key){
			if(value.key == task.key){
				return count;
			}
			count++;
		});
	}
	
	function removeItemAtIndex(array, index){
		var count = 0;
		var result = [];
		angular.forEach(array, function(value, key){
			if(count != index){
				result.push(value);
			}
			count++;
		});
		
		return result;
	}
	
	function addTask(){
		if(!$scope.taskDescription || $scope.taskDescription == ''
		|| !$scope.numberOfPomodoros || $scope.numberOfPomodoros == '' || $scope.numberOfPomodoros == 0){
			return false;
		}
		
		var task = {
			key: guid(),
			description: $scope.taskDescription,
			pomodoros: $scope.numberOfPomodoros,
			taskType: $scope.selectedTaskTypeVal
		}
		
		if(task.taskType == taskTypes.skip) addSkipTask(task);
		if(task.taskType == taskTypes.transfer) addTransferTask(task);
		if(task.taskType == taskTypes.perform) addPerformTask(task);
		if(task.taskType == taskTypes.optimize) addOptimizeTask(task);
		
		return true;
	}
	
	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
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
					description:task.description,
					pomodoros:task.pomodoros,
					taskType:taskTypes.skip
				});
			});
			
			angular.forEach($scope.transferTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.description,
					pomodoros:task.pomodoros,
					taskType:taskTypes.transfer
				});
			});
			
			angular.forEach($scope.performTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.description,
					pomodoros:task.pomodoros,
					taskType:taskTypes.perform
				});
			});
			
			angular.forEach($scope.optimizeTasks, function(task){
				tasks.push({
					containerId:containerId,
					description:task.description,
					pomodoros:task.pomodoros,
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
		task.taskType = taskTypes.skip;
		$scope.skipTasks.push(task);
		console.log('added '+ task.description +' task into skips');
	}
	
	function addTransferTask(task){
		task.taskType = taskTypes.transfer;
		$scope.transferTasks.push(task);
		console.log('added '+ task.description +' task into transfers');
	}
	
	function addOptimizeTask(task){
		task.taskType = taskTypes.optimize;
		$scope.optimizeTasks.push(task);
		console.log('added '+ task.description +' task into optimizes');
	}
	
	function addPerformTask(task){
		task.taskType = taskTypes.perform;
		$scope.performTasks.push(task);
		console.log('added '+ task.description +' task into performs');
	}
}
