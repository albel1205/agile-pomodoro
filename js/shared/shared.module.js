var sharedApp = angular.module('sharedApp',[]);

sharedApp.factory('pageService',['$rootScope','$window', pageService]);
sharedApp.factory('dbService', ['$rootScope','$window', dbService]);