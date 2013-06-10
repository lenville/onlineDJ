window.onload  = init;
var context = new webkitAudioContext();//建立AudioContext实例,webKit核心的浏览器, 需要加上webkit前缀
var gainNode = context.createGainNode();// 创建一个gain node
var bufferLoader;//创建AudioBuffer

/*Web Audio API初始化读取音频文件*/
function init() {
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
	var source1    = context.createBufferSource();
	var source2    = context.createBufferSource();
	source1.buffer = bufferList[0];
	source2.buffer = bufferList[1];
	source1.connect(context.destination);
	source2.connect(context.destination);
	source1.noteOn(0);
	source2.noteOn(0);
	}

function playSound(buffer, time) {
	var source = context.createBufferSource();//创建一个声音源
	source.buffer = buffer;//告诉该源播放何物
	source.connect(context.destination);//将该源与硬件相连
	source.noteOn(time);//播放该实例time次
}

function volumn(gainNode){
	this.value = gainNode.gain.value;
	this.up = function(value){
		if(value < 100)	value += 5;
	}
	this.down = function(value){
		if(value > 0)	value -=5;
	}
	this.mute = function(value){
		value = 0;
	}
}
