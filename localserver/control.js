var nowPlayVideoID;//再生中の動画
var playerType=0;
function stopCom(){
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPauseVideo();
    }else myPauseVideo();//動画停止
}
function playCom(){
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPlayVideo();
    }else myPlayVideo();//動画再生
}
function volCom(vol){
    if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.mySetVolume(vol);
    }else mySetVolume(vol);
}
function seekCom(seek){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.mySeekTo(seek);
	}else mySeekTo(seek);
}
function getVolCom(){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		return iframe.contentWindow.myGetVolume();
	}else return myGetVolume();
}
function muteCom(){
	if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myMute();
	}else myMute();
}
function unMuteCom() {
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