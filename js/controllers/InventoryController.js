function InventoryController($scope, pageService){
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 2;
	};
	
	$scope.goToToDoPage = function(){
		pageService.setCurrentPageId(3);
	};
	
	$scope.backToWeekGoal = function(){
		pageService.setCurrentPageId(1);
	}
}