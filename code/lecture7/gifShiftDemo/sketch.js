var c;
var gif;
var img;
var pixelSliderRed;
var pixelSliderGreen;
var pixelSliderBlue;
var recording = false;

function preload() { //see: https://p5js.org/reference/#/p5/preload
  img = loadImage("tut.jpg"); //see: https://p5js.org/reference/#/p5/loadImage
}

function setup() {
	c = createCanvas(360, 480);

	pixelSliderRed = createSlider(0, 255, 0);
	pixelSliderGreen =  createSlider(0, 255, 0);
	pixelSliderBlue = createSlider(0, 255, 0);

	pixelSliderRed.position(20, 20);
	pixelSliderGreen.position(20, 40);
	pixelSliderBlue.position(20, 60);

  //below stolen from https://p5js.org/examples/color-brightness.html
  pixelDensity(1);

  setupGif();
}

function draw() {
	background(255);

//see: https://p5js.org/reference/#/p5/draw, also taken from 
var redShiftAmount = pixelSliderRed.value();
var greenShiftAmount = pixelSliderGreen.value();
var blueShiftAmount = pixelSliderBlue.value();

img.loadPixels();
for (var x = 0; x < img.width; x++) {
	for (var y = 0; y < img.height; y++ ) {
      // Calculate the 1D location from a 2D grid
      var loc = (x + y*img.width)*4;
      // Get the R,G,B values from image
      var r,g,b;
      r = img.pixels[loc];
      g = img.pixels[loc+1];
      b = img.pixels[loc+2];

      r += redShiftAmount;
      // Constrain R to make sure they are within 0-255 color range
      if(r > 255){
      	r = r % 255;
      }

      g += greenShiftAmount;
      // Constrain G to make sure they are within 0-255 color range
      if(g > 255){
      	g = g % 255;
      }

      b += blueShiftAmount;
      // Constrain B to make sure they are within 0-255 color range
      if(b > 255){
      	b = b % 255;
      }

      img.pixels[loc] = r;
      img.pixels[loc+1] = g;
      img.pixels[loc+2] = b;
  }
}
img.updatePixels();

image(img, 0, 0);

  if (recording && (frameCount % 2 == 0)) {
  	gif.addFrame(c.elt, {delay: 1, copy: true});
  }
}

function keyPressed() { //see https://p5js.org/reference/#/p5/keyPressed
	recording = !recording;
	if (!recording) {
		gif.render();
	}
  //return false; // prevent any default behaviour
}

function setupGif() {
	gif = new GIF({
		workers: 2,
		quality: 40
	});

	gif.on('finished', function(blob) {
		window.open(URL.createObjectURL(blob));
		setupGif();
	});
}