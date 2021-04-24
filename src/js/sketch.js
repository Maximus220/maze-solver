var sideSize = 7;
var x = 99;
var maze;

//Sliders
var sizeSlider;
var sideSizeSlider;

function rdm(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup(){
  //Canvas
  window.canvas = createCanvas(x*sideSize, x*sideSize)/*.position(windowWidth/2-canvas.width/2, 20)*/;
  window.canvas.parent('mazeCanvas');

  //Sliders
  sizeSlider = createSlider(1, 999, x);
  sizeSlider.parent('sizeSlider');

  sideSizeSlider = createSlider(1, 50, sideSize);
  sideSizeSlider.parent('sideSizeSlider');

  maze = new Maze(sideSize, x, [0,1], [x-2, x-1], 'merge', true);
}

function draw(){
  if(sizeSlider.value()%2==0){
    sizeSlider.value(sizeSlider.value()+1);
  }
  x=sizeSlider.value();
  document.getElementById('sizeDisplay').innerHTML = sizeSlider.value();
  sideSize=sideSizeSlider.value();
	document.getElementById('sideSizeDisplay').innerHTML = sideSizeSlider.value();
  document.getElementById('step').innerHTML = "Steps : "+maze.step;

  maze.draw();
}

function regenMaze(){
  maze = new Maze(sideSize, x, [0,1], [x-2, x-1], 'merge', true);
  window.canvas = resizeCanvas(x*sideSize, x*sideSize);
}

function keyPressed(){
  if(key === 'r'){
    regenMaze();
  }
}
