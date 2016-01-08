// Chuck darts into a sphere
function generateDistractors(originColor, n, r, minDist, maxDist) {
    var palette = [originColor]
    while (palette.length < n) {
        x = randomIntFromInterval(-r,r)
        y = randomIntFromInterval(-r,r)
        z = randomIntFromInterval(-r,r)
        if (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <= Math.pow(r, 2)) {
            var flag = true
            newColor = {L: originColor.L + x, a: originColor.a + y, b: originColor.b + z}
            for (var i = palette.length - 1; i >= 0; i--) {
                distance = ciede2000(palette[i], newColor)
                console.log(distance);
                if (distance < minDist || distance > maxDist) {
                    flag = false;
                }
                if (flag == false) {
                    break;
                }
            };
            if (flag == true) {
                palette.push(newColor)
            };
        }
    }
    return palette
}
// Convert that value to rgb
// Run CIEDE to see if it's appropriate distance from all previously placed points.