function pageService($rootScope,$window){
	var currentPageId = 1;
	$window.rootScopes = $window.rootScopes || [];
	$window.rootScopes.push($rootScope);
	
	$window.pageService = {
		getCurrentPageId: function(){
			return currentPageId;
		},
		setCurrentPageId: function(id){
			currentPageId = id;
			angular.forEach($window.rootScopes, function(scope){
				if(!scope.$$phase){
					scope.$apply();
				}
			});
		}
	}
	
	return $window.pageService; 
}

