/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
function upload(file) {
    console.log("netra");
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;

    var uri = "http://ec2-54-235-20-128.compute-1.amazonaws.com/compilacion/getToken.php"
    
    $.get(uri, function(token_auth,status){
//	console.log(status);
	console.info(token_auth);
	console.info(file);
	$.ajax({
	    type: "POST",
	    async: false,
	    beforeSend: function (request){
		request.setRequestHeader('Authorization','Bearer '+ token_auth.data.access_token);
	    },
	    url: "https://api.imgur.com/3/upload.json",
	    data: {
		image : file.getAsDataURL(),
		type : "base64",
		album : "VHVwf"
	    },
	    success: function(text){ console.log(text)}
	});

//	console.log(data.data.access_token);
//	var fd = new FormData(); // I wrote about it: https://hack111019e1b70421e1d217666cf1f8dac6b9dc2c87s.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
//	fd.append("image", file); // Append the file
//	fd.append("album", "VHVwf"); // Append the file
//	var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
//	xhr.open("POST", "https://api.imgur.com/3/upload.json", true); // Boooom!
//	xhr.setRequestHeader('Authorization','Bearer '+ data.data.access_token);
//	xhr.onload = function() {
  //          var link = JSON.parse(xhr.responseText).data.link;
    //        var link_m = link.replace(/(\.[a-zA-Z]{3})$/g,"m$1")
//	    document.getElementById('link').value = "![Pie]("+link_m  +")";
//	}
//	xhr.send(fd);
    });    

}
