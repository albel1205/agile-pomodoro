$.material.init();//init the bootstrap material componenets

$(document).ready(function() {
    $('.select').dropdown({'dropdownClass':'thirsty', 'optionClass': 'withripple','fakeInputClass':'form-control'});
});

var AgilePomodoroApp = angular.module('AgilePomodoroApp',['ngRoute','ui.bootstrap.modal','sharedApp']); 
//register controllers
AgilePomodoroApp.controller('WeekGoalController',['$scope','pageService', 'dbService', WeekGoalController]);
AgilePomodoroApp.controller('InventoryController',['$scope','pageService', 'dbService', InventoryController]);
AgilePomodoroApp.controller('TaskController',['$scope','pageService', 'dbService', TaskController]);

AgilePomodoroApp.directive('task', taskDirective);
AgilePomodoroApp.filter('range', function(){
    return function(input, total){
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;  
    };
});
