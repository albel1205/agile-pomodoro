chrome.app.runtime.onLaunched.addListener(function(launchData){
	chrome.app.window.create('../index.html',{
		'id': 'AdvancePomodoro',
		'innerBounds':{
			'width':1076,
			'height': 720
		},
		'resizable': false
		// frame:'none'
	})
})