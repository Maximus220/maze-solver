var sideSize = 7;
var x = 99;
var maze;

function rdm(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup(){
  window.canvas = createCanvas(1000, 800).position(windowWidth/2-canvas.width/2, 20);
  maze = new Maze(sideSize, x, [0,1], [x-2, x-1], 'merge', true);
}

function draw(){
  maze.draw();
}

function keyPressed(){
  if(key === 'r'){

  }
}
