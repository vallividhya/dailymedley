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
      '<div class="navbar navbar-fixed-top">' +
        '<div class="navbar-inner">' +
          '<div class="container">' +
            '<a class="brand" href="#/">{{title}}</a>' +
            '<ul class="nav" ng-transclude></ul>' +
          '</div>' +
        '</div>' +
      '</div>',
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
    link: function (scope) {
      scope.location = function (href) {
        return href.substr(1) === $location.url();
      };
    },
    template: '<li ng-class="{active: location(href)}">' +
        '<a href="{{href}}" ng-transclude></a>' +
      '</li>',
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
