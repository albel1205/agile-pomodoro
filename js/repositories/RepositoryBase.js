function RepositoryBase(dataStoreName, version){
	var tDB = {};
	var dataStore = [];
	var vers = version;
	var storeName = dataStoreName;
	
	tDB.open = function(callback){
		var request = indexedDB.open('agilePomodoroDB', vers);
		
		request.onupgradeneeded = function(e){
			var db = e.target.result;
			
			e.target.transaction.onerror = tDB.onError;
			
			// create new dataStore if it is not exists
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { autoIncrement : true });
			}		
		}
		
		request.onsuccess= function(e){
			dataStore = e.target.result;
			callback();
		}
		
		request.onerror = tDB.onError;
	};
	
	tDB.get = function(id){
		
	};
	
	tDB.getAll = function(){
		
	};
	
	tDB.save = function(record){
		if(record.Id == 0){
			add(record);			
		}else{
			update(record);
		}
	};
	
	function add(obj, callback){
		var transaction = tDB.transaction([storeName], "readwrite");
		var objectStore = transaction.objectStore(storeName);
		objectStore.add(obj);
		
		transaction.oncomplete = function(event){
			callback();
		};
		
		transaction.onerror= tDB.onError;
	};
	
	function update(obj){
		
	};
	
	tDB.delete = function(id){
		
	};
	
	tDB.filter = function(opts){
		
	}
	
	tDB.onError = function(e){
		console.log(e);	
	};
	
	return tDB;
}