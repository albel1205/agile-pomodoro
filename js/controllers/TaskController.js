function TaskController
	($scope, pageService, dbService)
{	
	$scope.inventoryActivities = [];
	$scope.todoActivities=[];
	$scope.urgentActivities=[];
	
	$scope.init = function(){
		pageService.registerObserverCallback(onUpdatePageId);
	}
	
	function onUpdatePageId(currentPageId){
		if(currentPageId == 3){
			var goalId = pageService.getCurrentGoalId();
			
			$scope.inventoryActivities = [];
			$scope.todoActivities=[];
			$scope.urgentActivities=[];
			
			dbService.getAllActivities(goalId).then(function(inventoryActivities){
				$scope.inventoryActivities = inventoryActivities;
				console.log(inventoryActivities);
				
				dbService.getAllTodoActivities(goalId).then(function(todos){
					$scope.todoActivities = todos;	
					console.log(todos);
					
					dbService.getAllUrgentActivities(goalId).then(function(urgents){
						$scope.urgentActivities = urgents;	
						console.log(urgents);
					});
				});	
			});
		}
	}
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 3;
	};
	
	$scope.backToInventory = function(){
		pageService.setCurrentPageId(2);
	};
}
