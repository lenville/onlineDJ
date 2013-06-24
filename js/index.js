var touch_arr = [];

//每转一圈所需时间（单位：秒）
var ptime = 5;
//定时器控制器(1转，0不转)
var p = 0;
//擦盘声音音量(0-1.0)
var rubVolume = 0.5;
//停止控制
var stop = 1;
//滤波对应值
var filter_arr = [["lowpass",0],["highpass",0],["bandpass",0],["lowshelf",0],["highshelf",0],["peaking",0],["notch",0],["allpass",0]];
//var a;
var index = {
	//定时器
	interval: function (fn,time){
		setTimeout(function(){
			fn();
			setTimeout(arguments.callee, time);
		}, time)
	}
	//传递消息给iframe
	,postIframe: function (message){
		var iframe = window.frames[0];
		iframe.postMessage(message,iframe.location.href);
	}
	//擦盘音乐加载
	,startRubMusic: function(){
		var rubAudio = new Audio('music/rub.wav');
		rubAudio.volume = rubVolume;
		rubAudio.addEventListener('canplaythrough', function(){
			rubAudio.play();			
		},false)
	}
	//擦盘加载
	,startRub: function(){
		this.interval(fn,30);
		var pdeg = 360/(ptime/0.03)
		,reg = /\-?[0-9]+\.?[0-9]*/g ;
		function fn (){
			var rotate = $('.logo')[0].style.msTransform||$('.logo')[0].style.webkitTransform;
			rotate = (rotate&&rotate.match(reg)) ? rotate.match(reg)[0] : 0 ;
			if(p == 1){
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg)+'deg)';
			}
		}
	}
	//擦盘实现
	,rub: function() {
		var baseX , baseY
		,height = $('.cover')[0].clientHeight
		,width = $('.cover')[0].clientWidth
		,reg = /\-?[0-9]+\.?[0-9]*/g 
		that = this;


		//触控版的擦盘实现
		document.addEventListener('touchstart',function(){
			baseX = event.touches[0].clientX - $('.table')[0].offsetLeft;
			baseY = event.touches[0].clientY - $('.table')[0].offsetTop;
			p =0;
			that.postIframe('pause')
			touch_arr = [];
			touch_arr.push([baseX,baseY]);
			
		},false)
		document.addEventListener('touchmove',function(){
			var x = event.changedTouches[0].clientX - $('.table')[0].offsetLeft
			,y = event.changedTouches[0].clientY - $('.table')[0].offsetTop;
			touch_arr.push([x,y])
			var len = touch_arr.length - 2
			//console.log(len);
			,rotate = $('.logo')[0].style.msTransform||$('.logo')[0].style.webkitTransform;
			rotate = (rotate&&rotate.match(reg)) ? rotate.match(reg)[0] : 0 ;
			//每次转动角度
			var pdeg_1 = (x-touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_2 = (-x+touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_3 = (-x+touch_arr[len][0]-y+touch_arr[len][1])/7
			,pdeg_4 = (x-touch_arr[len][0]-y+touch_arr[len][1])/7
			//每次改变音轨时间长度
			,pchtime_1 = ptime*(pdeg_1/360)*8
			,pchtime_2 = ptime*(pdeg_2/360)*8
			,pchtime_3 = ptime*(pdeg_3/360)*8
			,pchtime_4 = ptime*(pdeg_4/360)*8;

			//播放rubmusic
			if(len%16 == 1)
				that.startRubMusic();

			//判定擦盘位置，旋转擦盘，改变音轨		
			if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]<height/2)){
				//右上角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_1)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_1)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_1);
					//if(audio&&!audio.ended)
					//audio.currentTime += pchtime_1;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]>height/2)){
				//右下角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_2);
					//if(audio&&!audio.ended)
					//audio.currentTime += pchtime_2;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]>height/2)){
				//左下角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_3);
					//if(audio&&!audio.ended)
					//audio.currentTime += pchtime_3;
					//console.log(audio.currentTime);
				}
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]<height/2)){
				//左上角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_4);
					//if(audio&&!audio.ended)
					//audio.currentTime += pchtime_4;
					//console.log(audio.currentTime);
				}
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		},false)
		document.addEventListener('touchend',function(){
			if(stop == 0){
				p = 1;
				that.postIframe('play');
			}
		},false)


		//电脑版的擦盘实现
		$('.cover').bind('mousedown',function(){
			baseX = event.clientX - $('.table')[0].offsetLeft;
			baseY = event.clientY - $('.table')[0].offsetTop;
			p =0;
			that.postIframe('pause')
			touch_arr = [];
			touch_arr.push([baseX,baseY]);
			
			$('.cover').bind('mousemove', turn);
		})
		
		function turn (ev){
			var x = ev.clientX - $('.table')[0].offsetLeft
			,y = ev.clientY - $('.table')[0].offsetTop;
			touch_arr.push([x,y])
			var len = touch_arr.length - 2
			//console.log(len);
			,rotate = $('.logo')[0].style.msTransform||$('.logo')[0].style.webkitTransform;
			rotate = (rotate&&rotate.match(reg)) ? rotate.match(reg)[0] : 0 ;
			//每次转动角度
			var pdeg_1 = (x-touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_2 = (-x+touch_arr[len][0]+y-touch_arr[len][1])/7
			,pdeg_3 = (-x+touch_arr[len][0]-y+touch_arr[len][1])/7
			,pdeg_4 = (x-touch_arr[len][0]-y+touch_arr[len][1])/7
			//每次改变音轨时间长度
			,pchtime_1 = ptime*(pdeg_1/360)*8
			,pchtime_2 = ptime*(pdeg_2/360)*8
			,pchtime_3 = ptime*(pdeg_3/360)*8
			,pchtime_4 = ptime*(pdeg_4/360)*8;

			//播放rubmusic
			if(len%16 == 1)
				that.startRubMusic();

			//判定擦盘位置，旋转擦盘，改变音轨			
			if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]<height/2)){
				//右上角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_1)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_1)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_1);
				}
				
			}
			else if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]>height/2)){
				//右下角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_2);
				}
				
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]>height/2)){
				//左下角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_3);
				}
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]<height/2)){
				//左上角
				$('.logo')[0].style.msTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				if(len%8 == 1){
					that.postIframe('skip,'+pchtime_4);
				}
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		}
		
		$('.cover').bind('mouseup',function(){
			if(stop == 0){
				p = 1;
				that.postIframe('play');
			}
			$('.cover').unbind('mousemove', turn);
		})
	}
	//拖动事件
	,drag: function(){
		var that = this;
		//开始移出时信息传递
		$('.musiclist').bind('dragstart',function(){
			event.dataTransfer.setData('Text',this.childNodes[5].value);
		})
		//取消唱碟机区域的可拖拽事件
		$('.cover').bind('dragover',function(){
			event.preventDefault();
		})
		$('.cover').bind('dragenter',function(){
			event.preventDefault();
		})

		function change(){
			$('#filter-on')[0].disabled = false;
			$('#filter-off')[0].disabled = false;
			for(var j = 0; j < 8; j++) {
				$('#'+filter_arr[j][0])[0].disabled = false;
			}
			
			//监控iframe发回的消息来控制音乐
			window.addEventListener('message', function(ev){
				switch(ev.data){
					case 'ready':
						that.postIframe('play');
						stop = 0;
						p = 1;
						$('#play').val('暂停');
						break;
					case 'stop':
						p = 0;
						stop = 1;
						$('#play').val('开始');
						break;
					default:
						console.log('No this message!');
						break;
				}
			})
		}
		//拖拽到达唱碟机区域时切换歌曲
		$('.cover').bind('drop',function(){
			var data = event.dataTransfer.getData('Text');
			$('.logo').css('background','url(image/'+data+'.png)');
			$('#au').html('<iframe src="dj/'+data+'.html" frameborder="0"></iframe>');
			change();
		})
		//点击也可切换歌曲的绑定
		$('.musiclist').bind('click',function(){
			$('.logo').css('background','url(image/'+this.childNodes[5].value+'.png)');
			$('#au').html('<iframe src="dj/'+this.childNodes[5].value+'.html" frameborder="0"></iframe>');
			change();
		})
	}
	//控制区域事件
	,control: function(){
		var that = this;
		//开始暂停
			$('#play').bind('click',function(){
				if(this.value == '开始'){
					that.postIframe('play');
					this.value = '暂停';
					p = 1;
					stop = 0;
				}
				else{
					stop = 1;
					that.postIframe('pause');
					this.value = '开始';
					p = 0;
					stop = 1;
				}
			})
		//停止
			$('#stop').bind('click',function(){			
				that.postIframe('stop');
				$('#play').val('开始');
				p = 0;
			})

		//音乐音量调节
		$('#volume').bind('change', function(){
			that.postIframe('vol,'+this.value/100)
		})
		//擦盘音量调节
		$('#rubvolume').bind('change', function(){
			rubVolume = this.value/100;
		})

		//滤波器
		//开
		$('#filter-on').bind('click', function(){
			that.postIframe('addfilter');
			$('#filter-on')[0].disabled = true;
			$('#filter-off')[0].disabled = false;
			for(var j = 0; j < 8; j++) {
				if(filter_arr[j][1] == 1){
					$('#'+filter_arr[j][0])[0].disabled = true;
					that.postIframe('filtertype,'+filter_arr[j][0]);
				}
			}
		})
		//关
		$('#filter-off').bind('click', function(){
			that.postIframe('removefilter');
			$('#filter-off')[0].disabled = true;
			$('#filter-on')[0].disabled = false;
			for(var j = 0; j < 8; j++) {
				$('#'+filter_arr[j][0])[0].disabled = false;
			}
		})
		//每个按钮的绑定
		function fn(k){
			$('#'+filter_arr[k][0]).bind('click', function(){
				if(filter_arr[k][1] == 0)
					filter_arr[k][1] = 1;
				that.postIframe('filtertype,'+filter_arr[k][0]);
				for(var j = 0; j < 8; j++) {
					if(k == j)
						$('#'+filter_arr[j][0])[0].disabled = true;			
					else{
						filter_arr[k][1] = 0;
						$('#'+filter_arr[j][0])[0].disabled = false;
					}
						
				}
			})
		}
		for(var i = 0; i < 8; i++) {
			fn(i);
		}
		//下面三个控制条的绑定
		$('#frequency').bind('change', function(){
			var frequency_arr = [220,440,880,1600,3200,6400];
			that.postIframe('filterfrequency,'+frequency_arr[this.value])
		})
		$('#q').bind('change', function(){
			that.postIframe('filterq,'+this.value)
		})
		$('#filtergain').bind('change', function(){
			that.postIframe('filtergain,'+this.value)
		})


	}
	//执行此对象
	,init: function(){
		$('body')[0].style.height = document.documentElement.clientHeight;
		this.startRub();//擦盘加载
		this.drag();//拖拽绑定
		this.rub();//擦盘实现
		this.control();//控制绑定
	}
}
index.init();