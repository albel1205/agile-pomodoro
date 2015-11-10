$.material.init();//init the bootstrap material componenets

var AgilePomodoroApp = angular.module('AgilePomodoroApp',['ngRoute','sharedApp']); 

AgilePomodoroApp.controller('WeekGoalController',['$scope','pageService', 'dbService', 'openDbService', WeekGoalController]);
AgilePomodoroApp.controller('InventoryController',['$scope','pageService', 'dbService', InventoryController]);
AgilePomodoroApp.controller('TaskController',['$scope','pageService', 'dbService', TaskController]);