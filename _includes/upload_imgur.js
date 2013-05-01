/* Drag'n drop stuff */
window.ondragover = function(e) {e.preventDefault()}
window.ondrop = function(e) {e.preventDefault(); upload(e.dataTransfer.files[0]); }
function upload(file) {
console.log("netra");
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;
    var url = "http://ec2-54-235-20-128.compute-1.amazonaws.com/compilacion/getToken.php"
    /* It is! */
    /*document.body.className = "uploading";*/
    /* Lets build a FormData object*/
    var fd = new FormData(); // I wrote about it: https://hack111019e1b70421e1d217666cf1f8dac6b9dc2c87s.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
    fd.append("image", file); // Append the file
    var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com

    xhr.open("POST", "https://api.imgur.com/3/upload.json", true); // Boooom!
    var token = $.get(url, function(data,status){
	console.log("Data: " + data + "\nStatus: " + status);
	xhr.setRequestHeader('Authorization','Bearer '+ data.acces_token);
    }, "jsonp");    

    xhr.onload = function() {
        // Big win!
        var link = JSON.parse(xhr.responseText).data.link;
        var link_m = link.replace(/(\.[a-zA-Z]{3})$/g,"m$1")
        /*document.querySelector("#link").href = link;*/
        /*document.querySelector("#link").innerHTML = "![Alt text]("+ link.replace(".jpg","m.jpg") +")";*/
      document.getElementById('link').value = "![Pie]("+link_m  +")";
        /*document.body.className = "uploaded";*/
    }
    // Ok, I don't handle the errors. An exercice for the reader.
    // xhr.setRequestHeader('Authorization', 'Client-ID eac34bd7408ece5');
    /* And now, we send the formdata */
    xhr.send(fd);
}
