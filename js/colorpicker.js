$('#colourpicker a').on('click', function(e){
	e.preventDefault();

	$("link[href*=color]").attr("href",$(this).data('color'));
	$.cookie("css",$(this).data('color'), {expires: 365, path: '/'});
	window.location = window.location;
});
			

//stylesheet switcher + cookie
if($.cookie("css") && $.cookie("css") != '') {
	$("link[href*=color]").attr("href",$.cookie("css"));
}

$('#pull').on('click', function(){
	if($('#colourpicker').hasClass('close-picker')){
		$('#colourpicker').animate({left:'-20px'}, function(){
			$('#colourpicker').removeClass('close-picker');
			//$('#pull').html('&laquo;');
		})

	} else {
		$('#colourpicker').animate({left:'-155px'}, function(){
			$('#colourpicker').addClass('close-picker');
			//$('#pull').html('&raquo;');						
		})				
	}
});

var style = $('#boxed-style');

if($.cookie("rainbowwp-boxed") && $.cookie("rainbowwp-boxed") != '') {	
} else {
	$.cookie("rainbowwp-boxed",'boxed', {expires: 365, path: '/'});
}

if($.cookie("rainbowwp-boxed") == 'boxed') {
	$('#boxunbox').attr('checked',true);
} else {
	$('#boxunbox').attr('checked',false);
	$('#boxed-style').remove();
}

$('#boxunbox').on('change',function(){
	if(!$(this).is(':checked')){			
		$('#boxed-style').remove();
		$.cookie("rainbowwp-boxed",'unboxed', {expires: 365, path: '/'});
	} else {
		$('head').append(style);
		$.cookie("rainbowwp-boxed",'boxed', {expires: 365, path: '/'});
	}
});


if($.cookie("rainbowwp-openstripes") && $.cookie("rainbowwp-openstripes") != '') {	
} else {
	$.cookie("rainbowwp-openstripes",'closed', {expires: 365, path: '/'});
}

if($.cookie("rainbowwp-openstripes") == 'opened') {
	$('#showstripes').attr('checked',true);
	$(document).ready(function(){
		$('.stripe').addClass('baseopen');	
	});
} else {
	$('.stripe').removeClass('baseopen');
}

$('#showstripes').on('change',function(){
	if($(this).is(':checked')){			
		$('.stripe').addClass('baseopen');
		$.cookie("rainbowwp-openstripes",'opened', {expires: 365, path: '/'});
	} else {

		$('.stripe').removeClass('baseopen');
		$.cookie("rainbowwp-openstripes",'closed', {expires: 365, path: '/'});
	}
});