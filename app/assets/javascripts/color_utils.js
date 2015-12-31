GetAdaptation();

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
};

function RGB2Lab() {
    return XYZ2Lab(RGB2XYZ(RGB));
};

function Lab2RGB(Lab) {
    return XYZ2RGB(Lab2XYZ(Lab));
};
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

function Compand(linear, Gamma)
{
    if (Gamma === undefined) {
        Gamma = -2.2;
    }
    var companded;
    if (Gamma > 0.0)
    {
        companded = (linear >= 0.0) ? Math.pow(linear, 1.0 / Gamma) : -Math.pow(-linear, 1.0 / Gamma);
    }
    else if (Gamma < 0.0)
    {
        /* sRGB */
        var sign = 1.0;
        if (linear < 0.0)
        {
            sign = -1.0;
            linear = -linear;
        }
        companded = (linear <= 0.0031308) ? (linear * 12.92) : (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055);
        companded *= sign;
    }
    else
    {
        /* L* */
        var sign = 1.0;
        if (linear < 0.0)
        {
            sign = -1.0;
            linear = -linear;
        }
        companded = (linear <= (216.0 / 24389.0)) ? (linear * 24389.0 / 2700.0) : (1.16 * Math.pow(linear, 1.0 / 3.0) - 0.16);
        companded *= sign;
    }
    return(companded);
}

function InvCompand(companded, Gamma)
{
    if (Gamma === undefined) {
        Gamma = -2.2;
    }
    var linear;
    if (Gamma > 0.0)
    {
        linear = (companded >= 0.0) ? Math.pow(companded, Gamma) : -Math.pow(-companded, Gamma);
    }
    else if (Gamma < 0.0)
    {
        /* sRGB */
        var sign = 1.0;
        if (companded < 0.0)
        {
            sign = -1.0;
            companded = -companded;
        }
        linear = (companded <= 0.04045) ? (companded / 12.92) : Math.pow((companded + 0.055) / 1.055, 2.4);
        linear *= sign;
    }
    else
    {
        /* L* */
        var sign = 1.0;
        if (companded < 0.0)
        {
            sign = -1.0;
            companded = -companded;
        }
        linear = (companded <= 0.08) ? (2700.0 * companded / 24389.0) : ((((1000000.0 * companded + 480000.0) * companded + 76800.0) * companded + 4096.0) / 1560896.0);
        linear *= sign;
    }
    return(linear);
}

function XYZ2RGB(XYZ)
{
    var RefWhite = {X:0.96422, Y:1.0, Z:0.82521};
    var RefWhiteRGB = {X:0.0, Y:0.0, Z:0.0};
    var MtxRGB2XYZ = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
    var MtxAdaptMa = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
    var MtxAdaptMaI = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};

    var X2 = XYZ.X;
    var Y2 = XYZ.Y;
    var Z2 = XYZ.Z;
    
    if (AdaptationMethod != 3)
    {
        var As = RefWhite.X * MtxAdaptMa.m00 + RefWhite.Y * MtxAdaptMa.m10 + RefWhite.Z * MtxAdaptMa.m20;
        var Bs = RefWhite.X * MtxAdaptMa.m01 + RefWhite.Y * MtxAdaptMa.m11 + RefWhite.Z * MtxAdaptMa.m21;
        var Cs = RefWhite.X * MtxAdaptMa.m02 + RefWhite.Y * MtxAdaptMa.m12 + RefWhite.Z * MtxAdaptMa.m22;
        
        var Ad = RefWhiteRGB.X * MtxAdaptMa.m00 + RefWhiteRGB.Y * MtxAdaptMa.m10 + RefWhiteRGB.Z * MtxAdaptMa.m20;
        var Bd = RefWhiteRGB.X * MtxAdaptMa.m01 + RefWhiteRGB.Y * MtxAdaptMa.m11 + RefWhiteRGB.Z * MtxAdaptMa.m21;
        var Cd = RefWhiteRGB.X * MtxAdaptMa.m02 + RefWhiteRGB.Y * MtxAdaptMa.m12 + RefWhiteRGB.Z * MtxAdaptMa.m22;
        
        var X1 = XYZ.X * MtxAdaptMa.m00 + XYZ.Y * MtxAdaptMa.m10 + XYZ.Z * MtxAdaptMa.m20;
        var Y1 = XYZ.X * MtxAdaptMa.m01 + XYZ.Y * MtxAdaptMa.m11 + XYZ.Z * MtxAdaptMa.m21;
        var Z1 = XYZ.X * MtxAdaptMa.m02 + XYZ.Y * MtxAdaptMa.m12 + XYZ.Z * MtxAdaptMa.m22;
        
        X1 *= (Ad / As);
        Y1 *= (Bd / Bs);
        Z1 *= (Cd / Cs);
        
        X2 = X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
        Y2 = X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
        Z2 = X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;
    }
    
    RGB.R = Compand(X2 * MtxXYZ2RGB.m00 + Y2 * MtxXYZ2RGB.m10 + Z2 * MtxXYZ2RGB.m20);
    RGB.G = Compand(X2 * MtxXYZ2RGB.m01 + Y2 * MtxXYZ2RGB.m11 + Z2 * MtxXYZ2RGB.m21);
    RGB.B = Compand(X2 * MtxXYZ2RGB.m02 + Y2 * MtxXYZ2RGB.m12 + Z2 * MtxXYZ2RGB.m22);

    return RGB;
}

