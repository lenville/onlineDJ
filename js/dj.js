var audio;
var location = 'http://xlucien.net/project/onlineDJ/index.html';
//滤波器对象
var source;
//每转一圈所需时间（单位：秒）
var ptime = 5;
//停止控制
var stop = 1;
var dj = {

	//音乐加载
	startMusic: function (name){
		audio = document.querySelector('audio');
		//绑定加载完开始
		audio.addEventListener('canplaythrough', function(){
			window.top.postMessage('ready',location);
		},false)
		//绑定播放完停止
		audio.addEventListener('ended', function(){
			stop = 1;
			window.top.postMessage('stop',location);
		},false)
	}
	//控制区域事件
	,control: function(){
		var that = this;
		window.addEventListener('message', function(ev){
			//console.log(ev.data);
			var data = ev.data.split(',');
			switch (data[0]){
				case 'play':
					stop = 0;
					audio.play();
					break;
				case 'pause':
					stop = 1;
					audio.pause();
					break;
				case 'stop':
					stop = 1;
					audio.pause();
					audio.currentTime = 0;
					break;
				case 'skip':
					audio.currentTime += data[1];
					break;
				case 'vol':
					source.setvol(data[1]);
					break;
				case 'addfilter':
					source.addfilter();
					break;
				case 'removefilter':
					source.removefilter();
					break;
				case 'filtertype':
					source.setfilter.type(data[1]);
					break;
				case 'filterfrequency':
					source.setfilter.frequency(parseInt(data[1]));
					break;
				case 'filterq':
					source.setfilter.q(data[1]);
					break;
				case 'filtergain':
					source.setfilter.gain(data[1]);
					break;
				default:
					console.log('No this message!');
					break;
			}
		})
	}
	//执行此对象
	,init: function(){
		this.startMusic();//音乐加载
		web_audio_api_init();//滤波器加载
		this.control();//控制绑定
	}
}
dj.init();