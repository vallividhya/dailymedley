// Enter a client ID for a web application from the Google Developer Console.
// The provided clientId will only work if the sample is run directly from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// In your Developer Console project, add a JavaScript origin that corresponds to the domain
// where you will be running the script.
var clientId = '525616588033-57ad0bt5q090qhb0kudqbm53iqi861sn.apps.googleusercontent.com';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyC4WwU12AuPI0BuXrAH6fg5AsxpYydXcrs';

// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/plus.login'];



// Use a button to handle authentication the first time.
function handleClientLoad() {
	console.log("In handleClientLoad");
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth, 1);
}

function checkAuth() {
	console.log("In checkAuth");
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult); 
}

function forceAuth() {
	console.log("In forceAuth");
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult); 
}

function handleAuthResult(authResult) {
	console.log('Button click called handleAuthResult');

	if (authResult && !authResult.error) {
		gapi.auth.setToken(authResult);
		doSomething();
	} else {
		console.log('Auth result is null or has error.');
	}
}
function doSomething() {
	console.log('In do func');
	$('#esign').hide();
	$('#tb').show();
	populateUserInfo();
}
function populateUserInfo() {
	gapi.client.load('oauth2', 'v2', function() {
		var request = gapi.client.oauth2.userinfo.get();
		request.execute(function(resp) {
		localStorage.setItem('dm_user_loggedIn', true);
			var emailId = resp['email'];
			getCalendarEvents(emailId);
		});
	});
}
	
// Load the API and make an API call.  Display the results on the screen.
function getCalendarEvents(emailId) {
	var timeMini = moment().format("YYYY-MM-DD") + 'T7:59:59.0z';
	var tm = moment().add('d',1);
	var timeMaxi = tm.format("YYYY-MM-DD") + 'T8:00:00.0z';	
	console.log("TImeMin : " + timeMini + "TimeMax: " + timeMaxi);
	gapi.client.load('calendar', 'v3', function() {
		var request = gapi.client.calendar.events.list({
			'calendarId': emailId,
			'timeMax':timeMaxi,
			'timeMin':timeMini,
			'singleEvents':true,
			'orderBy':'startTime'
		});

		request.execute(function(resp) {
			var heading = document.createElement('h4');
			var desc = document.createElement('h2');
			var respJson = JSON.stringify(resp);
			if(resp.items != null) {
				desc = resp.items.length;
				}
				var parsedjson = JSON.parse(respJson);
				console.log(parsedjson);
				var output = '';
				output += '<ul class="calendar-event">';
				for (var i=0; i< desc; i++) {
					output += '<li>';
					output+= parsedjson.items[i].summary;
					var start = parsedjson.items[i].start;
					var startJson = JSON.stringify(start);
					var parsedStart = JSON.parse(startJson);
					//console.log(parsedStart.dateTime);
					var sta = moment(parsedStart.dateTime).format("hh:mm A");
					output+= '<div id="stTime">';
					output+= sta;
					output += ' - ';
					var end = parsedjson.items[i].end;
					var endJson = JSON.stringify(end);
					var parsedEnd = JSON.parse(endJson);
					//console.log(parsedStart.dateTime);
					var endt = moment(parsedEnd.dateTime).format("hh:mm A");
					output += endt;
					output += '</div>';
					output += '</li>';
			}	
			output += '</ul>';
			$('#ev').html(output);
			$('#authorize-button').hide();
			
		});
	});
	getWeekEvents(emailId);
	
}

