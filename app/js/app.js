'use strict';

//console.log('In app js');
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/home_es', {templateUrl: 'partials/partial1.html?lang=es', controller: 'MyCtrl'});
 // $routeProvider.when('/', {templateUrl: '/index.html', controller: 'CarouselCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);