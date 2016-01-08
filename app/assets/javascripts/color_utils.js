function clampRGB(number) {
    if (number < 0) {
        return 0
    } else if (number > 1) {
        return 1
    } else {
        return number
    };
}

function tinyRGB() {
    return tinycolor.fromRatio({r:clampRGB(RGB.R), g:clampRGB(RGB.G), b:clampRGB(RGB.B)}).toHexString()
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function RGB2Lab() {
    GetRGBModel(11);
    GetAdaptation();
    RGB2XYZ();
    XYZ2Lab();
    return Lab;
};

function Lab2RGB() {
    Lab2XYZ();
    XYZ2RGB();
    return RGB;
};

function jitterNumber(min, max) {
    var sign = (Math.floor(Math.random() * 2) == 0) ? -1 : 1;
    var delta = sign * randomIntFromInterval(min, max)
    return delta
}

// color = new tinycolor("#8f59f6")
// pctColor = color.toPercentageRgb()
// RGB = {
//     R: parseFloat(pctColor.r) / 100.0,
//     R: parseFloat(pctColor.g) / 100.0,
//     R: parseFloat(pctColor.b) / 100.0,
// }

// function jitterColor(hex)
// {
//     var string = "<%= j(@actual) %>"
//     var RGB = {
//         R: parseInt("<%= j(@actual[1..2]) %>", 16) / 255,
//         G: parseInt("<%= j(@actual[3..4]) %>", 16) / 255,
//         B: parseInt("<%= j(@actual[5..6]) %>", 16) / 255,
//     };
//     var i = 0
//     while (i < 10) {
//     // 3 times do
//         // pick a number from 5 to 15
//         var change = randomIntFromInterval(5,15);
//         // pick a sign
//         var sign = (Math.floor(Math.random() * 2) == 0) ? -1 : 1;
//         change = change * sign;
//         // add number to original lab value
//         original += change;
//         var Lab = orgLab
//     // Append circle to distractors
//     console.log(i);
//     i++;
//     }
// }