
var gainNode, filter, source, context;

function web_audio_api_init(){
	//初始化audiocontext
	
	try{ 
		delete context;
		gainNode = null;
		filter = null;
		source = null;
		context = new AudioContext();
	}catch(e){
		try{
			context = new webkitAudioContext();
		}catch(e){
			//alert('Web Audio API is not supported in this browser.');
		}
	}
	
	//初始化audio音乐
	source = context.createMediaElementSource(audio);

	//建立增益/过滤器节点
	gainNode = context.createGainNode();
	filter = context.createBiquadFilter();

	source.loop = true;

	//绑定音量调节节点
	source.connect(gainNode);
	gainNode.connect(context.destination);

	//音量调节
	source.setvol = function(vol){
		gainNode.gain.value = vol;
	}
	//滤波器调节
	source.setfilter = {
		type: function(type){
			filter.type = type;
		},
		frequency: function(frequency){
			filter.frequency.value = frequency;
		},
		q: function(q){
			filter.Q.value = q;
		},
		gain: function(gain){
			filter.gain.value = gain;
		}
	}

	//滤波器: 开
	source.addfilter = function(){
		gainNode.connect(filter);
		filter.connect(context.destination);
	}
	//滤波器: 关
	source.removefilter = function(){
		gainNode.disconnect(0);
		filter.disconnect(0);
		gainNode.connect(context.destination);
	}
}

