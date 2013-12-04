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
}

function checkAuth() {
	console.log("In check auth");
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult); 
}

function handleAuthResult(authResult) {
	console.log('Button click called handleAuthResult');

	if (authResult) {
		if (!authResult.error) {
			gapi.auth.setToken(authResult);
			userLoggedIn = true;
			localStorage.setItem('dm_user_loggedIn', true);
			doSomething();
		} else {
			console.log('Auth result has error.');			
			localStorage.setItem('dm_user_loggedIn', false);
		}
	} else {
		console.log('Auth result is null.');
	}
}
function doSomething() {
	console.log('In do func');
	$('#authorize-button').hide();
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
	var tm = new Date();
	gapi.client.load('calendar', 'v3', function() {
		var request = gapi.client.calendar.events.list({
			'calendarId': emailId,
			'timeMax':'2013-12-5T7:59:59.0z',
			'timeMin':'2013-12-4T8:00:00.0z',
			'singleEvents':true,
			'orderBy':'startTime'
		});

		request.execute(function(resp) {
			var heading = document.createElement('h4');
			var desc = document.createElement('h2');
			var respJson = JSON.stringify(resp);
			desc = resp.items.length;
			var parsedjson = JSON.parse(respJson);
			console.log(parsedjson);
			var output = '';
			output += '<ul class="check-list">';
			for (var i=0; i< desc; i++) {
				output += '<li>';
				output+= parsedjson.items[i].summary;
				output += '</li>';
			}	
			output += '</ul>';
			$('#ev').html(output);
			$('#authorize-button').hide();
		});
	});
	getTasksList();
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
			console.log("Num of items = " + desc);
			for (var i=0; i< desc; i++) {
				output+= parsedjson.items[i].title;
				output+= '<br>';
			}		
			$('#tasklist').html(output);
		});
	});	  
}
