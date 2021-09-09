document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("input").addEventListener("input", convert);
});
// for each li set event lister for on click - this calls chooseTheScheme function
document.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", chooseTheScheme);
});

//this function behave prettty much the same as convert function except it listens to click instead of value;
function chooseTheScheme() {
  //check every li, if it has class "selected" remove it
  document.querySelectorAll("li").forEach((e) => {
    console.log(e);
    e.classList.remove("selected");
    e.style.borderBottom = "unset";
  });
  // assign classlist "selected" to the clicked li - makes it bolder and underlineds
  this.classList.add("selected");
  // the process goes from the start so the colors can change according to newly selected color scheme
  let hexCode = document.querySelector("input").value;
  let RGBCode = hextoRGB(hexCode);
  let HSLCode = RGBtoHSL(RGBCode);
  //createNewColors(theColorScheme, HSLCode);
  let theColorScheme = getTheColorScheme();
  let newHSLColors = createNewColors(theColorScheme, HSLCode);
  let correctedHSLColors = correctHSLColors(newHSLColors);
  let newRGBColors = convertHSLtoRGB(correctedHSLColors);
  let newHEXColors = convertRGBtoHEX(newRGBColors);
  showTheValue(newHEXColors, newRGBColors, correctedHSLColors);
  changeTheColor(newRGBColors);
}
//global function for converting
function convert() {
  //gathering data based on input color value
  let hexCode = document.querySelector("input").value;
  let RGBCode = hextoRGB(hexCode);
  let HSLCode = RGBtoHSL(RGBCode);
  let theColorScheme = getTheColorScheme();
  //new stuff
  let newHSLColors = createNewColors(theColorScheme, HSLCode);
  let correctedHSLColors = correctHSLColors(newHSLColors);
  let newRGBColors = convertHSLtoRGB(correctedHSLColors);
  let newHEXColors = convertRGBtoHEX(newRGBColors);
  showTheValue(newHEXColors, newRGBColors, correctedHSLColors);
  changeTheColor(newRGBColors);
  //end of new stuff
}

//converting hex to rgb
function hextoRGB(hexCode) {
  let r = hexCode.substring(1, 3);
  r = parseInt(r, 16);
  let g = hexCode.substring(3, 5);
  g = parseInt(g, 16);
  let b = hexCode.substring(5, 7);
  b = parseInt(b, 16);
  let RGBarr = [r, g, b];
  return RGBarr;
}

//converting rgb to hsl
//!! this function is not written by me
function RGBtoHSL(RGBCode) {
  let h, s, l;

  let r = RGBCode[0];
  let g = RGBCode[1];
  let b = RGBCode[2];
  r /= 255;
  g /= 255;
  b /= 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  return [Math.round(h), Math.round(s), Math.round(l)];
}

// Get the color shceme
function getTheColorScheme() {
  const selectedLi = document.querySelector(".selected").innerHTML;
  return selectedLi;
}

