$(document).ready(function(){

    $.getJSON( "http://sl5.hackathon.studyportals.xyz/data/disciplines/any/top/", function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val.name + "</li>" );
      });

      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
    });
});