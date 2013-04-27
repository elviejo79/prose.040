/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
function upload(file) {

    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;

    /* It is! */
    /*document.body.className = "uploading";*/

    // First, parse the query string
	var params = {}, queryString = location.hash.substring(1),
		regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	// And send the token over to the server
	var req = new XMLHttpRequest();
	// consider using POST so query isn't logged
	req.open('GET', 'https://' + window.location.host + '/catchtoken?' + queryString, true);

	req.onreadystatechange = function (e) {
	  if (req.readyState == 4) {
		 if(req.status == 200){
		   window.location = params['state']
	   }
	  else if(req.status == 400) {
			alert('There was an error processing the token.')
		}
		else {
		  alert('something else other than 200 was returned')
		}
	  }
	};
	
	req.send(null);
}
