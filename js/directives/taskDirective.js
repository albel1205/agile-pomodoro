function taskDirective() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			task : '=',
			onDragging : '&',
			index: '@'
		},
		templateUrl : 'taskInfo.html'
	}
}