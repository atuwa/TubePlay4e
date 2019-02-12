document.getElementById("submit").addEventListener("click", main, false);
var express = require('express');
var server= express();
url = require('url');

server.get('/tube.html', function(req, res){
	if (req.query.v) {
		var videoID = req.query.v;
		console.log(videoID);
		alart("videoID="+videoID);
		loadVideo(videoID);
		res.send("成功="+chat);
	}else res.send("失敗");
});
	alart("load");
function main() {
	var input_port = document.getElementById("input_port");
	var port=parseInt(input_port.value, 10);
	alart("port="+port);
	server.listen(port, function() {
		//console.log('Listening on port '+port);
	});
}