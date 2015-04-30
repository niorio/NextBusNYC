$(function () {

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getStops(position.coords.latitude, position.coords.longitude);
    });
  } else {
    getStopsWithoutGeolocation();
  }

  var getStopsWithoutGeolocation = function (){
    $.ajax({
      url:'api/stops/nearby',
      method: 'get',
      datatype: "json",
      data: {no_location: true},
      success: renderStops
    })

  }

  var getStops = function (lat, long){

    $.ajax({
      url:'api/stops/nearby',
      method: 'get',
      datatype: "json",
      data: {lat: lat, long: long},
      success: renderStops
    })
  }

  var renderStops = function(stops){
    var $el = $('#content');
    var $stop;
    $el.empty();
    for (var i = 0; i < stops.length; i++){
      $stop = $('<div>').text(stops[i].name).addClass('stop');
      $stop.data('stop-id', stops[i].id);
      $stopInfo = $('<div class="stop-info collapsed"></div>')
      $stopInfo.attr("id", stops[i].id)
      $el.append($stop, $stopInfo);
    }
    $('.stop').on('click', toggleCollapse);
  }

  var toggleCollapse = function(event){
    var stopId = $(event.currentTarget).data('stop-id');
    var stopInfo = $('#'+stopId);
    if (stopInfo.hasClass('collapsed')){
      showBuses(stopInfo);
    } else {
      stopInfo.addClass('collapsed');
    }
  }

  var showBuses = function($stopInfo){

    var stopId = $stopInfo.attr('id');
    $stopInfo.empty();

    var renderBuses = function(buses){
      buses.forEach(function(bus){
        console.log(bus);
        $bus = $('<div>').addClass('bus');
        $line = $('<div>').text(bus.line);
        $des = $('<div>').text(bus.destination);
        $dis = $('<div>').text(bus.distance);
        $bus.append($line, $des, $dis);
        $stopInfo.append($bus)
      })
      setTimeout(function(){
        $stopInfo.removeClass('collapsed');
      }, 0)

    }

    $.ajax({
      url:'api/stops/buses',
      method: 'get',
      datatype: "json",
      data: {stop_id: stopId},
      success: renderBuses
    })


  }



});
