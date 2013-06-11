window.onload = init;
var context;
var bufferLoader;

function init() {
context = new webkitAudioContext();

bufferLoader = new BufferLoader(
context,
[
'music/1.mp3',
'music/2.mp3',
],
finishedLoading
);

bufferLoader.load();
}

function finishedLoading(bufferList) {
//创建两个实例并同时播放之
console('123');
var source1 = context.createBufferSource();
var source2 = context.createBufferSource();
source1.buffer = bufferList[0];
source2.buffer = bufferList[1];

source1.connect(context.destination);
source2.connect(context.destination);
source1.noteOn(0);
source2.noteOn(0);
}