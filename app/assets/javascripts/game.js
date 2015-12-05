console.log("Sprockets is working now")

// $(function() {
    
//    $('#game-image').mousemove(function(e) {
    
//         if(!this.canvas) {
//             this.canvas = $('<canvas />')[0];
//             this.canvas.width = this.width;
//             this.canvas.height = this.height;
//             this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
//         }
        
//         var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        
//         $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);

//     });
    
    
    
// });




// Eyedropper code, from this fiddle: http://jsfiddle.net/m1erickson/zpfdv/

// var canvas = document.getElementById("imageid");
// var ctx = canvas.getContext("2d");

// var canvasOffset = $("#canvas").offset();
// var offsetX = canvasOffset.left;
// var offsetY = canvasOffset.top;

// var eyedropperIsActive = false;

// drawTestColors(20, 20, "red");
// drawTestColors(100, 20, "green");
// drawTestColors(180, 20, "blue");

// function drawTestColors(x, y, color) {
//     ctx.beginPath();
//     ctx.fillStyle = color;
//     ctx.rect(x, y, 50, 50);
//     ctx.fill();
// }


// function getPixelColor(x, y) {
//     var pxData = ctx.getImageData(x, y, 1, 1);
//     return ("rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
// }


// function handleMouseMove(e) {

//     if (!eyedropperIsActive) {
//         return;
//     }

//     mouseX = parseInt(e.clientX - offsetX);
//     mouseY = parseInt(e.clientY - offsetY);

//     // Put your mousemove stuff here
//     var eyedropColor = getPixelColor(mouseX, mouseY);
//     $("#results").css("backgroundColor", getPixelColor(mouseX, mouseY));

// }

// $("#canvas").click(function (e) {
//     eyedropperIsActive = false;
// });
// $("#canvas").mousemove(function (e) {
//     handleMouseMove(e);
// });
// $("#startDropper").click(function (e) {
//     eyedropperIsActive = true;
// });