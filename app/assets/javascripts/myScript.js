var spots = []
var texts = []
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

//function onMouseMove(event) {
    // Set the fill color of the path to the average color
    // of the raster at the position of the mouse:
    // path.fillColor = raster.getAverageColor(event.point);
//}

$(".full").spectrum({
    showInput: true,
    move: function(color) {
        $(this).siblings(".semi")
        .css("background-color", color.toHexString());
    }
});

function tupleizeRGB(rgbString) {
    // Sample input: "rgb(145,137,164)"
    return rgbString.substring(4, rgbString.length-1).split(",")
};

function euclidean_distance(firstTuple, secondTuple) {
    sums = Math.pow((firstTuple[0] - secondTuple[0]), 2) + Math.pow((firstTuple[1] - secondTuple[1]), 2) + Math.pow((firstTuple[2] - secondTuple[2]), 2)
    return Math.sqrt(sums)
};

$( document ).ready(function () {

    // When the form is submitted:
    // 1.) Iterate through the table cells and find the avgColor
    //     associated with that spot in the image.
    // 2.) Display it on the circle.
    // 3.) Hide submit button, render results partial.

    $("form").on("submit", function(event) {
        event.preventDefault();
        $("td").each(function( cell ) {
            avgColor = raster.getAverageColor(spots[cell]).toCSS();
            guessColor = $(this).children(".semi").first().css("background-color");
            $(this).children(".semi").last().css("background-color", avgColor);
            // debugger;
            $("ol li:nth-child(" + (cell + 1) + ")").html(Math.floor(euclidean_distance(tupleizeRGB(avgColor), tupleizeRGB(guessColor))));
        });
    });
});