function RGB2XYZ(RGB)
{
    var XYZ = {X:0.96422, Y:1.0, Z:0.82521};
    var X = 0.0;
    var Y = 0.0;
    var Z = 0.0;

    var RefWhiteRGB = {X:0.0, Y:0.0, Z:0.0};
    GetRGBModel(11);

    var RefWhite = {X:0.96422, Y:1.0, Z:0.82521};
    var MtxRGB2XYZ = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
    var MtxAdaptMa = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
    var MtxAdaptMaI = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};

    var R = InvCompand(RGB.R);
    var G = InvCompand(RGB.G);
    var B = InvCompand(RGB.B);
    
    XYZ.X = R * MtxRGB2XYZ.m00 + G * MtxRGB2XYZ.m10 + B * MtxRGB2XYZ.m20;
    XYZ.Y = R * MtxRGB2XYZ.m01 + G * MtxRGB2XYZ.m11 + B * MtxRGB2XYZ.m21;
    XYZ.Z = R * MtxRGB2XYZ.m02 + G * MtxRGB2XYZ.m12 + B * MtxRGB2XYZ.m22;

    if (AdaptationMethod != 3)
    {
        var Ad = RefWhite.X * MtxAdaptMa.m00 + RefWhite.Y * MtxAdaptMa.m10 + RefWhite.Z * MtxAdaptMa.m20;
        var Bd = RefWhite.X * MtxAdaptMa.m01 + RefWhite.Y * MtxAdaptMa.m11 + RefWhite.Z * MtxAdaptMa.m21;
        var Cd = RefWhite.X * MtxAdaptMa.m02 + RefWhite.Y * MtxAdaptMa.m12 + RefWhite.Z * MtxAdaptMa.m22;
        
        var As = RefWhiteRGB.X * MtxAdaptMa.m00 + RefWhiteRGB.Y * MtxAdaptMa.m10 + RefWhiteRGB.Z * MtxAdaptMa.m20;
        var Bs = RefWhiteRGB.X * MtxAdaptMa.m01 + RefWhiteRGB.Y * MtxAdaptMa.m11 + RefWhiteRGB.Z * MtxAdaptMa.m21;
        var Cs = RefWhiteRGB.X * MtxAdaptMa.m02 + RefWhiteRGB.Y * MtxAdaptMa.m12 + RefWhiteRGB.Z * MtxAdaptMa.m22;
        
        var X = XYZ.X * MtxAdaptMa.m00 + XYZ.Y * MtxAdaptMa.m10 + XYZ.Z * MtxAdaptMa.m20;
        var Y = XYZ.X * MtxAdaptMa.m01 + XYZ.Y * MtxAdaptMa.m11 + XYZ.Z * MtxAdaptMa.m21;
        var Z = XYZ.X * MtxAdaptMa.m02 + XYZ.Y * MtxAdaptMa.m12 + XYZ.Z * MtxAdaptMa.m22;
        
        X *= (Ad / As);
        Y *= (Bd / Bs);
        Z *= (Cd / Cs);
        
        XYZ.X = X * MtxAdaptMaI.m00 + Y * MtxAdaptMaI.m10 + Z * MtxAdaptMaI.m20;
        XYZ.Y = X * MtxAdaptMaI.m01 + Y * MtxAdaptMaI.m11 + Z * MtxAdaptMaI.m21;
        XYZ.Z = X * MtxAdaptMaI.m02 + Y * MtxAdaptMaI.m12 + Z * MtxAdaptMaI.m22;
    }
    debugger;
    return XYZ;
}

