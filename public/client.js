// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

(function($) {
  console.log('hello world :o');
var latitude;
var longitude;
  
  function success(position){
    
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
  
    var mapProp= {
    center:new google.maps.LatLng(latitude,longitude),
    zoom:15,
      };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var myLatLng = {lat: latitude, lng: longitude};
    
    var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'You are here'
  });

  }
  //curent location 
  navigator.geolocation.getCurrentPosition(success);
  
 $.ajax({
        url: 'https://api.flickr.com/services/rest/?method=flickr.photos.geo.photosForLocation&api_key=94e8c0b4aee1f1622bb5c7abc89c5679&lat=latitude&lon=longitude&per_page=3&format=json',
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log("flickr");
            console.log(data);
        },
            error: function(xhr, status, error) {
                console.log("Error flickr");
                var err = ("(" + xhr.responseText + ")");
                console.log(err);
                console.log(status);
                console.log(error);
            }
    });



  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

})(jQuery);

function goBack() {
    window.history.back()
}
