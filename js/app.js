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

                        var disciplineContext = {title: "test",
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

                    alert(SubDisciplines[0].name);

                    //var disciplineContext = {title: "test",
                    //    disciplines: SubDisciplines};
                    //var discHtml = template(disciplineContext);
                    //
                    //$('#sub-disciplines-placeholder').html( discHtml);
                    //
                    //$('#sub-discipline-list li').click(function(data){
                    //
                    //
                    //});
                }
            });

        }
    };


    //StudyMatch.getHeadDicsiplines();
    //StudyMatch.getSubDisciplinesFromHeadDisciplines();


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

	var disciplineSource = $("#disciplines-template").html();
	var template = Handlebars.compile(disciplineSource);

	//alert(StudyMatch.getHeadDicsiplines());

	//var disciplines = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}];
    StudyMatch.getHeadDicsiplines();




});