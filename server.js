console.log("サーバ起動開始");
var express = require('express');
var server= express();
server.use("/",express.static(`${__dirname}/localserver`));
url = require('url');
console.log("ページ生成開始");
var reqCounter=0;
server.get('/operation.html', function(req, res){//操作ページ生成&パラメータから処理
	console.log("リクエスト"+(reqCounter++));
	var rescode=nowPlayVideoID;
	if (req.query.stop) {//stopパラメータがある
		stopCom();
	}else if (req.query.play) {
		playCom();
	}
	if (req.query.vol) {//音量変更
		volCom(req.query.vol);
	}
	if (req.query.seek) {//シーク
		seekCom(req.query.seek);
	}
	if(req.query.GETvolume){//音量取得
		res.send(""+getVolCom());
		return;
	}
	if(req.query.GETerror){//エラーコード取得
		res.send(""+getErrorCom());
		return;
	}
	var index=0;//再生リストのインデックス
	if (req.query.index) {//インデックス指定あり
		index=parseInt(req.query.index, 10);//数値化
	}
	if (req.query.v) {//v=パラメータがある
		var videoID = req.query.v;
		//console.log(videoID);
		//alart("videoID="+videoID);
		loadVideoTube(videoID);//動画再生
		nowPlayVideoID=videoID;
	}else if (req.query.list) {//プレイリスト
		var listID = req.query.list;//リストID取得
		loadListTube(listID,index);//リスト再生
		nowPlayVideoID=listID;
	}else if (req.query.nico) {//nico=パラメータがある
		var videoID = req.query.nico;
		document.getElementById('videoID').value=videoID;
		loadVideoNico();
	}else if (req.query.sc) {//sc=パラメータがある
		document.getElementById('videoID').value=req.query.sc;
		loadSoundCloud();
	}
	res.send(rescode);
});
var server_port;
function startServer(){
	console.log("サーバ開始");
	var input_port = document.getElementById("input_port");
	server_port=parseInt(input_port.value, 10);
	server.listen(server_port, function() {
		console.log('サーバ開始'+server_port);
		alert('サーバ開始'+server_port);
		reloadNicoFrame();
	});
}
function reloadNicoFrame(){
    var iframe = document.getElementById('NicoFrame');
	//iframe.contentDocument.location.replace('http://nana.sh/slot');//これ動く
	//iframe.src="http://localhost:"+static_server_port+"/test.html";//ここで内部サーバのiframe読み込み
	//iframe.contentWindow.location.reload();//これいらない
	//console.log('http://localhost:'+static_server_port+"/test.html");
	iframe.contentDocument.location.replace('http://localhost:'+server_port+"/nico.html");
    var iframe2 = document.getElementById('TubeFrame');
	iframe2.contentDocument.location.replace('http://localhost:'+server_port+"/tube.html");
    var iframe3 = document.getElementById('SoundCloudFrame');
	iframe3.contentDocument.location.replace('http://localhost:'+server_port+"/SoundCloud.html");
	console.log("IFRAME更新");
}