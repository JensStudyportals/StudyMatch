$(document).ready(function(){

    var StudyMatch = {

        headDiscipline: null,
        subDisciplines: [],
        countries: [],
        cities: [],
        studies: [],


        getHeadDicsiplines: function(){

            var self = this;

            $.getJSON( "http://sl5.hackathon.studyportals.xyz/data/disciplines/any/top/", function( data ) {

                var items = [];

                $.each( data, function( key, val ) {

                    var li = "<li id='" + key + "'>" + val.name + "</li>";

                    items.push(li);
                });


                $( "<ul/>", {

                    class: "head-discipline",
                    id: 'head-discipline',
                    html: items.join( "" )
                }).appendTo( "body" );

                $('#head-discipline li').click(function(){

                    StudyMatch.headDiscipline = this.id;
                    StudyMatch.getSubDisciplinesFromHeadDisciplines(this.id);
                });
            });

        },

        getSubDisciplinesFromHeadDisciplines: function(){

            $('#sub-discipline-list').remove();

            $("<div/>", {

                id: 'subs',
            }).appendTo("body");

            $.getJSON( "http://sl5.hackathon.studyportals.xyz/data/disciplines/any/details/" + this.headDiscipline + "/subdisciplines/", function( data ) {

                var items = [];

                $.each( data, function( key, val ) {

                    items.push( "<li id='" + key + "'>" + val.name + "</li>" );
                });

                $( "<ul/>", {

                    class: "sub-disciplines",
                    id: 'sub-disciplines',
                    html: items.join( "" )
                }).appendTo( "#subs" );
            });
        }
    };


    StudyMatch.getHeadDicsiplines();
    //StudyMatch.getSubDisciplinesFromHeadDisciplines();



});