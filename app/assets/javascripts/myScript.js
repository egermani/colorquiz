spots = []
raster = new Raster('game-image');
// var raster = new Raster('game-image');

// Move the raster to the center of the view
raster.position = view.center;

function Spot(spotSize, xCoord, yCoord, marker) {
  this.xCoord = xCoord;
  this.yCoord = yCoord;
  this.path = new paper.Path.Circle({
    center: [xCoord, yCoord],
    radius: spotSize,
    strokeColor: 'white'
            });
  this.text = new paper.PointText({
    point: [xCoord - (spotSize * 2), yCoord - spotSize],
    content: marker,
    fillColor: 'white',
    fontFamily: 'Courier New',
    fontSize: 20
    });
  spots.push(this.path);
};

// For each spot associated with the image, create one, and push it into an array.

spot1 = new Spot(15, 900, 300, '1');
spot2 = new Spot(6, 420, 265, '2');
spot3 = new Spot(15, 900, 450, '3');
spot4 = new Spot(15, 960, 200, '4');
spot5 = new Spot(15, 120, 325, '5');

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
$("#fullClearable").spectrum({
    showInput: true,
    allowEmpty:true
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