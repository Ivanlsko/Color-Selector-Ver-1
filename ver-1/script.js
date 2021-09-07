//variables
let hexValue;
inputToHEX();
//gathering input data into hex variable
function inputToHEX() {
  console.log("Input to HEX");
  document.querySelector("input").addEventListener("input", () => {
    hexValue = document.querySelector("input").value;
    console.log(hexValue);
  });
}

//converting hex to rgb
function hexToRGB() {
  console.log("Hex to RGB");
}

//converting rgb to hsl
function RGBtoHSL() {
  console.log("Rgb to HSL");
}

//function that shows the value of HEX. RGB, HSL in html
function showTheValue() {
  console.log("Show the values in html");
}

//function that changes the color of the bigger div
function changeTheColor() {
  console.log("Change the color");
}
