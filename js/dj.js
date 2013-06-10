var audio;
var touch_arr = [];
var dj = {
	start: function (name){
		$('body')[0].style.height = document.documentElement.clientHeight;
		audio = new Audio('music/'+name+'.mp3');
		audio.addEventListener('canplaythrough', function(){
			audio.play();
		},false)
	}
	,rub: function() {
		var baseX , baseY;
		document.addEventListener('touchstart',function(){
			baseX = event.touches[0].clientX;
			baseY = event.touches[0].clientY;
			//if(x>300&&x<600&&y>300&&y<600){
				audio.pause();
				touch_arr = [];
				touch_arr.push([baseX,baseY]);
			//}
		},false)
		document.addEventListener('touchmove',function(){
			var x = event.changedTouches[0].clientX - baseX
			,y = event.changedTouches[0].clientY - baseY;
			//audio.currentTime += x/100;
			//audio.currentTime += y/100;

			//判定擦盘位置，旋转擦盘，改变音轨
			height = document.documentElement.clientHeight;
			width = document.documentElement.clientWidth;
			touch_arr.push([x,y]);
			var len = touch_arr.length;
			var reg = /\-?[0-9]+\.?[0-9]*/g ;
			var ratate = $('.logo')[0].style.webkitTransform.match(reg);
			if(touch_arr[len][0]>width/2&&touch_arr[len][1]<height/2){
				//右上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(rotate+x-touch_arr[len][0]+y-touch_arr[len][1])/20+'deg)';
				audio.currentTime += (x-touch_arr[len][0])/50;
				audio.currentTime += (y-touch_arr[len][1])/50;
			}
			else if(touch_arr[len][0]>width/2&&touch_arr[len][1]>height/2){
				//右下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(rotate-x+touch_arr[len][0]+y-touch_arr[len][1])/20+'deg)';
				audio.currentTime -= (x-touch_arr[len][0])/50;
				audio.currentTime += (y-touch_arr[len][1])/50;
			}
			else if(touch_arr[len][0]<width/2&&touch_arr[len][1]>height/2){
				//左下角
				$('.logo')[0].style.webkitTransform = 'rotate('+(rotate-x+touch_arr[len][0]-y+touch_arr[len][1])/20+'deg)';
				audio.currentTime -= (x-touch_arr[len][0])/50;
				audio.currentTime -= (y-touch_arr[len][1])/50;
			}
			else if(touch_arr[len][0]<width/2&&touch_arr[len][1]<height/2){
				//左上角
				$('.logo')[0].style.webkitTransform = 'rotate('+(rotate+x-touch_arr[len][0]-y+touch_arr[len][1])/20+'deg)';
				audio.currentTime += (x-touch_arr[len][0])/50;
				audio.currentTime -= (y-touch_arr[len][1])/50;
			}
			//document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		},false)
		document.addEventListener('touchend',function(){
			audio.play();
		},false)

	
	}
	,init: function(){
		this.start('1');
		this.rub();
	}
}
dj.init();