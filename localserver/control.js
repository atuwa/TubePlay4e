var nowPlayVideoID;//再生中の動画
var playerType=0;//プレイヤーID
//SoundCloudプレイヤー	3	IFrame名SoundCloudFrame
//ニコ動プレイヤー		2	IFrame名NicoFrame
//つべプレイリスト		1	IFrame名TubeFrame
//つべ動画プレイヤー	0	IFrame名TubeFrame
function stopCom(){//動画?停止
	log("stop");
    if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.myPauseVideo();
    }else if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPauseVideo();
    }else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.myPauseVideo();
	}
}
function playCom(){//再生再開
	log("play");
    if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.myPlayVideo();
    }else if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.myPlayVideo();
    }else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.myPlayVideo();
	}
}
function volCom(vol){//音量設定
	log("setvol="+vol);
    if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.mySetVolume(vol);
    }else if(playerType==2){
        var iframe = document.getElementById('NicoFrame');
        iframe.contentWindow.mySetVolume(vol);
    }else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.mySetVolume(vol);
	}
}
function seekCom(seek){//シーク
	log("seek="+seek);
	if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.mySeekTo(seel);
    }else if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.mySeekTo(seek);
	}else{
		var iframe = document.getElementById('TubeFrame');
        iframe.contentWindow.mySeekTo(seek);
	}
}
function getErrorCom(){//エラー取得現在つべのみ対応
	//log("エラー取得 getError");
	if(playerType==3){
        return 0;
    }else if(playerType==2){
		return 0;
	}else{
		var iframe = document.getElementById('TubeFrame');
		return iframe.contentWindow.getErrorCode();
	}
}
function getVolCom(){//音量取得
	log("getVolume");
	if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        return iframe.contentWindow.myGetVolume();
    }else if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		return iframe.contentWindow.myGetVolume();
	}else{
		var iframe = document.getElementById('TubeFrame');
		return iframe.contentWindow.myGetVolume();
	}
}
function muteCom(){
	log("mute");
	if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.myMute();
    }else if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.myMute();
	}else{
		var iframe = document.getElementById('TubeFrame');
		iframe.contentWindow.myMute();
	}
}
function unMuteCom() {
	log("unMute");
	if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.myUnMute();
    }else if(playerType==2){
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
	if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.alertLoopCount();
    }else if(playerType==2){
		var iframe = document.getElementById('NicoFrame');
		iframe.contentWindow.alertLoopCount();
	}else{
		var iframe = document.getElementById('TubeFrame');
		iframe.contentWindow.alertLoopCount();
	}
}
function isMutedCom(){
	if(playerType==3){
        var iframe = document.getElementById('SoundCloudFrame');
        iframe.contentWindow.myIsMuted();
    }else if(playerType==2){
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
function loadSoundCloud(){
	stopCom();
	playerType=3;
	switchFrame();
	var id=document.getElementById('videoID').value;
	log("playSoundCloudID="+id);
	var iframe = document.getElementById('SoundCloudFrame');
	iframe.contentWindow.load(id);
	nowPlayVideoID="sc"+id;
	iframe.contentWindow.myPlayVideo();
}
function loadVideoTube(id){
	stopCom();
	playerType=0;
	switchFrame();
	document.getElementById('videoID').value=id;
	log("playTubeVideoID="+id);
	var iframe = document.getElementById('TubeFrame');
	iframe.contentWindow.loadVideo(id);
}
function loadListTube(id,index){
	stopCom();
	playerType=1;
	switchFrame();
	document.getElementById('videoID').value=id;
	log("playTubeListID="+id+"&index="+index);
	var iframe = document.getElementById('TubeFrame');
	iframe.contentWindow.loadList(id,index);
}
function loadVideoNico(){
	//stopCom();
	playerType=2;
	switchFrame();
	//alert("再生開始"+videoID);
	var iframe = document.getElementById('NicoFrame');
	nowPlayVideoID=document.getElementById('videoID').value;
	log("playNicoVideoID="+nowPlayVideoID);
	iframe.contentWindow.loadVideo(nowPlayVideoID);
	//iframe.contentWindow.myPlayVideo();
	//removeNicoPlayer();
	//var nico=new NicovideoPlayer('body',document.getElementById('videoID').value);
}
function switchFrame(){
	if(document.getElementById('showALL').checked){
		openFrame("Tube");
		openFrame("Nico");
		openFrame("SoundCloud");
		return;
	}
	if(playerType==3){//SoundCloudプレイヤーモード
		openFrame('SoundCloud');

		closeFrame('Nico');
		closeFrame('Tube');
	}else if(playerType==2){//ニコ動プレイヤーモード
		openFrame('Nico');

		closeFrame('Tube');
		closeFrame('SoundCloud');
	}else{//つべプレイヤーモード
		openFrame('Tube');

		closeFrame('Nico');
		closeFrame('SoundCloud');
	}
}
function closeFrame(name){
	try{
		var iframe = document.getElementById(name+'Frame');
		iframe.width=0;
		iframe.height=0;
	}catch(error) {}
}
function openFrame(name){
	try{
		var iframe = document.getElementById(name+'Frame');
		iframe.width=520;
		iframe.height=300;
	}catch(error) {}
}