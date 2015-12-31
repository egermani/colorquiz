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