function XYZ2Lab(XYZ)
{
    var RefWhite = {X:0.96422, Y:1.0, Z:0.82521};

    var xr = XYZ.X / RefWhite.X;
    var yr = XYZ.Y / RefWhite.Y;
    var zr = XYZ.Z / RefWhite.Z;
    
    var fx = (xr > kE) ? Math.pow(xr, 1.0 / 3.0) : ((kK * xr + 16.0) / 116.0);
    var fy = (yr > kE) ? Math.pow(yr, 1.0 / 3.0) : ((kK * yr + 16.0) / 116.0);
    var fz = (zr > kE) ? Math.pow(zr, 1.0 / 3.0) : ((kK * zr + 16.0) / 116.0);
    
    Lab.L = 116.0 * fy - 16.0;
    Lab.a = 500.0 * (fx - fy);
    Lab.b = 200.0 * (fy - fz);

    return Lab;
}

function Lab2XYZ(Lab)
{
    var RefWhite = {X:0.96422, Y:1.0, Z:0.82521};

    var fy = (Lab.L + 16.0) / 116.0;
    var fx = 0.002 * Lab.a + fy;
    var fz = fy - 0.005 * Lab.b;
    
    var fx3 = fx * fx * fx;
    var fz3 = fz * fz * fz;
    
    var xr = (fx3 > kE) ? fx3 : ((116.0 * fx - 16.0) / kK);
    var yr = (Lab.L > kKE) ? Math.pow((Lab.L + 16.0) / 116.0, 3.0) : (Lab.L / kK);
    var zr = (fz3 > kE) ? fz3 : ((116.0 * fz - 16.0) / kK);
    
    XYZ.X = xr * RefWhite.X;
    XYZ.Y = yr * RefWhite.Y;
    XYZ.Z = zr * RefWhite.Z;

    return XYZ;
}

function GetAdaptation()
{
    AdaptationMethod = 0;
    switch (AdaptationMethod)
    {
        case 0: /* Bradford */
            MtxAdaptMa.m00 =  0.8951;
            MtxAdaptMa.m01 = -0.7502;
            MtxAdaptMa.m02 =  0.0389;
            MtxAdaptMa.m10 =  0.2664;
            MtxAdaptMa.m11 =  1.7135;
            MtxAdaptMa.m12 = -0.0685;
            MtxAdaptMa.m20 = -0.1614;
            MtxAdaptMa.m21 =  0.0367;
            MtxAdaptMa.m22 =  1.0296;
            
            MtxInvert3x3(MtxAdaptMa, MtxAdaptMaI);
            break;
        case 1: /* von Kries */
            MtxAdaptMa.m00 =  0.40024;
            MtxAdaptMa.m01 = -0.22630;
            MtxAdaptMa.m02 =  0.00000;
            MtxAdaptMa.m10 =  0.70760;
            MtxAdaptMa.m11 =  1.16532;
            MtxAdaptMa.m12 =  0.00000;
            MtxAdaptMa.m20 = -0.08081;
            MtxAdaptMa.m21 =  0.04570;
            MtxAdaptMa.m22 =  0.91822;
            
            MtxInvert3x3(MtxAdaptMa, MtxAdaptMaI);
            break;
        case 2: /* XYZ Scaling */
        case 3: /* None */
            MtxAdaptMa.m00 = 1.0;
            MtxAdaptMa.m01 = 0.0;
            MtxAdaptMa.m02 = 0.0;
            MtxAdaptMa.m10 = 0.0;
            MtxAdaptMa.m11 = 1.0;
            MtxAdaptMa.m12 = 0.0;
            MtxAdaptMa.m20 = 0.0;
            MtxAdaptMa.m21 = 0.0;
            MtxAdaptMa.m22 = 1.0;
            
            MtxAdaptMaI.m00 = 1.0;
            MtxAdaptMaI.m01 = 0.0;
            MtxAdaptMaI.m02 = 0.0;
            MtxAdaptMaI.m10 = 0.0;
            MtxAdaptMaI.m11 = 1.0;
            MtxAdaptMaI.m12 = 0.0;
            MtxAdaptMaI.m20 = 0.0;
            MtxAdaptMaI.m21 = 0.0;
            MtxAdaptMaI.m22 = 1.0;
            break;
    }
}