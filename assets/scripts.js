var active;
(function($){
  $(function(){
	// localStorage.clear();
	active = localStorage.getItem('active');
	if(active == null) {
		active = 0;
	}

	var video = $('video')[0];
	$('.overlay').on('click', function() {
		$(this).css({display:'none'});
		if(video) {
			video.play();
			$('body').addClass('dark');
		}
	});

	$(video).on('ended', function() {
		setTimeout(function() {
			completed(active);
			window.location.href = '/day-without-art-2015/four-movements/';
		}, 500);
	});

	$('.return').click(function() {
		completed();
	});

	if($('body').is('#four-movements')) {
		if(active != 4) {
			var roman = romanify(active.toString());
			var movement = 'movement-'+roman;
			var item = $('.menu-item.'+roman);
			$(item).addClass('active');
		} else {
			$('.positive').wrap('<a href="/day-without-art-2015/credits/"></a>');

		}
	} else if($('body').is('#ii')) {

		$('.grid .image').each(function() {
			$(this).children('.center').imagesLoaded( function() {
				var self = $(this)[0].elements;
				var parent = $(self).parent('.image');
				$(parent).addClass('loaded');
			});
		});
		$('.image').click(function() {
			var totalCount = $('.image').length;
			var clickedCount = $('.image.clicked').length;
			if($(this).hasClass('zoom')) {
				if(clickedCount == totalCount) {
					window.location.href = '/day-without-art-2015/four-movements/';
					return;
				}
				$(this).removeClass('zoom');
			} else {
				$(this).addClass('zoom').addClass('clicked');
			}
			if(clickedCount > 10) {
				completed();
			}
		});

	} else if($('body').is('#iv')) {
		// $('.name').each(function() {
		// 	var wild = Math.round(Math.random()) * 2 - 1
		// 	var shiftX = Math.floor((Math.random() * 10) + 1) * wild;
		// 	var shiftY = Math.floor((Math.random() * 10) + 1) * wild;
		// 	$(this).css({
		// 		'transform' : 'translateX('+shiftX+'%) translateY('+shiftY+'%)'
		// 	});
		// });
		$('.play').click(function() {
			var audio = $(this).siblings('audio')[0];
			if(audio.paused) {
				$('.audio').each(function() {
					var otherAudio = $(this).children('audio')[0];
					if(otherAudio != audio) {
						otherAudio.pause();
					}
				});
				$(this).addClass('playing clicked');

				audio.play();
			} else {
				$(this).removeClass('playing');
				audio.pause();
			}
		});

		$('.audio').each(function() {
			var audio = $(this).children('audio')[0];
			audio.onended = function() {
				audio.currentTime = 0;
				audio.pause();
				$(this).removeClass('playing');
			}
		});


		$(window).on('resize', function() {
			if($(this).innerWidth() <= 780) {
				$('.essex').insertAfter($('.names'));
			} else {
				if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					$('.essex').insertBefore($('.names'));
				}
				$('.wrapper').scrollTop(0);
			}
		}).resize();

		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('body').addClass('mobile');
			$('.essex').insertAfter($('.names'));
		}
	}

    var wrapper = $('#credits section');
	var params = "day_with";
    var url = update_query(window.location.origin, params);
    var button = $('<a class="continue">').text('Continue to icaphila.org');
    $(button).attr('href', url);
    $(wrapper).append($(button));
  });

	function completed() {
		var id = $('body').attr('id');
		var number = numbify(id);
		active = number;
		localStorage.setItem('active', active);	
	}

	function romanify(i) {
		switch(i) {
			case '0':
				return 'i';
				break;
			case '1':
				return 'ii';
				break;
			case '2':
				return 'iii';
				break;
			case '3':
				return 'iv';
				break;
		}
	}

	function numbify(roman) {
		switch(roman) {
			case 'i':
				return 1;
				break;
			case 'ii':
				return 2;
				break;
			case 'iii':
				return 3;
				break;
			case 'iv':
				return 4;
				break;
		}
	}


	// Based on function from http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter?foo
	function update_query(url, key) {
	    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
	        hash,
	        query;

	    if (re.test(url)) {
	        hash = url.split('#');
	        url = hash[0].replace(re, '$1' + query + '$2$3').replace(/(&|\?)$/, '');
	        if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
	            url += '#' + hash[1];
	        return url;
	    } else {
	        var separator = url.indexOf('?') !== -1 ? '&' : '?';
	        hash = url.split('#');
	        url = hash[0] + separator + key;
	        if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
	            url += '#' + hash[1];
	        return url;
	    }
	}
})(jQuery);


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-2479189-1', 'auto');
ga('send', 'pageview');