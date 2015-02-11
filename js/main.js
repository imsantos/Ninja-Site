$ = jQuery.noConflict();
/* --------------------------------------------
 * 
 * Main menu hover altering
 * 
 ------------------------------------------- */

$('#mobileSelect').change(function() {
	window.location = $(this).val();
});
	
$('#main-menu ul').prev().addClass('with-siblings');

$.each($('#main-menu >li:first, #main-menu > li:last'), function(i,v){
	if($(v).find(' > ul').length == 1){
		if(i == 0 ){
			$(v).addClass('first');
		} else {
			$(v).addClass('last');
		}
	}
});

if($('.carousel01').length)
	$('.carousel01, .carousel02').carousel();

if($('.staff-members a').length){
	$('.staff-members a').popover({
		placement: 'top',
		trigger: 'hover'
	});
}

$('.accordion .accordion-toggle').on('click', function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active')
	} else {
		$(this).closest('.accordion').find('.active').removeClass('active')
		$(this).addClass('active');
	}
});

$('#main-menu>li').on('mouseover', function(){
	var ul = $(this).find('ul');
	var a = $(ul).find('a');
	ul.parent().addClass('active');
	ul.stop(true,false).slideDown(250);
});

$('#main-menu li').on('mouseout', function(){
	var ul = $(this).find('ul');
	ul.stop(true,false).slideUp(250);
	ul.parent().removeClass('active');
});

$(document).ready(function(){
	var form = $('.wpcf7');
	$.each(form, function(i,v){
		var parent = $(v).parent();

		if(/span.*/.test(parent.attr('class'))){
			$(v).find('input[type="text"],input[type="email"], textarea, select').addClass('span12');
		}
	})
	
	if ( $.browser.msie && $.browser.version <= 8) {
		if($('.post-icons').length > 0){
			$('.post-icons').css('display' , 'none');
			
			$('.post-icon').on('mouseover', function(){
				$(this).find('.post-icons').css('display', 'none');
			}).on('mouseout', function(){
				$(this).find('.post-icons').css('display', 'none');
			})
		}
		
		$.each($('table[id*=wp-calendar]'), function(i,v){
			$.each($(v).children(), function(i,v){
				parseNode(v);
			})
		});

		function parseNode(node){
			if($(node).children().length == 0){
				$(node).html('<span>'+$(node).html()+'</span>');
			} else {
				$.each($(node).children(), function(i,v){
					parseNode(v);
				})
			}
		}
		
	}
	

	
	$('input, textarea').placeholder();
});