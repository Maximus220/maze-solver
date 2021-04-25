var sideSize = 7;
var x = 99;
var maze;
var isComplex = true;

var colors = [100, 'map', 255];

//Sliders
var sizeSlider;
var sideSizeSlider;
var checkboxesColor = [];
var slideColor = [];
var checkboxComplex;

function rdm(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup(){
  //Canvas
  window.canvas = createCanvas(x*sideSize, x*sideSize)/*.position(windowWidth/2-canvas.width/2, 20)*/;
  window.canvas.parent('mazeCanvas');

  //Sliders
  sizeSlider = createSlider(1, 999, x, 2);
  sizeSlider.parent('sizeSlider');

  sideSizeSlider = createSlider(1, 50, sideSize);
  sideSizeSlider.parent('sideSizeSlider');

  //Checkboxes
  for(let x=0;x<3;x++){
    if(colors[x]=='map'){
      checkboxesColor.push(createCheckbox('Map', true));
      slideColor.push(createSlider(0,255,0));
      slideColor[x].attribute('disabled','');
    }else{
      checkboxesColor.push(createCheckbox('Map', false));
      slideColor.push(createSlider(0,255,colors[x]));
    }
    checkboxesColor[x].parent('checkColor'+x);
    slideColor[x].parent('sliderColor'+x);
  }

  checkboxComplex = createCheckbox('isComplex', isComplex);
  checkboxComplex.parent('checkboxComplex')

  //Initial maze creation
  maze = new Maze(sideSize, x, [0,1], [x-2, x-1], 'merge', isComplex, colors);
}

function draw(){
  //Load global parameters
  x=sizeSlider.value();
  document.getElementById('sizeDisplay').innerHTML = sizeSlider.value();
  sideSize=sideSizeSlider.value();
	document.getElementById('sideSizeDisplay').innerHTML = sideSizeSlider.value();
  document.getElementById('step').innerHTML = "Steps : "+maze.step;
  if(x!=maze.x || sideSize!=maze.size){
    document.getElementById('reload').innerHTML = "Try changes!";
  }else{
    document.getElementById('reload').innerHTML = "Reload!";
  }
  isComplex = checkboxComplex.checked();
  //Load colors parameters
  for(let x=0;x<3;x++){
    if(checkboxesColor[x].checked()){
      colors[x]='map';
      slideColor[x].attribute('disabled','');
    }else{
      slideColor[x].removeAttribute('disabled');
      colors[x]=slideColor[x].value();
    }
    document.getElementById('displayColor'+x).innerHTML = slideColor[x].value();
  }


  if(!maze.isDrew){ //Draw the maze if it isn't done yet
    maze.draw();
  }
}

function redrawMaze(){
  maze.setColors(colors);
}

function regenMaze(){
  maze = new Maze(sideSize, x, [0,1], [x-2, x-1], 'merge', isComplex, colors);
  window.canvas = resizeCanvas(x*sideSize, x*sideSize);
}

function keyPressed(){
  if(key === 'r'){
    regenMaze();
  }
}
