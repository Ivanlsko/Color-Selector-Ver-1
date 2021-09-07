//variables
let hexCode;
let RGB = [];
let r;
let g;
let b;
inputToHEX();

//gathering input data into hex variable
function inputToHEX() {
  console.log("Input to HEX");
  document.querySelector("input").addEventListener("input", () => {
    hexCode = document.querySelector("input").value;
    console.log(hexCode);
    hexToRGB();
  });
}

//converting hex to rgb
function hexToRGB() {
  console.log("Hex to RGB");
  r = hexCode.substring(1, 3);
  r = parseInt(r, 16);
  g = hexCode.substring(3, 5);
  g = parseInt(g, 16);
  b = hexCode.substring(5, 7);
  b = parseInt(b, 16);
  RGB = [r, g, b];
  console.log(RGB);
  RGBtoHSL();
}

//converting rgb to hsl
function RGBtoHSL() {
  console.log("Rgb to HSL");

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

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
}

//function that shows the value of HEX. RGB, HSL in html
function showTheValue() {
  console.log("Show the values in html");
}

//function that changes the color of the bigger div
function changeTheColor() {
  console.log("Change the color");
}
