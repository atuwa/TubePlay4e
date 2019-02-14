console.log("サーバ起動開始");
var express = require('express');
var server= express();
url = require('url');
var nowPlayVideoID;//再生中の動画
console.log("ページ生成開始");
var reqCounter=0;
var playerType=0;
server.get('/operation.html', function(req, res){//操作ページ生成&パラメータから処理
	console.log("リクエスト"+(reqCounter++));
	var rescode=nowPlayVideoID;
	if (req.query.stop) {//stopパラメータがある
		if(playerType==2){
			//本体HTML側
			var iframe = document.getElementById('NicoFrame');
			iframe.contentWindow.myPauseVideo();
		}else myPauseVideo();//動画停止
	}else if (req.query.play) {
		if(playerType==2){
			//本体HTML側
			var iframe = document.getElementById('NicoFrame');
			iframe.contentWindow.myPlayVideo();
		}else myPlayVideo();//動画再生
	}
	if (req.query.vol) {//音量変更
		mySetVolume(req.query.vol);
	}
	if (req.query.seek) {//シーク
		mySeekTo(req.query.seek);
	}
	if(req.query.GETvolume){//音量取得
		res.send(""+myGetVolume());
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
		loadVideo(videoID);//動画再生
		nowPlayVideoID=videoID;
		playerType=0;
	}else if (req.query.list) {//プレイリスト
		var listID = req.query.list;//リストID取得
		//console.log(listID);
		//alart("listID="+listID);
		loadList(listID,index);//リスト再生
		nowPlayVideoID=listID;
		playerType=1;
	}else if (req.query.nico) {//nico=パラメータがある
		//var iframe = document.getElementById('NicoFrame');
		//iframe.src="http://localhost:"+static_server_port+"/nico.html";//ここで内部サーバのiframe読み込み
		//console.log('http://localhost:'+static_server_port+"/nico.html");
		//iframe.contentWindow.location.reload();

		var videoID = req.query.nico;
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.loadVideo(videoID);
		nowPlayVideoID=videoID;
		playerType=2;
		/*
		var videoID = req.query.nico;
		removeNicoPlayer();//ニコニコのプレイヤー削除
		var nico=new NicovideoPlayer('body',videoID);
		*/
	}
	res.send(rescode);
});
console.log("静的リソースサーバ起動開始");
var nodeStatic = require('node-static');
var file = new nodeStatic.Server(__dirname);

var static_server=require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});
console.log("静的リソースサーバ開始");
let static_server_port=7001;//内部サーバのポート
//console.log("サーバ開始");
//static_server.listen(static_server_port);//サーバのポート7000
function startServer(){
	console.log("サーバ開始");
	var input_port = document.getElementById("input_port");
	var port=parseInt(input_port.value, 10);
	server.listen(port, function() {
		console.log('サーバ開始'+port);
		alert('サーバ開始'+port+'&'+(port+1));
	});
	static_server_port=port+1;
	static_server.listen(static_server_port, function() {
		console.log('静的リソースサーバ開始'+static_server_port);
		reloadNicoFrame();
	});
}
function reloadNicoFrame(){
    var iframe = document.getElementById('NicoFrame');
		//iframe.contentDocument.location.replace('http://nana.sh/slot');//これ動く
		//iframe.src="http://localhost:"+static_server_port+"/test.html";//ここで内部サーバのiframe読み込み
		//iframe.contentWindow.location.reload();//これいらない
		//console.log('http://localhost:'+static_server_port+"/test.html");
		iframe.contentDocument.location.replace('http://localhost:'+static_server_port+"/nico.html");
		console.log("IFRAME更新");
}