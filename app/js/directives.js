'use strict';

/* Directives */

var myApp =angular.module('myApp.directives', []);
  myApp.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]); 
  myApp.directive('navBarTop', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'title': '@'
    },
    template:
		'<header id="header" class="container">'+
					'<div class="row">' +
						'<div class="12u">' +
						'<h1><a href="#" id="logo">{{title}}</a></h1>'+
						'<nav id="nav" class="nav" ng-transclude>' + '</nav>'+
					 '</div>'
					+ '</div>' +
		'</header>',
    replace: true
  };
});
  myApp.directive('navLocation', function($location) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'href': '@'
    },
    template:  '<a ng-transclude></a>',
    replace: true
  };
});

myApp.directive('grid', function(){
	return {
		restrict: 'E',
		transclude: true,
		scope: {title:'@', width:'@', height:'@', tile:'='},
		template: '<div class="gridface" ng-class="{width:width, height: height, flipped:tile.flipped}">'+
				 '<h2> {{title}} </h2>'+
					'</div>', replace:true
	};
}); 
