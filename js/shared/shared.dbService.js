function dbService($rootScope,$window){
	$window.rootScopes = $window.rootScopes || [];
	$window.rootScopes.push($rootScope);
	
	$window.dbService = {
		testing: function(){
			return true;
		}
	}
	
	return $window.dbService;
}

