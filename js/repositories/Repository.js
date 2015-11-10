function Repository(dataStoreName, version){
	var tDB = {};
	var dataStore = [];
	var vers = version || 1;
	var storeName = dataStoreName || '';
	
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
			callback(request.result);
		}
		
		request.onerror = tDB.onError;
	};
	
	tDB.get = function(id, callback){
		var transaction = tDB.transaction([storeName]);
		var objectStore = transaction.objectStore(storeName);
		var request = objectStore.get(id);
		
		request.onsuccess = function(event){
			callback(request.result);
		};
		
		request.onerror = tDB.onError;
	};
	
	tDB.getAll = function(callback){
		var objectStore = tDB.transaction(storeName).objectStore(storeName);
		var result =[]; var count = 0;
		objectStore.openCursor().onsuccess = function(event){
			var cursor = event.target.result;
			if(cursor){
				result.push(cursor.value); count++;
				cursor.continue();
			}else{
				console.log('finished retrieving ' + count + 'items.');
				callback(result);
			}
		};
	};
	
	tDB.save = function(record, callback){
		if(record.Id == 0){
			add(record, callback);			
		}else{
			update(record, callback);
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
	
	function update(obj, callback){
		var objectStore = tDB.transaction([storeName],'readwrite')
								.objectStore(storeName);
		var request = objectStore.get(obj.Id);
		request.onsuccess = function(event){
			var entity = request.result;
			entity = obj;
			var putRequest = objectStore.put(entity);
			putRequest.onsuccess = function(event){
				callback(putRequest.result);
			};
			
			putRequest.onerror= tDB.onError();
		};
		
		request.onerror = tDB.onError;
	};
	
	tDB.delete = function(id, callback){
		var request = tDB.transaction([storeName],'readwrite')
							 .objectStore(storeName)
							 .delete(id);
		request.onsuccess = function(event){
			callback(request.result);
		};
		
		request.onerror = tDB.onError;
	};
	
	tDB.onError = function(e){
		console.log(e);	
	};
	
	return tDB;
}