function TaskController
	($scope, pageService, dbService)
{
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 3;
	}
	
	$scope.backToInventory = function(){
		pageService.setCurrentPageId(2);
	}
}
