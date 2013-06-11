var audio;
var touch_arr = [];

//每转一圈所需时间（单位：秒）
var ptime = 5;
//定时器控制器
var p = 1;
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
			audio = new Audio('music/'+name+'.mp3');
		else 
			audio.src = 'music/'+name+'.mp3';
		audio.addEventListener('canplaythrough', function(){
			audio.play();			
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
		,reg = /\-?[0-9]+\.?[0-9]*/g ;

		/*
		document.addEventListener('touchstart',function(){
			baseX = event.touches[0].clientX;
			baseY = event.touches[0].clientY;
			//if(x>300&&x<600&&y>300&&y<600){
				p =0;
				audio.pause();
				touch_arr = [];
				touch_arr.push([baseX,baseY]);
			//}
		},false)
		document.addEventListener('touchmove',function(){
			var x = event.changedTouches[0].clientX
			,y = event.changedTouches[0].clientY;
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
					audio.currentTime += pchtime_1;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]>height/2)){
				//右下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				if(len%8 == 1){
					audio.currentTime += pchtime_2;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]>height/2)){
				//左下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				if(len%8 == 1){
					audio.currentTime += pchtime_3;
					//console.log(audio.currentTime);
				}
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]<height/2)){
				//左上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				if(len%8 == 1){
					audio.currentTime += pchtime_4;
					//console.log(audio.currentTime);
				}
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		},false)
		document.addEventListener('touchend',function(){
			p = 1;
			audio.play();
		},false)
		*/
		
		

		$('.cover').bind('mousedown',function(){
			baseX = event.clientX - $('.table')[0].offsetLeft;
			baseY = event.clientY - $('.table')[0].offsetTop;
			//console.log(event.clientX);
			//if(x>300&&x<600&&y>300&&y<600){
				p = 0;
				audio.pause();
				touch_arr = [];
				touch_arr.push([baseX,baseY]);
			//}
			$('.cover').bind('mousemove', turn);
		})
		
		function turn (ev){
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
					audio.currentTime += pchtime_1;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]>width/2)&&(touch_arr[len][1]>height/2)){
				//右下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_2)+'deg)';
				if(len%8 == 1){
					audio.currentTime += pchtime_2;
					//console.log(audio.currentTime);
				}
				
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]>height/2)){
				//左下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_3)+'deg)';
				if(len%8 == 1){
					audio.currentTime += pchtime_3;
					//console.log(audio.currentTime);
				}
			}
			else if((touch_arr[len][0]<width/2)&&(touch_arr[len][1]<height/2)){
				//左上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(parseInt(rotate)+pdeg_4)+'deg)';
				if(len%8 == 1){
					audio.currentTime += pchtime_4;
					//console.log(audio.currentTime);
				}
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		}
		
		$('.cover').bind('mouseup',function(){
			p = 1;
			audio.play();
			$('.cover').unbind('mousemove', turn);
		})
	}
	,drag: function(){
		var that = this;
		$('.musiclist').bind('dragstart',function(){
			//a=this;
			//console.log(this.childNodes[5].value);
			event.dataTransfer.setData('Text',this.childNodes[5].value);
		})
		$('.cover').bind('dragover',function(){
			event.preventDefault();
		})
		$('.cover').bind('dragenter',function(){
			event.preventDefault();
		})
		$('.cover').bind('drop',function(){
			var data = event.dataTransfer.getData('Text');
			that.startMusic(data)
			//console.log(data);
		})
	}
	,init: function(){
		$('body')[0].style.height = document.documentElement.clientHeight;
		this.startMusic('1');
		this.startRub();
		this.drag();
		this.rub();
	}
}
dj.init();