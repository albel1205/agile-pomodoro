$.material.init();//init the bootstrap material componenets

var AgilePomodoroApp = angular.module('AgilePomodoroApp',['ngRoute','sharedApp']); 

AgilePomodoroApp.controller('WeekGoalController',['$scope','pageService', WeekGoalController]);
AgilePomodoroApp.controller('InventoryController',['$scope','pageService', InventoryController]);
AgilePomodoroApp.controller('ToDoController',['$scope','pageService', ToDoController]);