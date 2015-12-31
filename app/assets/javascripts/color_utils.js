function tinyRGB() {
    
    return tinycolor.fromRatio({r:RGB.R, g:RGB.G, b:RGB.B}).toHexString()
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