/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {
		e.preventDefault(); 
		//upload(e.dataTransfer.files[0]); 
		
		var client_id = "162f8664c190969";
		var client_secret = "ed9ff3c498b9d9ad1c54c867a65024747e77009e";
		
		var pin = getPin(client_id);
		console.log(pin);
		
		exchangePinForTokens(client_id, client_secret, pin);
		
}

function getPin(client_id){
	var resp = "pin";
    var state = "anything";
	
	var pin_url = "https://api.imgur.com/oauth2/authorize?client_id="+ client_id +"&response_type="+ resp +"&state="+ state;

	return pin_url;
}

function exchangePinForTokens(client_id, client_secret, pin){

	var fd = new FormData();
    fd.append("client_id", client_id)
	fd.append("client_secret", client_secret);
	fd.append("grant_type", "pin");
    fd.append("pin", pin); 
	
    var xhr = new XMLHttpRequest(); 

    xhr.open("POST", "https://api.imgur.com/oauth2/token/");
	
	
	xhr.onreadystatechange=function()
    {
	  if (xhr.readyState==4 && xhr.status==200)
		{
		 console.log(xhr.responseText);
		}
	}
	
	
}