function taskDirective(){
	return {
		restrict:'E',
		replace: true,
		scope: {
			task: '='
		},
		templateUrl:'taskInfo.html'
	}
}