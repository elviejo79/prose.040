/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {
		e.preventDefault(); 
		//upload(e.dataTransfer.files[0]); 
		
		var client_id = "05bb67a8cbc5cee";
		var client_secret = "2327841166a94b0b90d275d4b1841e814a81d93d";
		
		var pin = getPin(client_id);
		console.log(pin);
		
		exchangePinForTokens(client_id, client_secret, pin);
		
}

function getPin(client_id){
	var resp = "pin";
    var state = "anything";
	
	//var pin_url = "https://api.imgur.com/oauth2/authorize?client_id="+ client_id +"&response_type="+ resp +"&state="+ state;
	
	var xhr = new XMLHttpRequest(); 

    xhr.open("POST", "https://api.imgur.com/oauth2/authorize?client_id="+ client_id +"&response_type="+ resp +"&state="+ state);
	console.log('OK');
	
	xhr.onreadystatechange = function (e) {
	  if (xhr.readyState == 4) {
		if(xhr.status == 200){
		   console.log(xhr);
	    }
	  else if(xhr.status == 400) {
			alert('There was an error processing the token.')
		}
		else {
		  alert('something else other than 200 was returned')
		}
	  }
	};
	
	xhr.send();

	return 'fin';
}

function exchangePinForTokens(client_id, client_secret, pin){

	var fd = new FormData();
    fd.append("client_id", client_id)
	fd.append("client_secret", client_secret);
	fd.append("grant_type", "pin");
    fd.append("pin", '8e6c0bd6f8'); 
	
    var xhr = new XMLHttpRequest(); 

    xhr.open("POST", "https://api.imgur.com/oauth2/token");
	
	console.log('POST 2');
	xhr.onreadystatechange = function (e) {
	  if (xhr.readyState == 4) {
		if(xhr.status == 200){
		   console.log('200 2');
		   console.log(xhr.responseText);
		   var token = JSON.parse(xhr.responseText).data.access_token;
		   console.log (token);
	    }
	  else if(xhr.status == 400) {
			alert('There was an error processing the token.')
		}
		else {
		  alert('something else other than 200 was returned')
		}
	  }
	};
	
	xhr.send(fd);
}