function getWeekEvents(emailId) {
	var timeMini = moment().format("YYYY-MM-DD") + 'T7:59:59.0z';
	var tm = moment().add('d',7);
	var timeMaxi = tm.format("YYYY-MM-DD") + 'T8:00:00.0z';	
	console.log("TImeMin : " + timeMini + "TimeMax: " + timeMaxi);
	gapi.client.load('calendar', 'v3', function() {
		var request = gapi.client.calendar.events.list({
			'calendarId': emailId,
			'timeMax':timeMaxi,
			'timeMin':timeMini,
			'singleEvents':true,
			'orderBy':'startTime'
		});

		request.execute(function(resp) {
			var heading = document.createElement('h4');
			var desc = document.createElement('h2');
			var respJson = JSON.stringify(resp);
			if(resp.items != null) {
				desc = resp.items.length;
				}
				var parsedjson = JSON.parse(respJson);
				console.log(parsedjson);
				var output2 = '';
				output2 += '<ul class="calendar-event">';
				for (var i=0; i< desc; i++) {
					output2 += '<li>';
					output2+= parsedjson.items[i].summary;
					var start = parsedjson.items[i].start;
					var startJson = JSON.stringify(start);
					var parsedStart = JSON.parse(startJson);
					//console.log(parsedStart.dateTime);
					var sta = moment(parsedStart.dateTime).format("hh:mm A");
					output2+= '<div id="stTime">';
					output2+= sta;
					output2 += ' - ';
					var end = parsedjson.items[i].end;
					var endJson = JSON.stringify(end);
					var parsedEnd = JSON.parse(endJson);
					//console.log(parsedStart.dateTime);
					var endt = moment(parsedEnd.dateTime).format("hh:mm A");
					output2 += endt;
					output2 += '</div>';
					output2 += '</li>';
			}	
			output2 += '</ul>';
			$('#week').click(showWeekEvents(output2));
		});
	});
	getTasksList();
}

function showWeekEvents(disp) {
	console.log('fired showweekevents');
	var weekdisp = disp;
	//$('#evw').show();
	console.log(weekdisp);
	$('#ev').html(weekdisp);
}

function getTasksList() {
	gapi.client.load('tasks', 'v1', function() {
		var request = gapi.client.tasks.tasklists.list();
		request.execute(function(resp) {
			var respJson = JSON.stringify(resp);
			var desc = resp.items.length;
			var parsedjson = JSON.parse(respJson);
			var output = '';
			console.log("Num of items = " + desc);
			output += '<ul class="check-list">';
			for (var i=0; i< desc; i++) {
				var tlistid = parsedjson.items[i].id;
				output+= '<li class="button-small" id="' + tlistid + '" onclick="showTasks('+ tlistid +')">';
				output+= parsedjson.items[i].title;
				output+= '    >>';
				output+= '</li>';
				output+= '<br>';
			}
				output += '</ul>';			
			$('#tasklist').html(output);
			$('#authorize-button-tasks').hide();
		});
	});	 
}

var tasklid;
function showTasks(lid) {
	var listId = lid;
	tasklid = listId.id;
	console.log('listID= ' + tasklid);
	gapi.client.load('tasks', 'v1', function() {
		var l = tasklid;
		console.log('loaded showtasks for ' + l);
		var request = gapi.client.tasks.tasks.list({'tasklist':l});
		console.log('Request: ' + JSON.stringify(request));
		request.execute(function(resp) {
			var respJson = JSON.stringify(resp);
			console.log('Response: '+ respJson);
			var desc = resp.items.length;
			var parsedjson = JSON.parse(respJson);
			var output = '';
			output += '<ul class="check-list">';
			console.log("Num of items = " + desc);
			for (var i=0; i< desc; i++) {
				output += '<li>';
				output+= parsedjson.items[i].title;
				output+= '</li>';
			}
				
			$('#tasklist').html(output);
			$('#bk').show();
		});
	});	  
}

function showLists() {
	gapi.client.load('tasks', 'v1', function() {
		var request = gapi.client.tasks.tasklists.list();
		request.execute(function(resp) {
			var respJson = JSON.stringify(resp);
			var desc = resp.items.length;
			var parsedjson = JSON.parse(respJson);
			var output = '';
			console.log("Num of items = " + desc);
			output += '<ul class="check-list">';
			for (var i=0; i< desc; i++) {
				var tlistid = parsedjson.items[i].id;
				output+= '<li class="button-small" id="' + tlistid + '" onclick="showTasks('+ tlistid +')">';
				output+= parsedjson.items[i].title;
				output+= '    >>';
				output+= '</li>';
				output+= '<br>';
			}
				output += '</ul>';	
			$('#bk').hide();				
			$('#tasklist').html(output);
		});
	});
}


