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
		$(this).remove();
		if(video) {
			video.play();
		}
	});

	$(video).on('ended', function() {
		setTimeout(function() {
			completed(active);
			window.location.href = '../four-movements/';
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
			$('.positive').wrap('<a href="../credits/"></a>');

		}
	} else if($('body').is('#ii')) {
		$('.image').click(function() {
			var totalCount = $('.image').length;
			var clickedCount = $('.image.clicked').length;
			if($(this).hasClass('zoom')) {
				if(clickedCount == totalCount) {
					window.location.href = '../four-movements/';
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
		$('.name').each(function() {
			var wild = Math.round(Math.random()) * 2 - 1
			var shiftX = Math.floor((Math.random() * 10) + 1) * wild;
			var shiftY = Math.floor((Math.random() * 10) + 1) * wild;
			$(this).css({
				'transform' : 'translateX('+shiftX+'%) translateY('+shiftY+'%)'
			});
		});
	}

	////////////////////////////////////////
    var $backstory = $('#backstory_topics');

    var $button = $('<div class="continue-button">')
      .text('Continue to icaphila.org')
      .click(function(){
        var params = "day_with";
        if (window.location.pathname != "/day-without-art-2015") {
          window.location.replace(update_query(window.location.href, params))
        } else {
          window.location.href = window.location.origin
        }
      });

    $backstory.append($button);
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