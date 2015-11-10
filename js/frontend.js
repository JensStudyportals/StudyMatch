// toggle button for countries
$(document).ready(function() {
	var $showMoreButton = $('#showAllCountries');

	$showMoreButton.on('click', function (e) {

		e.preventDefault();

		var $countryList = $('#allCountries');

		$countryList.toggle('slow');

		if($showMoreButton.text() == 'Show all cities'){
			$(this).text('Hide all cities');
		} else {
			$(this).text('Show all cities');
		}
	});

	$('#menu li').click(function(){

		var scrollTo = $(this).attr('data-scrollTo');

		$('html, body').animate({
			scrollTop: $('#'+scrollTo).offset().top
		}, 1000);
	});


	var disciplineSource = $("#disciplines-template").html();
	var template = Handlebars.compile(disciplineSource);

	var disciplineContext = {title: "test",
		disciplines: [{name:"test1"},{name:"test2"}, {name:"test3"}]};
	var discHtml = template(disciplineContext);

	$('#disciplines-placeholder').html( discHtml);

});