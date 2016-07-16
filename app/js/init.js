$("select").imagepicker();

setTimeout(function() {
	selector = $(".thumbnails.image_picker_selector");
	selector.addClass('sport-carousel-select');
	selector.data("flickity", { freeScroll: true, contain: true, prevNextButtons: false, pageDots: false });
	selector.find('.thumbnail').each(function(index) {
	  $(this).addClass('carousel-cell');
	});

	$('.sport-carousel-select').flickity();	
}, 1000);
