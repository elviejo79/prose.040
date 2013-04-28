/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
function upload(file) {

    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;

    /* It is! */
    /*document.body.className = "uploading";*/

    /* Lets build a FormData object*/
    var fd = new FormData(); // I wrote about it: https://hack111019e1b70421e1d217666cf1f8dac6b9dc2c87s.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
    fd.append("image", file); // Append the file
    var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
    //xhr.setRequestHeader('Authorization:','Client-ID eac34bd7408ece5');
    xhr.open("POST", "https://ljzac.imgur.com/3/image.json"); // Boooom!
	
	console.log('antes onload');
    xhr.onload = function() {
        // Big win!
        
        console.log('onload');
        
        var link = JSON.parse(xhr.responseText).data.link;
		
		console.log('antes link_m');
		
        var link_m = link.replace(/(\.[a-zA-Z]{3})$/g,"m$1")
        /*document.querySelector("#link").href = link;*/
        /*document.querySelector("#link").innerHTML = "![Alt text]("+ link.replace(".jpg","m.jpg") +")";*/
        document.getElementById('link').value = "![Alt text]("+link_m  +")";

        
        
        /*document.body.className = "uploaded";*/
    }
	
	console.log('despues onload');
	
    // Ok, I don't handle the errors. An exercice for the reader.
    xhr.setRequestHeader('Authorization', 'Client-ID eac34bd7408ece5');

    /* And now, we send the formdata */
    xhr.send(fd);
}
