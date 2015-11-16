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

$( document ).ready(function () {

    $("form").on("submit", function(event) {
        event.preventDefault();
        avgColor = raster.getAverageColor(spot1.path);
        $("#spot1_actual").css("background-color", avgColor.toCSS());
    })

});