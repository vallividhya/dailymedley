angular.module('myApp', []).controller('CarouselCtrl', ['$scope',function($scope)
 {
	console.log("In carousel js");
		$scope.slides = [];
		$scope.slides.push({text:'All at one place', image: 'img/carousel1.png'});
		$scope.slides.push({text:'Best task management app', image: 'img/carousel2.png'});
		$scope.setActive = function(idx) {
			$scope.slides[idx].active=true;
		}
		/*$scope.addSlide = function() {
			var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
			slides.push({
				image: ['img/carousel1.png/' + newWidth + '/200', 'img/carousel2.png'],
				text:  ['All at one place', 'Best task management app'][slides.length % 3]
			});
		}; for (var i=0; i<3; i++) {
			$scope.addSlide();
		}*/
  }]);