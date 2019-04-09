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
		height : '270',
		playerVars : {
			//rel: 0,
			start: 0
		//	'autoplay' : 0,
		//'controls' : 0
		},
		videoId : 'M7lc1UVf-VE',
		// イベントの設定
		events : {
			// プレーヤーの準備ができたときに実行
			'onReady' : onPlayerReady,
			'onStateChange' : onPlayerStateChange,
			'onError': onPlayerError
		}
	});
}
var errorCode;
// onErrorのコールバック関数
function onPlayerError(event) {	
	errorCode = event.data;
}
// onStateChangeのコールバック関数
function onPlayerStateChange(event) {
	if (event.data == '0') {
		if(loopCount<maxLoop){
			loopCount++;
			player.seekTo(0, true);
			event.target.playVideo();
		}else end=true;
	}
}
var end = false;
var maxLoop=3;
function isEnd() {
	return end;
}
function setMaxLoop(ml) {
	maxLoop=ml;
}
function getMaxLoop() {
	return maxLoop;
}
// プレーヤーの準備ができたとき
function onPlayerReady(event) {
	end=false;
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
	end=true;
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
function alertLoopCount(){
	alert("LC-T="+loopCount);
}
function getErrorCode(){
	return errorCode;
}
function loadVideo(id){
	errorCode=0;
	player.loadVideoById({
	            'videoId': id,
	            'suggestedQuality': 'small'
        });
	myPlayVideo();
	player.unMute();
}
function loadList(id,index){
if(index<0)index=0;
errorCode=0;
	player.loadPlaylist({
	            'listType': 'playlist',
	            'list': id,
	            'index': index,
	            'startSeconds': 0,
	            'suggestedQuality': 'small'
	        });
	myPlayVideo();
player.unMute();
}