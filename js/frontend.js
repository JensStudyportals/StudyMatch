// toggle button for countries
$(document).ready(function() {

	var $showMoreButton = $('#showAllCountries');

	$showMoreButton.on('click', function (e) {

		e.preventDefault();

		var $countryList = $('#allCountries');

		$countryList.toggle('slow');

		if($showMoreButton.text() == 'Show all countries'){
			$(this).text('Hide all countries');
		} else {
			$(this).text('Show all countries');
		}
	});

	$('#menu li').click(function(){

		var scrollTo = $(this).attr('data-scrollTo');

		$('html, body').animate({
			scrollTop: $('#'+scrollTo).offset().top
		}, 1000);
	});

	$(document).on('click', '.liwrapper', function() {
		$(this).parent().siblings().find('.liwrapper').removeClass("selected");
		$(this).toggleClass("selected");
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	});
});