function WeekGoalController($scope, pageService, dbService){	
	$scope.go = function(){
		pageService.setCurrentPageId(2);
	};
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 1;
	}
}