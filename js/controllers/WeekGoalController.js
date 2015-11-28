function WeekGoalController
	($scope, pageService, dbService)
{
	$scope.weekGoal = '';
	
	$scope.init = function(){
		
	};
	
	$scope.go = function(){
		if($scope.weekGoal != ''){
			var monday = moment().day("Monday");
			var sunday = moment().day("Sunday");
			
			dbService.addGoal({
				description: $scope.weekGoal,
				fromDate: monday.toDate().toUTCString(),
				toDate: sunday.toDate().toUTCString()
			}).then(function(key){
				console.log('goalId: ' + key);
				pageService.setCurrentGoalId(key);
				pageService.setCurrentPageId(2);
			});
		}
	};
	
	$scope.isCurrentPage = function(){
		return pageService.getCurrentPageId() == 1;
	}
}