function createNewColors(theColorScheme, HSLCode) {
  let currentColor, newColor1, newColor2, newColor3, newColor4;
  let newHSLCodes = [];
  currentColor = HSLCode;

  if (theColorScheme == "Monochromatic") {
    console.log("it's monochromatic");
    newColor1 = [HSLCode[0], HSLCode[1], HSLCode[2] + 13];
    newColor2 = [HSLCode[0], HSLCode[1] + 26, HSLCode[2]];
    newColor3 = [HSLCode[0], HSLCode[1], HSLCode[2] + 39];
    newColor4 = [HSLCode[0], HSLCode[1] + 52, HSLCode[2]];

    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
  if (theColorScheme == "Triad") {
    console.log("it's triad");
    newColor1 = [HSLCode[0] + 120, HSLCode[1], HSLCode[2]];
    newColor2 = [HSLCode[0] + 120, HSLCode[1], HSLCode[2] + 10];
    newColor3 = [HSLCode[0] + 120, HSLCode[1], HSLCode[2] + 40];
    newColor4 = [HSLCode[0] + 120, HSLCode[1], HSLCode[2]];

    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
  if (theColorScheme == "Analogous") {
    console.log("it's analagous");
    newColor1 = [HSLCode[0] + 20, HSLCode[1], HSLCode[2]];
    newColor2 = [HSLCode[0] + 40, HSLCode[1], HSLCode[2]];
    newColor3 = [HSLCode[0] + 60, HSLCode[1], HSLCode[2]];
    newColor4 = [HSLCode[0] + 80, HSLCode[1], HSLCode[2]];
    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
  if (theColorScheme == "Complementary") {
    console.log("it's complementary");
    newColor1 = [HSLCode[0] + 180, HSLCode[1], HSLCode[2]];
    newColor2 = [HSLCode[0] + 180, HSLCode[1] + 20, HSLCode[2]];
    newColor3 = [HSLCode[0], HSLCode[1] + 40, HSLCode[2]];
    newColor4 = [HSLCode[0], HSLCode[1] + 20, HSLCode[2]];
    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
  if (theColorScheme == "Shades") {
    console.log("it's shades");
    newColor1 = [HSLCode[0], HSLCode[1], HSLCode[2] + 10];
    newColor2 = [HSLCode[0], HSLCode[1], HSLCode[2] + 20];
    newColor3 = [HSLCode[0], HSLCode[1], HSLCode[2] + 30];
    newColor4 = [HSLCode[0], HSLCode[1], HSLCode[2] + 40];
    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
  if (theColorScheme == "Compoud") {
    console.log("it's compoud");
    newColor1 = [HSLCode[0] + 180, HSLCode[1], HSLCode[2] + 10];
    newColor2 = [HSLCode[0] + 180, HSLCode[1] + 20, HSLCode[2] + 20];
    newColor3 = [HSLCode[0] + 40, HSLCode[1], HSLCode[2] + 30];
    newColor4 = [HSLCode[0] + 60, HSLCode[1], HSLCode[2] + 40];
    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
}

function correctHSLColors(oldHSL) {
  let remainderHSLcodes = [];
  oldHSL.forEach((color) => {
    console.log(color);
    if (color[0] > 360) {
      color[0] = color[0] % 360;
    }

    if (color[1] > 100) {
      color[1] = color[1] % 100;
    }

    if (color[2] > 100) {
      color[2] = color[2] % 100;
    }
    remainderHSLcodes.push(color);
    console.log(remainderHSLcodes);
  });
  return remainderHSLcodes;
}

function convertHSLtoRGB(HSL) {
  let h, s, l;
  let newRGBCodes = [];
  HSL.forEach((hsl) => {
    h = hsl[0];
    s = hsl[1] / 100;
    l = hsl[2] / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    newRGBCodes.push([r, g, b]);
  });

  return newRGBCodes;
}

function convertRGBtoHEX(RGB) {
  let newHEXCodes = [];
  RGB.forEach((rgb) => {
    r = Math.abs(rgb[0]).toString(16);
    g = Math.abs(rgb[1]).toString(16);
    b = Math.abs(rgb[2]).toString(16);
    newHEXCodes.push(`#${r}${g}${b}`);
  });

  return newHEXCodes;
}
//function that shows the value of HEX. RGB, HSL in html
function showTheValue(HEX, RGB, HSL) {
  console.log("Show the values in html");
  document.querySelector(".firstHex").innerHTML = `${HEX[1]}`;
  document.querySelector(".firstRgb").innerHTML = `${RGB[1][0]}, ${RGB[1][1]}, ${RGB[1][2]}`;
  document.querySelector(".firstHsl").innerHTML = `${HSL[1][0]}, ${HSL[1][1]}, ${HSL[1][2]}`;

  document.querySelector(".secondHex").innerHTML = `${HEX[2]}`;
  document.querySelector(".secondRgb").innerHTML = `${RGB[2][0]}, ${RGB[2][1]}, ${RGB[2][2]}`;
  document.querySelector(".secondHsl").innerHTML = `${HSL[2][0]}, ${HSL[2][1]}, ${HSL[2][2]}`;

  document.querySelector(".currentHex").innerHTML = `${HEX[0]}`;
  document.querySelector(".currentRgb").innerHTML = `${RGB[0][0]}, ${RGB[0][1]}, ${RGB[0][2]}`;
  document.querySelector(".currentHsl").innerHTML = `${HSL[0][0]}, ${HSL[0][1]}, ${HSL[0][2]}`;

  document.querySelector(".fourthHex").innerHTML = `${HEX[3]}`;
  document.querySelector(".fourthRgb").innerHTML = `${RGB[3][0]}, ${RGB[3][1]}, ${RGB[3][2]}`;
  document.querySelector(".fourthHsl").innerHTML = `${HSL[3][0]}, ${HSL[3][1]}, ${HSL[3][2]}`;

  document.querySelector(".fifthHex").innerHTML = `${HEX[4]}`;
  document.querySelector(".fifthRgb").innerHTML = `${RGB[4][0]}, ${RGB[4][1]}, ${RGB[4][2]}`;
  document.querySelector(".fifthHsl").innerHTML = `${HSL[4][0]}, ${HSL[4][1]}, ${HSL[4][2]}`;

  /* document.querySelector("#hex").innerHTML = hexCode;
  document.querySelector("#rgb").innerHTML = `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`;
  document.querySelector("#hsl").innerHTML = `${Math.floor(HSL[0])}, ${Math.floor(HSL[1])}%, ${Math.floor(HSL[2])}%`; */
}

//function that changes the color of the bigger div
function changeTheColor(RGB) {
  document.querySelector("#color1").style.backgroundColor = `rgb(${RGB[1][0]}, ${RGB[1][1]}, ${RGB[1][2]})`;
  document.querySelector("#color2").style.backgroundColor = `rgb(${RGB[2][0]}, ${RGB[2][1]}, ${RGB[2][2]})`;
  document.querySelector("#currentColor").style.backgroundColor = `rgb(${RGB[0][0]}, ${RGB[0][1]}, ${RGB[0][2]})`;
  document.querySelector("#color4").style.backgroundColor = `rgb(${RGB[3][0]}, ${RGB[3][1]}, ${RGB[3][2]})`;
  document.querySelector("#color5").style.backgroundColor = `rgb(${RGB[4][0]}, ${RGB[4][1]}, ${RGB[4][2]})`;
  document.querySelector(".selected").style.borderBottom = `2px solid rgb(${RGB[0][0]}, ${RGB[0][1]}, ${RGB[0][2]})`;
  document.querySelector("#thePath").style.fill = `rgb(${RGB[0][0]}, ${RGB[0][1]}, ${RGB[0][2]})`;
}
