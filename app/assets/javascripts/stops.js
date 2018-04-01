// $(function () {

//   setTimeout(function(){
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(getStops);
//     } else {
//       $('#content').text("unable to get location");
//     }
//   }, 0)


//   var getStops = function(position) {
//     $.ajax({
//       url:'api/stops/nearby',
//       method: 'get',
//       datatype: "json",
//       data: {lat: position.coords.latitude, long: position.coords.longitude},
//       success: renderStops
//     })
//   }

//   var renderStops = function(stops){
//     var $el = $('#content');
//     var $stop;
//     $el.empty();
//     for (var i = 0; i < stops.length; i++){
//       $stop = $('<div>').text(stops[i].name).addClass('stop');
//       $stop.data('stop-id', stops[i].id);
//       $stopInfo = $('<div class="stop-info collapsed"></div>')
//       $stopInfo.attr("id", stops[i].id)
//       $el.append($stop, $stopInfo);
//     }
//     $('.stop').on('click', toggleCollapse);
//   }

//   var toggleCollapse = function(event){
//     var stopId = $(event.currentTarget).data('stop-id');
//     var stopInfo = $('#'+stopId);
//     if (stopInfo.hasClass('collapsed')){
//       showBuses(stopInfo);
//     } else {
//       stopInfo.addClass('collapsed');
//     }
//   }

//   var showBuses = function($stopInfo){

//     var stopId = $stopInfo.attr('id');
//     $stopInfo.empty();

//     var renderBuses = function(buses){
//       buses.forEach(function(bus){
//         $bus = $('<div>').addClass('bus group');
//         $line = $('<div class="line">').text(bus.line);
//         $des = $('<div class="destination">').text(bus.destination);
//         $dis = $('<div class="distance">').text(bus.distance);
//         $status = $('<div class="status">').text(bus.status);
//         $bus.append($line, $des, $dis, $status);
//         $stopInfo.append($bus)
//       })

//       if (buses.length === 0){
//         $stopInfo.append($('<div class="bus">No Buses</div>'))
//       }

//       $stopInfo.removeClass('collapsed');

//     }

//     $.ajax({
//       url:'api/stops/buses',
//       method: 'get',
//       datatype: "json",
//       data: {stop_id: stopId},
//       success: renderBuses
//     })

//   }



// });
