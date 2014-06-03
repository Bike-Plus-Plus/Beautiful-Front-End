$(function() {

  var map, stepPoints, coords, currentPointIndex, currentMarker, stepInterval;

  map = L.map('map', {
    center: [34, -118],
    zoom: 15
  } );

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  stepPoints = function() {
    var point, mapBounds;
    point = coords[currentPointIndex];

    if (!currentMarker) {
      currentMarker = L.marker(point);
      currentMarker.addTo(map);
    } else {
      currentMarker.setLatLng(point);
    }
    map.panTo(point);
    // mapBounds = map.getBounds();
    // if ( ! mapBounds.contains(point) ) {
    //   map.panTo(point);
    // }
    currentPointIndex++;

    if (currentPointIndex >= coords.length) {
      currentPointIndex = 0;
    }
  }

  $.ajax({
    url: 'jen_route.min.json',
    dataType: 'json',
    success: function(data) {
      var point, split;

      currentPointIndex = 0;
      coords = [];
      $(data).each(function() {
        split = this.split(/\s+/);
        point = [
          split[1],
          split[0]
        ];
        coords.push(point);
      });
      clearInterval(stepInterval);
      stepInterval = setInterval(stepPoints, 67);

    }
  });
});
