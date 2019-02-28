var loopCount=0;
var end=false;
var maxLoop=3;
var mute=false;
var VolumeData=30;
var title="NotSuport";

var iframeElement=document.querySelector('iframe');
var iframeElementID=iframeElement.id;
var widget=SC.Widget(iframeElement);

function load(id){
    if(!isNaN(id))id="https://api.soundcloud.com/tracks/"+id;
    title="NotSuport";
    widget.load(id,null);
    //widget.play();
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
function mySeekTo(point) {
	widget.seekTo(point);
}
function myPauseVideo() {
	widget.pause();
}
function myPlayVideo() {
    end=false;
    loopCount=0;
    widget.play();
	widget.setVolume(VolumeData);
}
function myIsMuted(){
  return mute;
}
function myGetVolume() {
	return VolumeData;
}
function mySetVolume(vol) {
	widget.setVolume(vol);
	VolumeData=vol;
}
function myMute() {
	mute=true;
	widget.setVolume(0);
}
function myUnMute() {
	widget.setVolume(VolumeData);
}
function myGetTitle(){
	return title;
}
function alertLoopCount(){
	alert("LC-SC="+loopCount);
}