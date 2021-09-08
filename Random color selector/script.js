/* receives no parameters. Creates three values, r, g, and b, as random(integers) between 0 and 255.
Returns those as an object */
document.querySelector("h1").addEventListener("click", randomBackground);

function randomColor() {
  let r, g, b;
  r = Math.round(Math.random() * 255);
  g = Math.round(Math.random() * 255);
  b = Math.round(Math.random() * 255);
  return { r: r, g: g, b: b };
}

/* receivesan rgb object, with values for r, g, and b, e.g. {r: 192, g: 5, b: 42}
Creates a string like "rgb( 192, 5, 42  )" with the r, g, and b numbers. Returns that string */
function rgbToCSS(rgb) {
  document.querySelector("body").style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

/* Receives no parameters. 
Calls randomColor to get an rgb object.
Calls rgbToCSS with that object.
Uses the return value as valuefor body.style.backgroundColor, thus setting the backgroundcolor to a random value. */
function randomBackground() {
  let rgb = randomColor();
  rgbToCSS(rgb);
}
