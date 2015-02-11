var _mobileVersion = false;
var _isAnimating = false;
var _stripeWidth = $('.stripe-container .stripe').not('.stripe-ghost').first().width();

jQuery('html, body').addClass('iseeunicorn-front-page');

if($(window).innerWidth() < 800){
	_mobileVersion = true;
	jQuery('html, body').addClass('iseeunicorn');
}

calc();

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

function hideButtons(){
	if($(window).innerWidth() > 800 && $(window).innerWidth() <= 1024 && isMobile){
		$('.btn-prev').animate({ opacity : 1, left : 0 }, 175)
		$('.btn-next').animate({ opacity : 1, right : 0 }, 175)
	} 
}	

hideButtons();

$(window).resize(function(e) {
   calc();

	hideButtons();


   if($(window).innerWidth() < 800){
       _mobileVersion = true;
       $('.stripe-container .stripe-ghost').css('width', '0');
       $('.stripe-container').css('margin-left', '0');
	   jQuery('html, body').addClass('iseeunicorn');
	   
	   if($('.btn-prev').css('opacity') == 1){
			$('.btn-prev').animate({ opacity : 0, left : '-'+$('.btn-prev').width()}, 175)
		}
		if($('.btn-next').css('opacity') == 1){
			$('.btn-next').animate({ opacity : 0, right : '-'+$('.btn-next').width()}, 175);
		}
	} else {
		_mobileVersion = false;
		jQuery('html, body').removeClass('iseeunicorn');
	}
});


$(window).on('keyup', function(e){
	if(_mobileVersion) return;

	//left 37
	if(e.keyCode == 37){
		next();
	}
	//right 39;
	if(e.keyCode == 39){
		prev();
	}

	// up 38
	if(e.keyCode == 38){
		$('.stripe-container .stripe').eq(1).removeClass('active');
	}

	// down 40
	if(e.keyCode == 40){
		$('.stripe-container .stripe').eq(1).addClass('active');
	}
});

$('.btn-prev').on('click',function(){
   next();
});

$('.btn-next').on('click',function(){
	prev();
});

// ie8 fix...

if ($.browser.msie && $.browser.version <= 8) {
	(function(){
		var addEvent = (function(){
			if (window.addEventListener) {
				return function(el, sType, fn, capture) {
						el.addEventListener(sType, fn, (capture));
					};
				} else if (window.attachEvent) {
					return function(el, sType, fn, capture) {
						el.attachEvent("on" + sType, fn);
					};
				} else {
					return function(){};
				}
			})();
			addEvent(document, 'mousewheel', function(event){
			event = window.event || event ;
			var d = event.wheelDelta ? event.wheelDelta : '0';

			if(d > 0){
				next();
			} else {
				prev();
			}
		}, false);
	})();

	document.attachEvent('onmousemove', function(e) {
		showButtons(e);
	});

} else {
	$(window).bind('mousewheel', function(event, delta, deltaX, deltaY) {
		if(_mobileVersion) return;
		event.preventDefault();
		$('#becouse-thats-why').css('display', 'block');
		$('.stripe-container .active').removeClass('active');
		if (deltaY < 0) {
			prev();
		} else {
			next();
		}
	});

$(window).on('mousemove', function(e){
	showButtons(e);
});

}

var v = null;

function prev() {
	clearTimeout(v);
	if(_isAnimating) return;
	_isAnimating = true;

   $('.stripe-ghost').animate({ 'width' : 0 }, 500, function(){
		ftl();
		_isAnimating = false;
		v = setTimeout(function() {
			$('#becouse-thats-why').css('display', 'none');
		}, 300);
	});
}

function next() {
	clearTimeout(v);
	if(_isAnimating) return;
	_isAnimating = true;

	ltf();
	$('.stripe-ghost').animate({ 'width' : _stripeWidth}, 500, function(){
		_isAnimating = false;
		v = setTimeout(function(){
			$('#becouse-thats-why').css('display', 'none');
		}, 300);
	});
}

function calc() {
	if($(window).innerWidth() < 800){
		$('.stripe-container .stripe-ghost').css('width', '0');
		$('.stripe-container').css('margin-left', '0');
	} else {
		_stripeWidth = $('.stripe-container .stripe').not('.stripe-ghost').first().width();
		$('.stripe-ghost').css('width', _stripeWidth+'px' );
		$('.stripe-container').css('margin-left' , '-'+_stripeWidth+'px');
	}
}

function ltf() { // last to first
	var lastItem = $('.stripe-container .stripe').last().clone();
	$('.stripe-container .stripe-ghost').css('width', '0');
	$('.stripe-container .stripe-ghost').after(lastItem);
	$('.stripe-container .stripe').last().remove();
}

function ftl(){ //  first to last
   var firstItem = $('.stripe-container .stripe').not('.stripe-ghost').first().clone();
   $('.stripe-container .stripe-ghost').animate({'width': _stripeWidth}, 0);
   $('.stripe-container .stripe').last().after(firstItem);
   $('.stripe-container .stripe').not('.stripe-ghost').first().remove();
}

/* --------------------------------------------
 * 
 * Previous/Next buttons displayed on the page
 * sides depending on current mouse position
 * ver. 0.1
 * 
 ------------------------------------------- */



var buttonsScreenPercentShow = 10;

function showButtons(e){
		if(_mobileVersion) return;
	var windowSize = $(window).innerWidth();
	var showWidth = windowSize*(buttonsScreenPercentShow/100);
	var button = null;
	if(e.clientX < showWidth) {
		// show left thing
		button = $('.btn-prev');
		//if(button.css('opacity') === 0) {
			button.stop(true,false).animate({ opacity : 1, left : 0}, 175);
		//}
	} else if(e.clientX > windowSize-showWidth){
		//show right thing
		button = $('.btn-next');
		//if(button.css('opacity') === 0) {
			button.stop(true,false).animate({ opacity : 1, right : 0}, 175);
		//}
	} else {
		if($('.btn-prev').css('opacity') == 1){
			$('.btn-prev').animate({ opacity : 0, left : '-'+$('.btn-prev').width()}, 175);
		}
		if($('.btn-next').css('opacity') == 1){
			$('.btn-next').animate({ opacity : 0, right : '-'+$('.btn-next').width()}, 175);
		}
	}
}

/**
 * Bottom stripe menu
 */
$(document).on('click mouseenter mouseleave touchdown touchup touchstart', '.show-more-posts', function(){
	$(this).toggleClass('open');
});

$(document).on('mouseover', '.stripe', function(){
	$('.stripe').not($(this)).find('.open').removeClass('open');
});

/**
 * stripe active class & prev next button 
 */
var lastActiveStripe = null;
$(document).on('mouseover', '.stripe', function(){
	if(_mobileVersion) return;
	$('.stripe-container .active').removeClass('active');
	$(this).addClass('active');
	lastActiveStripe = $(this);
});
$(document).on('mouseout', '.stripe', function(){
	if(_mobileVersion) return;
	$(this).removeClass('active');
});

$('.stripe-holder .btn-prev').on('mouseover', function(){
	if(lastActiveStripe)
		lastActiveStripe.addClass('active');
});

$('.stripe-holder .btn-next').on('mouseover', function(){
	if(lastActiveStripe)
		lastActiveStripe.addClass('active');
});

$('.stripe-btn').on('click', function(){
	lastActiveStripe = null;
	$('.stripe-container .active').removeClass('active');
});

/*
 * Post relocation if no post-image attached
 */

$.each($(".stripe"), function(i,v) {
	if ($(v).find('figure').length === 0) {
		$(v).find('.content-container').css('margin-top','95px');
	}
});
