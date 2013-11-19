'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope',function($scope, $timeout) {
	  //Carousel
	  $scope.slides = [];
	  $scope.slides.push({text: 'All your tasks brought to you at one place', image: 'img/carousel1.png'});
	  $scope.slides.push({text: 'Manage your tasks effectively', image: 'img/carousel2.png'});
	  $scope.slides.push({text: 'Wake up with this app on your tablet', image: 'img/carousel3withtxt.jpg'});
	  
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
  .controller('MyCtrl2', [function() {

  }])
 ;
  