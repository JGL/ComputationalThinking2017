var gif;

// gui params
var guiReady = false;
var frameSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //gif = loadGif('sorry.gif');
  gif = loadGif('giphy.gif');
}

function draw() {
  checkGifLoaded();
  background(255);
  if(gif.loaded() && guiReady){
    gif.frame(frameSlider.value());
    image(gif, 0, 0);
  }else{
    textSize(32);
    text("Loading GIF.", 10, 30);
  }
}

function checkGifLoaded(){
  if(gif.loaded() && !guiReady){
    //then it's OK to add the GUI control for the total number of frames
    var totalFrames = gif.totalFrames();
    console.log("Total frames is:"+totalFrames);
    // Create the GUI
    frameSlider = createSlider(0, totalFrames-1, 0);
    frameSlider.position(20, 20);
    guiReady = true;
  }
}
