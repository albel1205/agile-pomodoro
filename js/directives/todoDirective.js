function todoDirective() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			todo : '=',
			onDragging : '&'
		},
		templateUrl : 'todo.html'
	}
}