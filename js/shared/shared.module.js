var sharedApp = angular.module('sharedApp',[]);

sharedApp.factory('pageService',['$rootScope','$window', pageService]);
sharedApp.factory('dbService', ['$q','$rootScope',dbService]);
sharedApp.factory('openDbService', ['$q','$rootScope',openDbService]);