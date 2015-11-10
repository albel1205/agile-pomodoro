function WeekGoalController
	($scope, pageService, dbService, openDbService)
{
	$scope.init = function(){
		dbService.openDb().then(function(result){
			console.log(result);
		});	
	};
	
	$scope.go = function(){
		pageService.setCurrentPageId(2);
	};
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 1;
	}
}
