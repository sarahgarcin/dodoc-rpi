function fillPopOver( content, thisbutton, finalWidth, finalHeight, closeCallbackFunction ) {
	var $popover = $(".popover");
	if( $popover.find(".popoverContainer").length === 0) {
		$popover.html( "<div class='popoverContainer'></div>");
	}

	$("body").addClass("is-overlaid");

	$popoverContainer = $popover.find(".popoverContainer");
	$popoverContainer.html(content);

	$popover.addClass("is-visible");

	// si il y a un champ input dedans, passer le focus au premier 
	if( $popover.find("input").length > 0 ) {
		$popover.find("input").eq(0).focus();	
	}

	var button = thisbutton;
	var maxQuickWidth = 900;

	var topSelected = button.offset().top - $(window).scrollTop(),
	leftSelected = button.offset().left,
	widthSelected = button.width(),
	heightSelected = button.height(),
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	finalLeft = (windowWidth - finalWidth)/2,
	finalTop = (windowHeight - finalHeight)/2,
	quickViewWidth = ( windowWidth * 0.8 < maxQuickWidth ) ? windowWidth * 0.8 : maxQuickWidth ,
	quickViewLeft = (windowWidth - quickViewWidth)/2;

	$('.popover').css({
	    "top": finalTop+ 'px',
	    "left": finalLeft+ 'px',
	    "width": finalWidth+'px',
	    "height": finalHeight+'px'
	});



	$("body").on('click', function(event){
		if( $(event.target).is('.close-panel') || $(event.target).is('body.is-overlaid')) {
			closePopover( closeCallbackFunction);
		}
	});
	$(document).keyup(function(event){
  	if(event.which === '27'){
			closePopover( closeCallbackFunction);
		}
	});
}

function closePopover( closeCallbackFunction) {
	console.log( "closePopover ");
	console.log( closeCallbackFunction);
	console.log( "--- ");

	$("body").removeClass("is-overlaid");
	$(".popover").removeClass("is-visible").empty();
	closeCallbackFunction();
}