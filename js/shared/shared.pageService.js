function pageService($rootScope,$window){
	var currentPageId = 1;
	var goalId = 0;
	$window.rootScopes = $window.rootScopes || [];
	$window.rootScopes.push($rootScope);
	
	$window.pageService = {
		getCurrentPageId: function(){
			return currentPageId;
		},
		setCurrentPageId: function(id){
			currentPageId = id;
			notifyChanges();
		},
		getCurrentGoalId: function(){
			return goalId;	
		},
		setCurrentGoalId: function(id){
			goalId = id;
			notifyChanges();
		}
	}
	
	function notifyChanges(){
		angular.forEach($window.rootScopes, function(scope){
			if(!scope.$$phase){
				scope.$apply();
			}
		});
	}
	
	return $window.pageService; 
}

