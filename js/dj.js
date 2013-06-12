var audio;
var touch_arr = [];
var source;
//每转一圈所需时间（单位：秒）
var ptime = 5;
//定时器控制器(1转，0不转)
var p = 0;
//擦盘声音音量(0-1.0)
var rubVolume = 0.5;
//停止控制
var stop = 1;
//var a;
var dj = {	
	//定时器
	interval: function (fn,time){
		setTimeout(function(){
			fn();
			setTimeout(arguments.callee, time);
		}, time)
	}
	,startMusic: function (name){
		
		if(!audio)
			audio = document.querySelector('audio');
		else{
			delete audio;
			audio = null;
			$('#au').html('');
			$('#au').html('<audio src="music/'+name+'.mp3"></audio>');
			audio = document.querySelector('audio');
			
		}
		//绑定加载完开始
		audio.addEventListener('canplaythrough', function(){
			if(stop == 0){
				p = 1;
				audio.play();
			}		
		},false)
		//绑定播放完停止
		audio.addEventListener('ended', function(){
			stop = 1;
			p = 0;
			$('#play')[0].value = '开始';
		})
		
	}
	,startRubMusic: function(){
		var rubAudio = new Audio('music/rub.wav');
		rubAudio.volume = rubVolume;
		rubAudio.addEventListener('canplaythrough', function(){
			rubAudio.play();			
		},false)
	}
	,startRub: function(){
		this.interval(fn,30);
		var pdeg = 360/(ptime/0.03)
		,reg = /\-?[0-9]+\.?[0-9]*/g ;
		function fn (){
			var rotate = $('.logo')[0].style.webkitTransform.match(reg)[0];
			if(p == 1)
			$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg)+'deg)';
		}
	}
	,rub: function() {
		var baseX , baseY
		,height = $('.cover')[0].clientHeight
		,width = $('.cover')[0].clientWidth
		,reg = /\-?[0-9]+\.?[0-9]*/g 
		that = this


		//触控版的绑定
		document.addEventListener('touchstart',function(){
			baseX = event.touches[0].clientX - $('.table')[0].offsetLeft;
			baseY = event.touches[0].clientY - $('.table')[0].offsetTop;
			if(audio&&!audio.ended){
				p =0;
				audio.pause();
			}
			touch_arr = [];
			touch_arr.push([baseX,baseY]);
			
		},false)
		document.addEventListener('touchmove',function(){
			//播放rubmusic
			that.startRubMusic();

			var x = event.changedTouches[0].clientX - $('.table')[0].offsetLeft
			,y = event.changedTouches[0].clientY - $('.table')[0].offsetTop;
			touch_arr.push([x,y])
			var len = touch_arr.length - 2
			//console.log(len);
			,rotate = $('.logo')[0].style.webkitTransform.match(reg)[0]
			//每次转动角度
			,pdeg_1 = (x-touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_2 = (-x+touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_3 = (-x+touch_arr[len][0]-y+touch_arr[len][1])/7
			,pdeg_4 = (x-touch_arr[len][0]-y+touch_arr[len][1])/7
			//每次改变音轨时间长度
			,pchtime_1 = ptime*(pdeg_1/360)*12
			,pchtime_2 = ptime*(pdeg_2/360)*12
			,pchtime_3 = ptime*(pdeg_3/360)*12
			,pchtime_4 = ptime*(pdeg_4/360)*12;

			//audio.currentTime += x/100;
			//audio.currentTime += y/100;

			//判定擦盘位置，旋转擦盘，改变音轨
			//console.log(x+'<br>'+y);
			
			if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]<height/2)){
				//右上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_1)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_1;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]>height/2)){
				//右下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_2;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]>height/2)){
				//左下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_3;
					//console.log(audio.currentTime);
				}
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]<height/2)){
				//左上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_4;
					//console.log(audio.currentTime);
				}
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		},false)
		document.addEventListener('touchend',function(){
			if(audio&&!audio.ended){
				if(stop == 0){
					p = 1;
					audio.play();
				}
			}
		},false)


		//电脑版的绑定
		$('.cover').bind('mousedown',function(){
			baseX = event.clientX - $('.table')[0].offsetLeft;
			baseY = event.clientY - $('.table')[0].offsetTop;
			if(audio&&!audio.ended){
				p = 0;
				audio.pause();
			}
			touch_arr = [];
			touch_arr.push([baseX,baseY]);
			
			$('.cover').bind('mousemove', turn);
		})
		
		function turn (ev){
			//播放rubmusic
			that.startRubMusic();

			var x = ev.clientX - $('.table')[0].offsetLeft
			,y = ev.clientY - $('.table')[0].offsetTop;
			touch_arr.push([x,y])
			var len = touch_arr.length - 2
			//console.log(len);
			,rotate = $('.logo')[0].style.webkitTransform.match(reg)[0]
			//每次转动角度
			,pdeg_1 = (x-touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_2 = (-x+touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_3 = (-x+touch_arr[len][0]-y+touch_arr[len][1])/7
			,pdeg_4 = (x-touch_arr[len][0]-y+touch_arr[len][1])/7
			//每次改变音轨时间长度
			,pchtime_1 = ptime*(pdeg_1/360)*12
			,pchtime_2 = ptime*(pdeg_2/360)*12
			,pchtime_3 = ptime*(pdeg_3/360)*12
			,pchtime_4 = ptime*(pdeg_4/360)*12;

			//audio.currentTime += x/100;
			//audio.currentTime += y/100;

			//判定擦盘位置，旋转擦盘，改变音轨
			//console.log(x+'<br>'+y);
			
			if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]<height/2)){
				//右上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_1)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_1;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]>height/2)){
				//右下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_2;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]>height/2)){
				//左下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_3;
					//console.log(audio.currentTime);
				}
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]<height/2)){
				//左上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				if(len%8 == 1){
					if(audio&&!audio.ended)
					audio.currentTime += pchtime_4;
					//console.log(audio.currentTime);
				}
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		}
		
		$('.cover').bind('mouseup',function(){
			if(audio&&!audio.ended){
				if(stop == 0){
					p = 1;
					audio.play();
				}
			}
			$('.cover').unbind('mousemove', turn);
		})
	}
	//拖动事件
	,drag: function(){
		var that = this;
		$('.musiclist').bind('dragstart',function(){
			event.dataTransfer.setData('Text',this.childNodes[5].value);
		})
		$('.musiclist').bind('click',function(){
			stop = 0;
			$('.logo').css('background','url(image/'+this.childNodes[5].value+'.png)');
			that.startMusic(this.childNodes[5].value);
			//web_audio_api_init();
			$('#play').val('暂停');
		})
		$('.cover').bind('dragover',function(){
			event.preventDefault();
		})
		$('.cover').bind('dragenter',function(){
			event.preventDefault();
		})
		$('.cover').bind('drop',function(){
			var data = event.dataTransfer.getData('Text');
			stop = 0;
			$('.logo').css('background','url(image/'+data+'.png)');
			that.startMusic(data);
			//web_audio_api_init();
			$('#play').val('暂停');
		})
	}
	//控制区域事件
	,control: function(){
		var that = this
		,filter_arr = [["lowpass",0],["highpass",0],["bandpass",0],["lowshelf",0],["highshelf",0],["peaking",0],["notch",0],["allpass",0]];
		a = filter_arr;
		//开始暂停
			$('#play').bind('click',function(){
				if(!audio){
					that.startMusic('1');
					this.value = "暂停";
				}
				else{
					if(audio.paused){
						stop = 0;
						audio.play();
						this.value = '暂停';
						p = 1;
					}
					else{
						stop = 1;
						audio.pause();
						this.value = '开始';
						p = 0;
					}
				}
				
			})
		//停止
			$('#stop').bind('click',function(){			
				audio.pause();
				stop = 1;
				audio.currentTime = 0;
				$('#play').val('开始');
				p = 0;
			})

		//音乐音量调节
		$('#volume').bind('change', function(){
			audio.volume = this.value/100;
		})
		//擦盘音量调节

		$('#rubvolume').bind('change', function(){
			rubVolume = this.value/100;
		})

		//滤波器
		//开
		$('#filter-on').bind('click', function(){
			source.addfilter();
			$('#filter-on')[0].disabled = true;
			$('#filter-off')[0].disabled = false;
			source.setfilter.type(filter_arr[7][0]);
		})
		//关
		$('#filter-off').bind('click', function(){
			source.removefilter();
			$('#filter-off')[0].disabled = true;
			$('#filter-on')[0].disabled = false;
			for(var j = 0; j < 8; j++) {
				$('#'+filter_arr[j][0])[0].disabled = false;
			}
		})
		function fn(k){
			$('#'+filter_arr[k][0]).bind('click', function(){
				if(filter_arr[k][1] == 0)
					filter_arr[k][1] = 1;
				source.setfilter.type(filter_arr[k][0]);
				for(var j = 0; j < 8; j++) {
					if(k == j)
						$('#'+filter_arr[j][0])[0].disabled = true;
					else
						$('#'+filter_arr[j][0])[0].disabled = false;
				}
			})
		}
		for(var i = 0; i < 8; i++) {
			fn(i);
		}

		$('#frequency').bind('change', function(){
			var frequency_arr = [220,440,880,1600,3200,6400];
			source.setfilter.frequency(frequency_arr[this.value]);
		})
		$('#q').bind('change', function(){
			source.setfilter.q(this.value);
		})
		$('#filtergain').bind('change', function(){
			source.setfilter.gain(this.value);
		})

	}
	,init: function(){
		$('body')[0].style.height = document.documentElement.clientHeight;
		this.startMusic();
		this.startRub();
		this.drag();
		this.rub();
		web_audio_api_init();
		this.control();
	}
}
dj.init();