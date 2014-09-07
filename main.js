(function(){
	var widget = SC.Widget('soundcloud-widget');
	widget.bind(SC.Widget.Events.READY, function(){
		var updatePercent = function(){
			widget.getDuration(function(d1){
				widget.getPosition(function(d2){
					var percent = (d2 / d1) * 100;
					$('.soundcloud-bar').css('width', percent + '%');
				});
			});
		}

		var hiRes = function(s){
			return s.replace(/large.jpg/g, "t500x500.jpg");
		}

		widget.setVolume(50);
		$('.soundcloud').removeClass('loading').addClass('paused');
		widget.getCurrentSound(function(s){
			$('.soundcloud-art').css('background-image', 'url('+hiRes(s.artwork_url)+')');
			$('.soundcloud-title').text(s.title);
		});
		
		widget.bind(SC.Widget.Events.PLAY, function(s){
			widget.getCurrentSound(function(s){
				$('.soundcloud-art').css('background-image', 'url('+hiRes(s.artwork_url)+')');
				$('.soundcloud-title').text(s.title);
			});
			$('.soundcloud').addClass('playing').removeClass('paused');
		});
		
		widget.bind(SC.Widget.Events.FINISH, function(){
			$('.soundcloud-bar').css('width', '0%');
		})
		
		widget.bind(SC.Widget.Events.PAUSE, function(s){
			$('.soundcloud').addClass('paused').removeClass('playing');
		});
		
		widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(s){
			updatePercent();
		});
		
		$('.soundcloud').click(function(){
			widget.toggle();
		});

		$('.soundcloud-button.forward').click(function(){
			widget.next();
			updatePercent();
		});

		$('.soundcloud-button.back').click(function(){
			widget.prev();
			updatePercent();
		});
	});
}());