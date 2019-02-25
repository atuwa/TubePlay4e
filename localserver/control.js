var nowPlayVideoID;//再生中の動画
var playerType=0;
function stopCom(){
	log("stop");
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPauseVideo();
    }else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.myPauseVideo();//動画停止
	}
}
function playCom(){
	log("play");
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPlayVideo();
    }else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.myPlayVideo();//動画再生
	}
}
function volCom(vol){
	log("setvol="+vol);
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.mySetVolume(vol);
    }else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.mySetVolume(vol);
	}
}
function seekCom(seek){
	log("seek="+seek);
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.mySeekTo(seek);
	}else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.mySeekTo(seek);
	}
}
function getErrorCom(){
	//log("エラー取得 getError");
	if(playerType==2){
		return 0;
	}else{
		var iframe = document.getElementById('TubeFrame');
		return iframe.contentWindow.getErrorCode();
	}
}
function getVolCom(){
	log("getVolume");
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		return iframe.contentWindow.myGetVolume();
	}else{
		var iframe = document.getElementById('TubeFrame');
		return iframe.contentWindow.myGetVolume();
	}
}
function muteCom(){
	log("mute");
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myMute();
	}else{
		var iframe = document.getElementById('TubeFrame');
		iframe.contentWindow.myMute();
	}
}
function unMuteCom() {
	log("unMute");
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myUnMute();
	}else{
		var iframe = document.getElementById('TubeFrame');
		iframe.contentWindow.myUnMute();
	}
}
function alertVolCom(){
    alert(getVolCom());
}
function alertLoopCountCom(){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.alertLoopCount();
	}else{
		var iframe = document.getElementById('TubeFrame');
		iframe.contentWindow.alertLoopCount();
	}
}
function isMutedCom(){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myIsMuted();
	}else{
		var iframe = document.getElementById('TubeFrame');
		iframe.contentWindow.myIsMuted();
	}
}
function log(d){
	try {
		const ipcRenderer= require("electron").ipcRenderer;
		ipcRenderer.send("MainConsoleLog",""+d);
	}catch(error) {

	}
}
function loadVideo(id){
	stopCom();
	document.getElementById('videoID').value=id;
	log("playTubeVideoID="+id);
	var iframe = document.getElementById('TubeFrame');
	iframe.contentWindow.loadVideo(id);
	playerType=0;
}
function loadList(id,index){
	stopCom();
	document.getElementById('videoID').value=id;
	log("playTubeListID="+id+"&index="+index);
	var iframe = document.getElementById('TubeFrame');
	iframe.contentWindow.loadList(id,index);
	playerType=1;
}
function loadVideoNico(){
	stopCom();
	//alert("再生開始"+videoID);
	var iframe = document.getElementById('NicoFrame');
	nowPlayVideoID=document.getElementById('videoID').value;
	log("playNicoVideoID="+nowPlayVideoID);
	iframe.contentWindow.loadVideo(nowPlayVideoID);
	//iframe.contentWindow.myPlayVideo();
	playerType=2;
	//removeNicoPlayer();
	//var nico=new NicovideoPlayer('body',document.getElementById('videoID').value);
}