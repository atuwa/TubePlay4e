var end = false;
var maxLoop=3;
function removeNicoPlayer(){
    var np=document.getElementsByClassName('NicoPlayer');
    //子要素を全て削除
    var i = 0;
    while(np.length > i){
      n = np[i];
      while (n.firstChild !== null){
        n.removeChild(n.firstChild);
      }
      n.parentNode.removeChild(n);
      i++;
		}
	//    while (np.firstChild != null){
	//      np.removeChild(np.firstChild);
	//    }
	//自分を削除
	//    np.parentNode.removeChild(np);
}
function isEnd() {
	return end;
}
function setMaxLoop(ml) {
	maxLoop=ml;
}
function getMaxLoop() {
	return maxLoop;
}
var nico=null;
function loadVideo(id) {
  loopCount=0;
  end=false;
  var frame_loaded=document.getElementById("frame_loaded");
  frame_loaded.innerHTML="";
  removeNicoPlayer();
  nico=new NicovideoPlayer('body',id);
}
function mySeekTo(point) {
	nico.postMessage({
	    eventName: 'seek',
	    data: {
	      time: point } });
}
function myPauseVideo() {
	nico.postMessage({
        eventName: 'pause',
    });
}
function myPlayVideo() {
  end=false;
  loopCount=0;
		//alert('再生');
	nico.postMessage({
        sourceConnectorType: 1,
        eventName: 'play',
    });
}
function myIsMuted(){
  return isMute;
}
function myGetVolume() {
	return VolumeData;
}
function mySetVolume(vol) {
	nico.postMessage({
        eventName: 'volumeChange',
        data: {
          volume: vol/100 } });
	VolumeData=vol;
}
function myMute() {
	nico.postMessage({
        eventName: 'mute',
        data: {
          mute: true } });
}
function myUnMute() {
	nico.postMessage({
        eventName: 'mute',
        data: {
          mute: false } });
}
function myGetTitle(){
	return "NotSuport";
}
function alertLoopCount(){
	alert("LC-N="+loopCount);
}