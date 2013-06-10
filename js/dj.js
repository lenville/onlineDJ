var audio;
var dj = {
	start: function (name){
		audio = new Audio(name+'.mp3');
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
			//}
		},false)
		document.addEventListener('touchmove',function(){
			var x = event.changedTouches[0].clientX - baseX
			,y = event.changedTouches[0].clientY - baseY;
			audio.currentTime += x/10;
			audio.currentTime += y/10;
			document.write(x+'<br>'+y+'<br>'+audio.currentTime);
		},false)
		document.addEventListener('touchend',function(){
			audio.play();
		},false)

		document.addEventListener('keydown',function(){
			baseX = event.touches[0].clientX;
			baseY = event.touches[0].clientY;
			//if(x>300&&x<600&&y>300&&y<600){
				audio.pause();
			//}
		},false)
		document.addEventListener('touchmove',function(){
			var x = event.changedTouches[0].clientX - baseX
			,y = event.changedTouches[0].clientY - baseY;
			audio.currentTime += x/100;
			audio.currentTime += y/100;
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