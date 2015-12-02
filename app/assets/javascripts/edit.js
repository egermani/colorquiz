$( document ).ready(function () {
    var tool = new paper.Tool();
    tool.activate();
    var spots = [];
    var texts = [];
    var spotCounter = 0;

    raster = new Raster('game-image');
    // var raster = new Raster('game-image');

    // Move the raster to the center of the view
    raster.position = view.center;

    function Spot(spotSize, xCoord, yCoord, marker) {
        this.marker = marker
      this.xCoord = xCoord;
      this.yCoord = yCoord;
      this.path = new paper.Path.Circle({
        center: [xCoord, yCoord],
        radius: spotSize,
        fillColor: 'white',
        strokeColor: 'white'
                });
      this.path.fillColor.alpha = 0.0;
      this.path.data = marker;
      this.path.onClick = function(event) {
        // debugger;
        this.remove();
        spots[this.data-1] = null;
        texts[this.data-1].remove();
    }
      spots.push(this.path);
      this.text = new paper.PointText({
        point: [xCoord - (spotSize * 2), yCoord - spotSize],
        content: this.marker,
        fillColor: 'white',
        fontFamily: 'Courier New',
        fontSize: 20
        });
      texts.push(this.text);
    };

    tool.onMouseDown = function (event) {
        // debugger;
        if (document.getElementById("mode_add").checked) {
            spotCounter++;
            new Spot(15, event.point.x, event.point.y, spotCounter);
        };
    }

    // For each spot associated with the image, create one, and push it into an array.
    var data = $('#myCanvas').data('spots');

    for (i = 0; i <= data.length - 1; i++) {
        spot = data[i];
        new Spot(spot.radius, spot.x, spot.y, spotCounter+1)
        spotCounter++
    }

    // spot1 = new Spot(15, 900, 300, '1');
    // spot2 = new Spot(6, 420, 265, '2');
    // spot3 = new Spot(15, 900, 450, '3');
    // spot4 = new Spot(15, 960, 200, '4');
    // spot5 = new Spot(15, 120, 325, '5');
});