var myFrame = 0;
var guiReady = false;
var capture;
var recording = false;
var theCanvas;
var newGIF;
var localGIF;
var slider;
var addFrameButton;
var saveOutButton;

function setup() {
  //pixelDensity(1); //this is important, to deal with retina displays. otherwise we get tiny gifs
  theCanvas = createCanvas(320, 240);

  localGIF = loadGif('giphy.gif');

  capture = createCapture(VIDEO);
  capture.size(320, 240); //seems to capture at twice the width and height!
  capture.hide();
  setupNewGIF();
}

function draw() {
  checkLocalGIFLoaded();
  background(255);

  if(localGIF.loaded() && guiReady){
    if(sel.value() === 'Video'){
      image(capture, 0, 0, 320, 240);
    }else if (sel.value() === 'GIF'){
      localGIF.frame(slider.value());
      image(localGIF, 0, 0, 320, 240);
    }else{ // then it's Video: Thresholded'
      image(capture, 0, 0, 320, 240);
      filter(THRESHOLD);
    }
  }else{
    textSize(32);
    text("Loading GIF.", 10, 40);
  }
}

function checkLocalGIFLoaded(){
  if(localGIF.loaded() && !guiReady){
    //then it's OK to add the GUI control for the total number of frames
    var totalFrames = localGIF.totalFrames();
    console.log("Total frames is:"+totalFrames);

    slider = createSlider(0,totalFrames-1);
    //slider.position(10, 400);

    addFrameButton = createButton('Add frame');
    //addFrameButton.position(slider.width + 50, 400);
    addFrameButton.mousePressed(addFrame);

    saveOutButton = createButton('Save out');
    //saveOutButton.position(addFrameButton.position.x + 50, 400);
    saveOutButton.mousePressed(saveGIF);

    sel = createSelect();
    sel.option('Video');
    sel.option('GIF');
    sel.option('Video: Thresholded');
    guiReady = true;
  }
}

function addFrame(){
  // if (recording && frameCount % 3 == 0) {
    //newGIF.addFrame(c.elt, {delay: 1, copy: true});
    //newGIF.addFrame(capture.elt, {delay: 1, copy: true});
    newGIF.addFrame(theCanvas.elt, {delay: 1, copy: true});
  // }
}

function saveGIF(){
  newGIF.render();
}


// function mousePressed() {
//   recording = !recording;
//   if (!recording) {
//     newGIF.render();
//   }
// }

function setupNewGIF() {
  newGIF = new GIF({
    width: 320,
    height: 240,
    workers: 2,
    quality: 40
  });

  newGIF.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupNewGIF();
  });
}

// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}