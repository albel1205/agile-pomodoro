function WeekGoalController($scope, pageService){	
	$scope.go = function(){
		pageService.setCurrentPageId(2);
	};
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 1;
	}
}