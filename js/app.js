$(document).ready(function(){

    var StudyMatch = {

        headDiscipline: null,
        subDisciplines: [],
        countries: [],
        cities: [],
        studies: [],


        getHeadDicsiplines: function(){

                var HeadDsiciplines = [];

                $.ajax({
                    url: "http://sl5.hackathon.studyportals.xyz/data/disciplines/any/top/",
                    async: false,
                    dataType: 'json',
                    success: function(data) {

                        $.each(data, function(key, val){

                            HeadDsiciplines.push({
                                id: val.id,
                                name: val.name
                            });
                        });

                        var disciplineSource = $("#disciplines-template").html();
	                    var template = Handlebars.compile(disciplineSource);

                        var disciplineContext = {title: "Disciplines",
                            disciplines: HeadDsiciplines};
                        var discHtml = template(disciplineContext);

                        $('#disciplines-placeholder').html( discHtml);

                        $('#head-discipline-list li').click(function(){

                            StudyMatch.getSubDisciplinesFromHeadDisciplines(this.id);
                        });
                    }
                });
        },

        getSubDisciplinesFromHeadDisciplines: function(discipline_id){

            var SubDisciplines = [];

            $.ajax({
                url: "http://sl5.hackathon.studyportals.xyz/data/disciplines/any/details/" + discipline_id + "/subdisciplines/",
                async: false,
                dataType: 'json',
                success: function(data) {

                    $.each(data, function(key, val){

                        SubDisciplines.push({
                            id: val.id,
                            name: val.name
                        });
                    });

                    //alert(SubDisciplines[0].name);

                    var subDisciplineSource = $("#sub-disciplines-template").html();
                    var template = Handlebars.compile(subDisciplineSource);

                    var subDisciplineContext = {title: "Sub Disciplines",
                            subdisciplines: SubDisciplines};
                    var subDiscHtml = template(subDisciplineContext);

                    $('#sub-disciplines-placeholder').html( subDiscHtml);
                }
            });

        }
    };

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

    StudyMatch.getHeadDicsiplines();




});