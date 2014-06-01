$(function() {

  var stepPoints, coords, currentPointIndex, currentMarker;

  stepPoints = function() {
    var point = coords[currentPointIndex];

    if (currentMarker) {
      currentMarker.addTo(null);
    }

    currentMarker = L.marker([
      point.lat,
      point.lng
    ]);
    currentMarker.addTo(map);

    currentPointIndex++;

    if (currentPointIndex >= coords.length) {
      currentPointIndex = 0;
    }
  }

  $.ajax({
    url: 'jen_route.min.json',
    dataType: 'json',
    success: function(data) {
      var dimensions, split;

      currentPointIndex = 0;
      coords = [];
      $(data).each(function() {
        split = coords.push(this.split(' '));
        dimensions = {
          lat: split[0],
          lng: split[1],
          altitude: split[2]
        };
        setInterval(stepPoints, 500);
      });

    }
  });
});
