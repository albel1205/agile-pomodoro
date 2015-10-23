chrome.app.runtime.onLaunched.addListener(function(launchData){
	chrome.app.window.create('../index.html',{
		id: "AdvancePomodoro",
		innerBounds:{
			minWidth:1076,
			minHeight: 700
		}
		// frame:'none'
	})
})