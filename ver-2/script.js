document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  document.querySelector("input").addEventListener("input", convert);
});

//variables

//gathering input data into hex variable
function convert() {
  console.log("Input to HEX");
  let hexCode = document.querySelector("input").value;
  console.log(hexCode);
  let RGBCode = hextoRGB(hexCode);
  let HSLCode = RGBtoHSL(RGBCode);
  showTheValue(hexCode, RGBCode, HSLCode);
  changeTheColor(RGBCode);
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

//function that shows the value of HEX. RGB, HSL in html
function showTheValue(hexCode, RGB, HSL) {
  console.log("Show the values in html");
  document.querySelector("#HEX > p").innerHTML = hexCode;
  document.querySelector("#RGB > p").innerHTML = `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`;
  document.querySelector("#HSL > p").innerHTML = `${Math.floor(HSL[0])}, ${Math.floor(HSL[1])}%, ${Math.floor(HSL[2])}%`;
}

//function that changes the color of the bigger div
function changeTheColor(RGB) {
  console.log("Change the color");
  document.querySelector("#square").style.backgroundColor = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
}
