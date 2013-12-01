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
      var scopes = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/tasks'];

      // Use a button to handle authentication the first time.
      function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
       // window.setTimeout(checkAuth,1);
      }

      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }


      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          //authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
		console.log('loaded');
          var request = gapi.client.calendar.events.list({
            'calendarId': 'vallividhyavenkatesan@gmail.com',
			'timeMax':'2013-12-1T11:59:00.0z',
			'timeMin':'2013-11-30T12:00:00.0z'
          });
		  console.log('Request: ' + JSON.stringify(request));
          request.execute(function(resp) {
            var heading = document.createElement('h4');
            var desc = document.createElement('h2');
			var respJson = JSON.stringify(resp);
			console.log('Response: '+ respJson);
            desc = resp.items.length;
			var parsedjson = JSON.parse(respJson);
			var output = '';
			console.log("Num of items = " + desc);
			for (var i=0; i< desc; i++) {
					output+= parsedjson.items[i].summary;
					output+= '<br>';
			}		
			$('#ev').html(output);
			$('#authorize-button').hide();
          });
        });
      }
 