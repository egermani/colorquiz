var rectangle = new Rectangle(new Point(0, 50), new Point(255, 60));
var path = new Path.Rectangle(rectangle);
path.fillColor = 'red';
var triangle = new Path.RegularPolygon(new Point(80, 45), 3, 10);
triangle.fillColor = '#e9e9ff';
triangle.rotate(180);
var triangle2 = new Path.RegularPolygon(new Point(200, 70), 3, 10);
triangle2.fillColor = '#e9e9ff';