$(document).ready(function(){

    var StudyMatch = {

        headDiscipline: null,
        subDisciplines: null,
        countries: null,
        cities: null,
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
                            StudyMatch.headDiscipline = this.id;

                            if( $('#Studies')){

                                $('#Studies').remove();
                            }

                            if( $('#Cities')){

                                $('#Cities').remove();
                            }

                            if( $('#Countries')){

                                $('#Countries').remove();
                            }

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

                    var subDisciplineSource = $("#sub-disciplines-template").html();
                    var template = Handlebars.compile(subDisciplineSource);

                    var subDisciplineContext = {title: "Sub Disciplines",
                            subdisciplines: SubDisciplines};
                    var subDiscHtml = template(subDisciplineContext);

                    $('#sub-disciplines-placeholder').html( subDiscHtml);

                     $('#sub-disciplines-list li').click(function(){

                            StudyMatch.getCountries();
                            StudyMatch.subDisciplines = this.id;

                         if( $('#Studies')){

                                $('#Studies').remove();
                            }

                        if( $('#Cities')){

                            $('#Cities').remove();
                        }
                        });
                }
            });

        },

        getCountries: function(){

            var Countries = [];

            $.ajax({
                url: "http://sl5.hackathon.studyportals.xyz/data/countries/any/list/?length=15",
                async: false,
                dataType: 'json',
                success: function(data) {

                    $.each(data, function(key, val){

                        Countries.push({
                            id: val.id,
                            name: val.name
                        });
                    });

                    var countriesSource = $("#countries-template").html();
                    var template = Handlebars.compile(countriesSource);

                    var countriesContext = {title: "Countries",
                            country: Countries};
                    var countriesHtml = template(countriesContext);

                    $('#countries-placeholder').html( countriesHtml);

                    $('#countries-list li').click(function(){

                        StudyMatch.getCities(this.id);
                        StudyMatch.countries = this.id;

                        if( $('#Studies')){

                            $('#Studies').remove();
                        }

                    });
                }
            });
        },

        getCities: function(id){

            var Cities = [];

            $.ajax({
                url: "http://sl5.hackathon.studyportals.xyz/data/cities/any/list/?q=ci-" + id,
                async: false,
                dataType: 'json',
                success: function(data) {

                    $.each(data, function(key, val){

                        Cities.push({
                            id: val.id,
                            name: val.name
                        });
                    });

                    var citiesSource = $("#cities-template").html();
                    var template = Handlebars.compile(citiesSource);

                    var citiesContext = {title: "Cities",
                            city: Cities};
                    var citiesHtml = template(citiesContext);

                    $('#cities-placeholder').html( citiesHtml);

                    $('#cities-list li').click(function(){

                        StudyMatch.cities = this.id;
                        StudyMatch.getStudies();

                    });
                }
            });
        },

        getStudies: function() {

            var Studies = [];

            $.ajax({
                url: "http://sl5.hackathon.studyportals.xyz/data/studies/all/?q=di-" + StudyMatch.subDisciplines + "|ti-" + StudyMatch.cities,
                async: false,
                dataType: 'json',
                success: function (data) {

                    $.each(data, function (key, val) {

                        Studies.push({
                            id: val.id,
                            name: val.name
                        });
                    });

                    var studiesSource = $("#studies-template").html();
                    var template = Handlebars.compile(studiesSource);

                    var studiesContext = {
                        title: "Studies",
                        study: Studies
                    };
                    var studiesHtml = template(studiesContext);

                    $('#studies-placeholder').html(studiesHtml);
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