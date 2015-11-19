function InventoryController
	($scope, pageService, dbService)
{
	$scope.showModal = false;
	$scope.taskDescription = '';
	$scope.taskPomodoros = 0;
	$scope.selectedTaskTypeVal = 1;
	
	$scope.openTaskPopup = function(){
		$scope.showModal = true;
	};
	
	$scope.closeTaskPopup= function(){
		$scope.showModal = false;
	};
	
	$scope.addTask = function(){
		$scope.showModal = false;
	};
	
	$scope.addSkipTask = function(){
		
	};
	
	$scope.addTransferTask =function(){
		
	};
	
	$scope.addOptimizeTask = function(){
		
	};
	
	$scope.addPerformTask = function(){
		
	};
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 2;
	};
	
	$scope.goToToDoPage = function(){
		pageService.setCurrentPageId(3);
	};
	
	$scope.backToWeekGoal = function(){
		pageService.setCurrentPageId(1);
	}
	
	
	function create
}
