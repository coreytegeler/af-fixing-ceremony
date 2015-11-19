(function($){
  $(function(){
	// localStorage.clear();
	var visited = localStorage.getItem('visited');
	visited = JSON.parse(visited);
	if(visited == null) {
		visited = {
			'movement-i' : false,
			'movement-ii' : false,
			'movement-iii' : false,
			'movement-iv' : false
		}
	}


	$('video').on("ended", function() {
		setTimeout(function() {
			window.location.href = '/affixing-ceremony/four-movements/';
		}, 500);
	});

	if($('body').hasClass('movement')) {
		var movement = 'movement-' + $('body').attr('id');
		visited[movement] = true;
		console.log(visited);
		visited = JSON.stringify(visited);
		localStorage.setItem('visited', visited);
	}

	if($('body').is('#four-movements')) {
		console.log(visited);
		var length = Object.keys(visited).length;
		for(var i = 0; i < length; i++) {
			var roman;
			switch(i) {
				case 0:
					roman = 'i';
					break;
				case 1:
					roman = 'ii';
					break;
				case 2:
					roman = 'iii';
					break;
				case 3:
					roman = 'iv';
					break;
			}
			var movement = 'movement-'+roman;
			var visible = !visited[movement];
			var item = $('.menu-item.'+roman);
			if(visible) {
				$(item).addClass('show');
			}
		}

	}


    var $backstory = $('#backstory_topics');

    var $button = $('<div class="continue-button">')
      .text('Continue to icaphila.org')
      .click(function(){
        var params = "day_with";
        if (window.location.pathname != "/day_without_art") {
          window.location.replace(update_query(window.location.href, params))
        } else {
          window.location.href = window.location.origin
        }
      });

    $backstory.append($button);
  });
})(jQuery);



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