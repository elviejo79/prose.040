/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {
		e.preventDefault(); 
		//upload(e.dataTransfer.files[0]); 
		
		var client_id = "162f8664c190969";
		var client_secret = "ed9ff3c498b9d9ad1c54c867a65024747e77009e";
		
		getPin(client_id);
		
}

function getPin(client_id){
	var resp = "pin";
    var state = "anything";
	
	var pin_url = "https://api.imgur.com/oauth2/authorize?client_id="+ client_id +"&response_type="+ resp +"&state="+ state;
	console.log(pin_url);
}
