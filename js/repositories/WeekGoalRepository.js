function WeekGoalRepository(){
	var tDB = {};
	var dataStore = [];
	
	tDB.open = function(callback){
		var version = 1;
		
		var request = indexedDB.open('agilePomodoroDB', version);
		
		request.onupgradeneeded = function(e){
			var db = e.target.result;
			
			e.target.transaction.onerror = tDB.onError;
			
			// Delete the old datastore.
			if (!db.objectStoreNames.contains('weekGoals')) {
				db.createObjectStore('weekGoals', { autoIncrement : true });
			}		
		}
		
		request.onsuccess= function(e){
			dataStore = e.target.result;
			callback();
		}
		
		request.onerror = tDB.onError;
	};
	
	tDB.onError = function(e){
		console.log(e);	
	};
	
	return tDB;
}