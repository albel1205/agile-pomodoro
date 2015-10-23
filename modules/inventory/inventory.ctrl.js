function InventoryController($scope, pageService){
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 2;
	}
}