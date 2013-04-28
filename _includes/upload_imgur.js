/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {
		e.preventDefault(); 

		var client_id = "3eb85f18e2e6e50";
		var client_secret = "f2a8a543a55df769fea22c383ce7c87a4048ac05";
		
		var pin = getPin(client_id);
		console.log(pin);
		
		//exchangePinForTokens(client_id, client_secret, '24e8bfc8af', e.dataTransfer.files[0]);
		
}

function getPin(client_id){
	var resp = "pin";
	
	//var pin_url = "https://api.imgur.com/oauth2/authorize?client_id="+ client_id +"&response_type="+ resp;	
	var xhr = new XMLHttpRequest(); 

    xhr.open("GET", "https://api.imgur.com/oauth2/authorize?client_id="+ client_id + "&response_type=" + resp);
	
	xhr.onreadystatechange = function (e) {
	  if (xhr.readyState == 4) {
		if(xhr.status == 200){
		   //console.log(xhr.responseText);
		   //console.log('200 getPin');
		   //sendCredentials(client_id);
		   
		   window.open(xhr.responseText, '_blank', 'width=300,height=400');
			console.log('1');
			window.open('http://www.google.com', '_blank', 'width=300,height=400');
			
	    }
	  else if(xhr.status == 400) {
			alert('There was an error processing the token 1.')
		}
		else {
		  alert('something else other than 200 was returned 1')
		}
	  }
	};
	
    xhr.send();

	return 'fin';
}


function sendCredentials(client_id){
	var resp = "pin";

	var fd = new FormData();
    fd.append("username", "ljzbot@gmail.com");
	fd.append("password", "ljzbot003");
	
	var xhr = new XMLHttpRequest(); 

    xhr.open("POST", "https://api.imgur.com/oauth2/authorize?client_id="+ client_id + "&response_type=" + resp);
	
	xhr.onreadystatechange = function (e) {
	  if (xhr.readyState == 4) {
		if(xhr.status == 200){
			window.open(xhr.responseText, '_blank', 'width=300,height=400');
			console.log('popup');
			window.open('http://www.google.com', '_blank', 'width=300,height=400');
	    }
	  else if(xhr.status == 400) {
			alert('There was an error processing the token 2.')
		}
		else {
		  alert('something else other than 200 was returned 2.')
		}
	  }
	};
	
    xhr.send(fd);
}

function exchangePinForTokens(client_id, client_secret, pin, file){

	var fd = new FormData();
    fd.append("client_id", client_id);
	fd.append("client_secret", client_secret);
	fd.append("grant_type", "pin");
    fd.append("pin", pin); 
	
    var xhr = new XMLHttpRequest(); 
    xhr.open("POST", "https://api.imgur.com/oauth2/token", false);
	
	xhr.onreadystatechange = function (e) {
	  if (xhr.readyState == 4) {
		if(xhr.status == 200){
		   var access_token = JSON.parse(xhr.responseText).access_token;
		   var refresh_token = JSON.parse(xhr.responseText).refresh_token
		   
		   upload(file, access_token);
	    }
	    /*else if(xhr.status == 400) {
			console.log('There was an error processing the token.')
		}
		else {
		  console.log('something else other than 200 was returned')
		}*/
	  }
	};
	
	xhr.send(fd);
}

function upload(file, access_token) {

    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;

    /* It is! */
    /*document.body.className = "uploading";*/

    /* Lets build a FormData object*/
    var fd = new FormData(); // I wrote about it: https://hack111019e1b70421e1d217666cf1f8dac6b9dc2c87s.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
    fd.append("image", file); // Append the file
	fd.append("album", 'SiqhC');
	
    var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
    //xhr.setRequestHeader('Authorization:','Client-ID eac34bd7408ece5');
    xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
	

    xhr.onload = function() {
        // Big win!
        
        var link = JSON.parse(xhr.responseText).data.link;
        var link_m = link.replace(/(\.[a-zA-Z]{3})$/g,"m$1")
        /*document.querySelector("#link").href = link;*/
        /*document.querySelector("#link").innerHTML = "![Alt text]("+ link.replace(".jpg","m.jpg") +")";*/
        document.getElementById('link').value = "![Alt text]("+link_m  +")";

        /*document.body.className = "uploaded";*/
    }
	
    // Ok, I don't handle the errors. An exercice for the reader.
    xhr.setRequestHeader('Authorization', 'Bearer '+ access_token);

    /* And now, we send the formdata */
    xhr.send(fd);
}