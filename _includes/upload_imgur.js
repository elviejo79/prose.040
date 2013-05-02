/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
function upload(file) {
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;
    //http://stackoverflow.com/questions/9622901/how-to-upload-a-file-using-jquery-ajax-and-formdata
    var uri = "http://ec2-54-235-20-128.compute-1.amazonaws.com/compilacion/getToken.php"
    
    $.get(uri, function(token_auth,status){
	var fd = new FormData(); 
	fd.append("image", file); // Append the file
	fd.append("album", "VHVwf"); // Append the file
	$.ajax({
	    type: "POST",
	    async: false,
	    beforeSend: function (request){
		request.setRequestHeader('Authorization','Bearer '+ token_auth.data.access_token);
	    },
	    url: "https://api.imgur.com/3/upload.json",
	    data: fd,
	    processData: false,
	    contentType: false,
	    success: function(imgur_response){ 
		var link = imgur_response.data.link;
		var link_m = link.replace(/(\.[a-zA-Z]{3})$/g,"m$1")
		$('#link').val("![Pie]("+link_m  +")");
	    }
	});
    });    

}
