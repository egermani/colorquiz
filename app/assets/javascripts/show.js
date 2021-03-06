$( document ).ready(function () {
    var tool = new paper.Tool();
    tool.activate();
    var spots = [];
    var texts = [];
    var spotCounter = 0;

    var hitOptions = {
        fill: true,
        tolerance: 5
    };

    var path;
    var movePath = false;

    var raster = new Raster('game-image');
    // var raster = new Raster('game-image');

    // Move the raster to the center of the view
    raster.position = view.center;

    function getActivated() {
        var activated = project.getItems({
            selected: true,
            className: "Path"
        });
        return activated
    }

    function deselect(activated) {
        var activated = getActivated()
                for (var i = activated.length - 1; i >= 0; i--) {
                    activated[i].selected = false;
                };
    }

    function Spot(spotSize, xCoord, yCoord, marker) {
        this.marker = marker
      this.xCoord = xCoord;
      this.yCoord = yCoord;
      this.path = new paper.Path.Circle({
        center: [xCoord, yCoord],
        radius: spotSize,
        fillColor: 'black',
        strokeColor: 'white'
        });
      this.path.fillColor.alpha = 0.0;
      setContrastColor(this.path, 0.60, raster, "strokeColor");
      // this.path.blendMode = 'negation';
      this.path.data = marker;
      // this.path.onClick = function(event) {
      //   // debugger;
      //   this.remove();
      //   spots[this.data-1] = null;
      //   texts[this.data-1].remove();
    // }
      spots.push(this.path);
      this.text = new paper.PointText({
        point: [this.path.bounds.topLeft.x - 15, this.path.bounds.topLeft.y - 3],
        content: this.marker,
        fillColor: 'white',
        fontFamily: 'Courier New',
        fontSize: 20
        });
      // this.text.blendMode = 'negation';
      setContrastColor(this.text, 0.60, raster, "fillColor");
      texts.push(this.text);
      return this.path
    };

    tool.onMouseDown = function (event) {
        path = null;
        var hitResult = project.hitTest(event.point, hitOptions);

        if (hitResult && hitResult.item.getClassName() != "Path") {
            deselect();
        }

        if (hitResult && hitResult.item.getClassName() == "Path") {
            path = hitResult.item;
            movePath = hitResult.type == 'fill';
            if (movePath) {
                deselect();
                path.selected = true;
                project.activeLayer.addChild(path);
                var spotId = $("#myCanvas").data('spots')[path.data - 1]["id"];
                var imageId = $("#myCanvas").data('spots')[path.data - 1]["image_id"];
                $.get( imageId + "/spots/" + spotId + ".js", function( data ) {
                  $( "#result" ).html( data );
                  $(".compare").each(function ( index ) {
                      var playerGuess = $(this).attr("value");
                      var realColor = $(this).attr("data");
                      $(this).spectrum({
                          showPalette: true,
                          palette: [
                              [playerGuess, realColor]
                          ]
                      });
                  });
                });
            };
        };
    }

    function setContrastColor(object, threshold, raster, colorable) {
        var newColor = raster.getAverageColor(object.position);
        if (newColor.lightness >= threshold) {
            object[colorable] = newColor - 1;
        } else {
            object[colorable] = newColor + 1;
        };
    }

    // For each spot associated with the image, create one, and push it into an array.
    var data = $('#myCanvas').data('spots');

    for (i = 0; i <= data.length - 1; i++) {
        spot = data[i];
        new Spot(spot.radius, spot.x, spot.y, spotCounter+1)
        spotCounter++
    }

    $("#spot_submit").on("submit", function(event) {
        event.preventDefault();
        var spots = project.getItems({className: "Path"})
        console.log(spots);
        var reformattedArray = spots.map(function(obj){ 
           var rObj = {};
           rObj.radius = obj.bounds.width / 2;
           rObj.color = raster.getAverageColor(obj).toCSS(true);
           rObj.x = Math.floor(obj.position.x)
           rObj.y = Math.floor(obj.position.y)
           return rObj;
        });
        // debugger;
        // var route = $(this).attr("action")
        // $.ajax({
        //     url: route,
        //     method: "POST",
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     data: JSON.stringify({spot: reformattedArray})
        //     })
    })

    // spot1 = new Spot(15, 900, 300, '1');
    // spot2 = new Spot(6, 420, 265, '2');
    // spot3 = new Spot(15, 900, 450, '3');
    // spot4 = new Spot(15, 960, 200, '4');
    // spot5 = new Spot(15, 120, 325, '5');
});