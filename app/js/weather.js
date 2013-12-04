
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
			var weathe = parsedJson['current_observation']['weather'];
			var feelslike = parsedJson['current_observation']['feelslike_f'];
			//alert("Current temperature in " + location + " is: " + temp_f);
			var output = '';
			output += '<ul class="calendar-event">';
			output += '<li> Tempature:      <span class="att">' + temp_f + '  F</span></li>';
			output += '<li> Weather:        <span class="att">' + weathe + '</span></li>';
			output += '<li> Feels like:     <span class="att">' + feelslike + '   F</span></li>';
			output += '</ul>';
			$('#loc').html(location);
			$('#weather').html(output);
		}
	});
}
//http://api.wunderground.com/api/04ef0d8ed5694814/conditions/q/CA/San_Jose.json?lat=37&lon=-121


