function ToDoController($scope, pageService){	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 3;
	}
	
	$scope.backToInventory = function(){
		pageService.setCurrentPageId(2);
	}
}