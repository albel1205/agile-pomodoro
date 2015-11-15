$.material.init();//init the bootstrap material componenets

var AgilePomodoroApp = angular.module('AgilePomodoroApp',['ngRoute','ui.bootstrap.modal','sharedApp']); 
//register controllers
AgilePomodoroApp.controller('WeekGoalController',['$scope','pageService', 'dbService', WeekGoalController]);
AgilePomodoroApp.controller('InventoryController',['$scope','pageService', 'dbService', InventoryController]);
AgilePomodoroApp.controller('TaskController',['$scope','pageService', 'dbService', TaskController]);
