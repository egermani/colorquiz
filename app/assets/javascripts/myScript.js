console.log("loaded");



    var raster = new Raster('game-image');

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
    };

    spot1 = new Spot(15, 900, 300, '1');
    spot2 = new Spot(6, 420, 265, '2');
    spot3 = new Spot(15, 900, 450, '3');
    spot4 = new Spot(15, 960, 200, '4');
    spot5 = new Spot(15, 120, 325, '5');

    function onMouseMove(event) {
        // Set the fill color of the path to the average color
        // of the raster at the position of the mouse:
        // path.fillColor = raster.getAverageColor(event.point);
    }

$(".full").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    move: function(color) {
        $(this).siblings(".semi")
        .css("background-color", color.toHexString());
    }
});

function objectifyRGB(rgbString) {
    // Sample input: "rgb(145,137,164)"
    rgbTuple = rgbString.substring(4, rgbString.length-1).split(",")
    var obj = {}
    obj.R = rgbTuple[0]
    obj.G = rgbTuple[1]
    obj.B = rgbTuple[2]
    return obj
};

function tupleizeRGB(rgbString) {
    // Sample input: "rgb(145,137,164)"
    return rgbString.substring(4, rgbString.length-1).split(",")
};

function euclidean_distance(firstTuple, secondTuple) {
    sums = Math.pow((firstTuple[0] - secondTuple[0]), 2) + Math.pow((firstTuple[1] - secondTuple[1]), 2) + Math.pow((firstTuple[2] - secondTuple[2]), 2)
    return Math.sqrt(sums)
};

$( document ).ready(function () {

    $("form").on("submit", function(event) {
        event.preventDefault();
        // debugger;
        $("td").each(function( cell ) {
            var avgColor = raster.getAverageColor(spots[cell]).toCSS();
            var avgColorTuple = tupleizeRGB(avgColor)
            var avgColorObj = rgb_to_lab(objectifyRGB(avgColor));

            var guessColor = $(this).children(".semi").first().css("background-color");
            var guessColorTuple = tupleizeRGB(guessColor)
            var guessColorObj = rgb_to_lab(objectifyRGB(guessColor));
            guessColor = rgb_to_lab(objectifyRGB(guessColor));
            $(this).children(".semi").last().css("background-color", avgColor);
            // debugger;
            $("ol li:nth-child(" + (cell + 1) + ")").html("Lab colors. Guess: " + guessColorObj.L + "2: " + avgColorObj.L + "Distance " + ciede2000(guessColorObj,avgColorObj));
        });
    });
});