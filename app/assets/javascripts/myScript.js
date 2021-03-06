var spots = []
var texts = []
var spotCounter = 0;
var raster = new Raster('game-image');
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
if (data.length === undefined) {
    data = [data]
};

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
    preferredFormat: "rgb",
    showInput: true,
    move: function(color) {
        $(this).siblings(".semi")
        .css("background-color", color.toHexString());
        RGB.R = color._r / 255;
        RGB.G = color._g / 255;
        RGB.B = color._b / 255;
        RGB2XYZ();
        XYZ2Lab();
        $("#LSlider").val(Lab.L);
        $("#LSlider").next().html(Lab.L.toFixed(2));
        $("#aSlider").val(Lab.a);
        $("#aSlider").next().html(Lab.a.toFixed(2));
        $("#bSlider").val(Lab.b);
        $("#bSlider").next().html(Lab.b.toFixed(2));
    },
    change: function(color) {
        // debugger;
        $(this).siblings("input[type=hidden]").first().val(color.toHexString());
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
    GetRGBModel(11);
    GetAdaptation();

    // When the form is submitted:
    // 1.) Iterate through the table cells and find the avgColor
    //     associated with that spot in the image.
    // 2.) Display it on the circle.
    // 3.) Hide submit button, render results partial.

    $("form").on("submit", function(event) {
        // event.preventDefault();
        // debugger;
        $("td").each(function( cell ) {
            var avgColor = raster.getAverageColor(spots[cell]).toCSS(true);
            debugger;
            $(this).children(".semi").last().css("background-color", avgColor);
        });
    });

    $("#defaults").on("click", function(event) {
        event.preventDefault;
        $(".semi.left").css("background-color", "#FFFFFF")
        $(".sp-light+input[type=hidden]").val("#FFFFFF")
    })

    $("input[type=text]").on("input", function(){
       $("#LSlider").val($("#LText").val());
       $("#aSlider").val($("#aText").val());
       $("#bSlider").val($("#bText").val());
    });

    $("input[type=range]").on("input", function(){
        $(this).next().html(this.value);
        Lab.L = Number($("#LSlider").val());
        Lab.a = Number($("#aSlider").val());
        Lab.b = Number($("#bSlider").val());
        Lab2XYZ();
        XYZ2RGB();
        var checked = $('input[type=radio]:checked')
        checked.siblings(".semi").css("background-color", tinyRGB());
        checked.siblings(".full").spectrum("set", tinyRGB());
        checked.siblings("input[type=hidden]").first().val(tinyRGB());
    });
});