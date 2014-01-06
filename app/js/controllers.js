'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope',function($scope, $timeout) {
	  //Carousel
	  $scope.slides = [];
	  $scope.slides.push({text: 'All your tasks brought to you at one place', image: 'img/todocarousel.jpg'});
	  $scope.slides.push({text: 'Manage your tasks effectively', image: 'img/carousel2withtxt.jpg'});
	  $scope.slides.push({text: 'Wake up with this app on your tablet', image: 'img/clockcarousel.jpg'});
	  
	  $scope.setActive = function(idx) {
		$scope.slides[idx].active=true;
	  } 
	   // Grid data
	  $scope.grids = [{title:'Email'}, {title:'Time'}, {title:'Weather'}, {title:'News'}];
		$scope.date = new Date();	  
		
	  // Time and date
	  /*$scope.date = {};
	  $scope.format = 'h mm ss';
	  
	  $scope.updateTime = function() {
		$scope.date.raw = new Date();
		
	  }
	  $timeout(updateTime, 1000);
		updateTime();	*/	
  }])
  .controller('MyCtrl2', ['$scope',function($scope, $timeout) {
	  //Carousel
	  $scope.slides = [];
	  $scope.slides.push({text: 'All your tasks brought to you at one place', image: 'img/todocarousel.jpg'});
	  $scope.slides.push({text: 'Manage your tasks effectively', image: 'img/carousel2withtxt.jpg'});
	  $scope.slides.push({text: 'Wake up with this app on your tablet', image: 'img/clockcarousel.jpg'});
	  
	  $scope.setActive = function(idx) {
		$scope.slides[idx].active=true;
	  } 
	   // Grid data
	  $scope.grids = [{title:'Email'}, {title:'Time'}, {title:'Weather'}, {title:'News'}];
		$scope.date = new Date();	  
		
	  // Time and date
	  /*$scope.date = {};
	  $scope.format = 'h mm ss';
	  
	  $scope.updateTime = function() {
		$scope.date.raw = new Date();
		
	  }
	  $timeout(updateTime, 1000);
		updateTime();	*/	
  }])
  .controller('TodoCtrl', ['$scope',function($scope) {
		$scope.todos = [
		{text:'learn angular', done:true},
		{text:'build an angular app', done:false}];
	 
	  $scope.addTodo = function() {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	  };
	 
	  $scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
		  count += todo.done ? 0 : 1;
		});
		return count;
	  };
	 
	  $scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
		  if (!todo.done) $scope.todos.push(todo);
		});
	  };
	}])
	.controller('DateCtrl', ['$scope',function($scope) {
		$scope.v = {
        Dt: Date.now()
    }
	}])
	.controller('MyCtrl2', [function() {
		
	}])
	
	.controller('CalendarCtrl', ['$scope', function($scope) {
		
	}])
	;
  