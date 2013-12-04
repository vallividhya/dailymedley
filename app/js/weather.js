
$(document).ready(function($) {
	getLocation();
});

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		$('#weather').html('Geolocation is not supported by this browser.');
	}
}

function showPosition(position) {
	showWeather(position);
	var op = '';
	op+= 'Latitude: ';
	op+= position.coords.latitude;
	op+= 'Longitude: ';
	op+= position.coords.longitude;	
	console.log('op is ' + op);
	//$('#weather').html(op);
}

function showWeather(position) {
	var apiStr = '';
	apiStr+= 'http://api.wunderground.com/api/04ef0d8ed5694814/conditions/q/CA/San_Jose.json?lat=';
	apiStr+= position.coords.latitude;
	apiStr+= '&lon=';
	apiStr+= position.coords.longitude;	
	//apiStr = '';
	//apiStr += 'http://api.wunderground.com/api/04ef0d8ed5694814/geolookup/conditions/q/CA/San_Jose.json';
	console.log("Weather API: " + apiStr);
	$.ajax({
		url : apiStr,
		dataType : "jsonp",

		success : function(parsedJson) {
			//var parsedJson = JSON.stringify(response);
			console.log("Current location is " + parsedJson);
			var location = parsedJson['current_observation']['display_location']['city'];
			var temp_f = parsedJson['current_observation']['temp_f'];
			//alert("Current temperature in " + location + " is: " + temp_f);
			var output = '';
				output += temp_f;
			$('#loc').html(location);
			$('#weather').html(output);
		}
	});
}
//http://api.wunderground.com/api/04ef0d8ed5694814/conditions/q/CA/San_Jose.json?lat=37&lon=-121


