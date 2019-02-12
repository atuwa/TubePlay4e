var loopCount=0;
// API読み込み
script = document.createElement('script');
script.src = "https://www.youtube.com/iframe_api";
firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(script, firstScript);
// 動画呼び出し
function onYouTubeIframeAPIReady() {
	player = new YT.Player('ytplayer', {
		width : '480',
		height : '285',
		playerVars : {
			'rel' : 0,
		//	'autoplay' : 0,
		//'controls' : 0
		},
		videoId : 'M7lc1UVf-VE',
		// イベントの設定
		events : {
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange
		// プレーヤーの準備ができたときに実行
		}
	});
}
// onStateChangeのコールバック関数
function onPlayerStateChange(event) {
	if (event.data == '0') {
		if(loopCount<3){
			loopCount++;
			player.seekTo(0, true);
			event.target.playVideo();
		}else window.app.end();
	}
}
var playerReady = 0;
function isReady() {
	return playerReady;
}
// プレーヤーの準備ができたとき
function onPlayerReady(event) {
	event.target.mute();
	event.target.playVideo();
	//player.setVolume(1);
	playerReady = 1;
}
function mySeekTo(point){
	player.seekTo(point, true);
}
function myPauseVideo() {
	player.pauseVideo();
}
function myPlayVideo() {
	loopCount=0;
	player.playVideo();
}
function myMute() {
	player.mute();
}
function myUnMute() {
	player.unMute();
}
function mySetVolume(vol) {
	player.unMute();
	player.setVolume(vol);
}
function myGetVolume() {
	return player.getVolume();
}
function myGetTitle() {
	var xhr=new XMLHttpRequest;
	xhr.open('get','https://gdata.youtube.com/feeds/api/videos/VIDEOID/related',true);
	xhr.send('');
	var title = xhr.responseXML.getElementsByTagName('title')[0].textContent;
	title = title.replace('Videos related to','');
	alert(title);
	return title;
}
function alertLoopCount(){
	alert("LC="+loopCount);
}
function loadVideo(id){
	player.loadVideoById({
	            'videoId': id,
	            'suggestedQuality': 'small'
        });
	document.getElementById('videoID').value=id;
	myPlayVideo();
	player.unMute();
}
function loadList(id,index){
if(index<0)index=0;
	player.loadPlaylist({
	            'listType': 'playlist',
	            'list': id,
	            'index': index,
	            'startSeconds': 0,
	            'suggestedQuality': 'small'
	        });
	document.getElementById('videoID').value=id;
	myPlayVideo();
player.unMute();
}