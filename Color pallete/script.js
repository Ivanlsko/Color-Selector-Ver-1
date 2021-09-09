document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
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
    e.classList.remove("selected");
  });
  // assign classlist "selected" to the clicked li - makes it bolder and underlineds
  this.classList.add("selected");
  // the process goes from the start so the colors can change according to newly selected color scheme
  let theColorScheme = getTheColorScheme();
  createNewColors(theColorScheme);
  let hexCode = document.querySelector("input").value;
  console.log(hexCode);
  let RGBCode = hextoRGB(hexCode);
  let HSLCode = RGBtoHSL(RGBCode);
  showTheValue(hexCode, RGBCode, HSLCode);
}
//global function for converting
function convert() {
  console.log("Input to HEX");
  //gathering data based on input color value
  let hexCode = document.querySelector("input").value;
  console.log(hexCode);
  let RGBCode = hextoRGB(hexCode);
  let HSLCode = RGBtoHSL(RGBCode);
  let theColorScheme = getTheColorScheme();
  //new stuff
  let newHSLColors = createNewColors(theColorScheme, HSLCode);
  let newRGBColors = convertHSLtoRGB(newHSLColors);
  //end of new stuff
  showTheValue(hexCode, RGBCode, HSLCode);
  changeTheColor(newRGBColors);
}

//converting hex to rgb
function hextoRGB(hexCode) {
  console.log("Hex to RGB");
  let r = hexCode.substring(1, 3);
  r = parseInt(r, 16);
  let g = hexCode.substring(3, 5);
  g = parseInt(g, 16);
  let b = hexCode.substring(5, 7);
  b = parseInt(b, 16);
  let RGBarr = [r, g, b];
  console.log(RGBarr);
  return RGBarr;
}

//converting rgb to hsl
//!! this function is not written by me
function RGBtoHSL(RGBCode) {
  console.log("Rgb to HSL");
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
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return [h, s, l];
}

// Get the color shceme
function getTheColorScheme() {
  const selectedLi = document.querySelector(".selected").innerHTML;
  return selectedLi;
}

function createNewColors(theColorScheme, HSLCode) {
  let currentColor, newColor1, newColor2, newColor3, newColor4;
  let newHSLCodes = {};
  currentColor = HSLCode;
  if (theColorScheme == "Monochromatic") {
    console.log("it's monochromatic");
    newColor1 = [HSLCode[0], HSLCode[1], HSLCode[2] + 13];
    newColor2 = [HSLCode[0], HSLCode[1], HSLCode[2] + 26];
    newColor3 = [HSLCode[0], HSLCode[1], HSLCode[2] + 39];
    newColor4 = [HSLCode[0], HSLCode[1], HSLCode[2] + 52];
    //newHSLCodes = { currentColor: currentColor, newColor1: newColor1, newColor2: newColor2, newColor3: newColor3, newColor4: newColor4 };
    newHSLCodes = [currentColor, newColor1, newColor2, newColor3, newColor4];
    return newHSLCodes;
  }
  if (theColorScheme == "Triad") {
    console.log("it's triad");
  }
  if (theColorScheme == "Analogous") {
    console.log("it's analagous");
  }
  if (theColorScheme == "Complementary") {
    console.log("it's complementary");
  }
  if (theColorScheme == "Shades") {
    console.log("it's shades");
  }
  if (theColorScheme == "Compoud") {
    console.log("it's compoud");
  }
}

function convertHSLtoRGB(HSL) {
  console.log(HSL);
  let newRGBCodes = [];

  for (let i = 0; i < 5; i++) {
    h = HSL[i][0];
    s = HSL[i][1] / 100;
    l = HSL[i][2] / 100;

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
    console.log([r, g, b]);
    newRGBCodes.push([r, g, b]);
  }
  console.log(newRGBCodes);
  return newRGBCodes;
}

//function that shows the value of HEX. RGB, HSL in html
function showTheValue(hexCode, RGB, HSL) {
  console.log("Show the values in html");
  document.querySelector("#hex").innerHTML = hexCode;
  document.querySelector("#rgb").innerHTML = `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`;
  document.querySelector("#hsl").innerHTML = `${Math.floor(HSL[0])}, ${Math.floor(HSL[1])}%, ${Math.floor(HSL[2])}%`;
}

//function that changes the color of the bigger div
function changeTheColor(RGB) {
  console.log("Change the color");
  document.querySelector("#color1").style.backgroundColor = `rgb(${RGB[1][0]}, ${RGB[1][1]}, ${RGB[1][2]})`;
  document.querySelector("#color2").style.backgroundColor = `rgb(${RGB[2][0]}, ${RGB[2][1]}, ${RGB[2][2]})`;
  document.querySelector("#currentColor").style.backgroundColor = `rgb(${RGB[0][0]}, ${RGB[0][1]}, ${RGB[0][2]})`;
  document.querySelector("#color4").style.backgroundColor = `rgb(${RGB[3][0]}, ${RGB[3][1]}, ${RGB[3][2]})`;
  document.querySelector("#color5").style.backgroundColor = `rgb(${RGB[4][0]}, ${RGB[4][1]}, ${RGB[4][2]})`;
  //document.querySelector(".selected").style.borderBottom = `2px solid rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
}
