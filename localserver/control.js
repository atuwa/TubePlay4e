var nowPlayVideoID;//再生中の動画
var playerType=0;
function stopCom(){
	log("stop");
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPauseVideo();
    }else myPauseVideo();//動画停止
}
function playCom(){
	log("play");
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPlayVideo();
    }else myPlayVideo();//動画再生
}
function volCom(vol){
	log("setvol="+vol);
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.mySetVolume(vol);
    }else mySetVolume(vol);
}
function seekCom(seek){
	log("seek="+seek);
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.mySeekTo(seek);
	}else mySeekTo(seek);
}
function getErrorCom(){
	//log("エラー取得 getError");
	if(playerType==2){
		return 0;
	}else return getErrorCode();
}
function getVolCom(){
	log("getVolume");
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		return iframe.contentWindow.myGetVolume();
	}else return myGetVolume();
}
function muteCom(){
	log("mute");
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myMute();
	}else myMute();
}
function unMuteCom() {
	log("unMute");
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myUnMute();
	}else myUnMute();
}
function alertVolCom(){
    alert(getVolCom());
}
function alertLoopCountCom(){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.alertLoopCount();
	}else alertLoopCount();
}
function isMutedCom(){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myIsMuted();
	}else myIsMuted();
}
function log(d){
	const ipcRenderer= require("electron").ipcRenderer;
	ipcRenderer.send("MainConsoleLog",""+d);
}