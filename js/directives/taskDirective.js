function taskDirective() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			task : '=',
			onDragging : '&',
			index: '@'
		},
		templateUrl : 'task.html'
	}
}