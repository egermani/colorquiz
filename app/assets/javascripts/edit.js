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

    function deleteActive(activated) {
        var activated = getActivated()
        for (var i = activated.length - 1; i >= 0; i--) {
                    activated[i].remove();
                    texts[activated[i].data-1].remove();
                };
    }

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
      texts.push(this.text);
      return this.path
    };

    tool.onMouseDown = function (event) {
        path = null;
        var hitResult = project.hitTest(event.point, hitOptions);

        if (hitResult && hitResult.item.getClassName() != "Path") {
            deselect();
            spotCounter++;
            var newSpot = new Spot(15, event.point.x, event.point.y, spotCounter);
            newSpot.selected = true;
        }

        if (hitResult && hitResult.item.getClassName() == "Path") {
            path = hitResult.item;
            movePath = hitResult.type == 'fill';
            if (movePath) {
                deselect();
                hitResult.item.selected = true;
                project.activeLayer.addChild(hitResult.item);
                // debugger;
            };
        };
        // // OLD VERSION
        // // debugger;
        // if (document.getElementById("mode_add").checked) {
        //     spotCounter++;
        //     new Spot(15, event.point.x, event.point.y, spotCounter);
        // };
    }

    tool.onMouseDrag = function (event) {
    if (path) {
        path.position += event.delta;
        texts[path.data-1].position += event.delta;
        }
    }

    tool.onKeyDown = function (event) {
        if (event.key == 'backspace') {
        // Scale the path by 110%:
        deleteActive();

        // Prevent the key event from bubbling
        return false;
        } else if (event.key == 'right') {
        // Scale the path by 110%:
        path = getActivated()[0];
        path.scale(1.1);
        // debugger;
        // texts[path.data-1].position = path.bounds.topLeft
        // texts[path.data-1].position += new Point(-10, -10)
        texts[path.data-1].position = new Point(path.bounds.topLeft.x - 10, path.bounds.topLeft.y - 10)


        // Prevent the key event from bubbling
        return false;
        } else if (event.key == 'left') {
        // Scale the path by 110%:
        path = getActivated()[0];
        path.scale(0.9);
        // debugger;
        // texts[path.data-1].position = path.bounds.topLeft
        // texts[path.data-1].position += new Point(-10, -10)
        texts[path.data-1].position = new Point(path.bounds.topLeft.x - 10, path.bounds.topLeft.y - 10)

        // Prevent the key event from bubbling
        return false;
        }
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