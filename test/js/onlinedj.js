window.onload  = init;
var context = new webkitAudioContext();//建立AudioContext实例,webKit核心的浏览器, 需要加上webkit前缀
var compressor = context.createDynamicsCompressor();
var bufferLoader;//创建AudioBuffer

/*Web Audio API初始化读取音频文件*/
function init() {
	bufferLoader = new BufferLoader(
		context,
		[
			'music/1.mp3'
			//'music/2.mp3',
		],
		finishedLoading
	);
	bufferLoader.load();
}

function createSource(buffer){
	var source = context.createBufferSource();//创建一个声音源
	var gainNode = context.createGainNode();
	var filter = context.createBiquadFilter();
	source.buffer = buffer;//告诉该源播放何物
	source.loop = true;
	source.connect(filter);
	filter.connect(gainNode);
	gainNode.connect(context.destination);//将该源与硬件相连
	return {
		source: source,
		gainNode: gainNode,
		filter: filter
	};
}

function finishedLoading(bufferList) {	
	//创建节点实例
	var source1 = createSource(bufferList[0]);
	//setvolumn(source1.gainNode, 100);
	source1.source.start(0);
}


function setvolumn(gainNode, value){
	gainNode.gain.value = value;

};

